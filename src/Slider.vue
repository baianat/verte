<template lang="pug">
  .slider(ref="wrapper")
    input.slider-input(ref="el")
    .slider-track(ref="track" @mousedown.native="select")
      .slider-fill(v-if="fill" :style="`transform: translate(${fill.translate}px, 0) scale(${fill.scale}, 1)`")
      .slider-handle(
        v-for="handle in handles"
        @mousedown.native="select"
        @touchstart.native="select"
        :style="`transform: translate(${handle.positoin}px, 0); background-color: ${handle.color};`"
        )
        .slider-label(v-if="settings.label") {{ handle.value }}
</template>

<script>
import { mixColors } from 'color-fns';
import { call, getClosestValue } from './utils';

export default {
  name: 'Slider',
  props: {
    created: Object,
    updated: Object,
    gradient: Array,
    classes: Array,
    colorCode: { type: Boolean, default: false },
    editable: { type: Boolean, default: false },
    reverse: { type: Boolean, default: false },
    label: { type: Boolean, default: true },
    trackSlide: { type: Boolean, default: true },
    min: { type: Number, default: 0 },
    max: { type: Number, default: 10 },
    step: { type: Number, default: 1 },
    value: { type: Number, default: 0 },
    handlesValue: { type: Array, default: () => [0] }
  },
  data() {
    return {
      fill: {
        translate: 0,
        scale: 0
      }
    }
  },
  computed: {
    settings: function () {
      return { ...this.$props };
    },
    values: function () {
      return this.handlesValue;
    },
    handles: function () {
      return this.handlesValue.map(value => {
        return { value };
      });
    }
  },
  mounted() {
    this.el = this.$refs.el;
    this.init();
  },
  methods: {
    init () {
      this.multiple = this.values.length > 1;
      if (this.values.length === 1) {
        this.values[0] = Number(this.el.value) || Number(this.settings.value);
      }
      this.values.sort();
      if (this.settings.colorCode) {
        this.el.type = 'text';
      }

      this.initElements();
      if (this.settings.gradient) {
        this.initGradient();
      }
      this.initEvents();
      this.values.forEach((handle, index) => {
        this.activeHandle = index;
        this.update(handle);
      })
      this.update();
    },

    initElements () {
      this.wrapper = this.$refs.wrapper;
      this.track = this.$refs.track;

      this.wrapper.classList.toggle('is-editable', this.settings.editable);
      this.wrapper.classList.toggle('is-reverse', this.settings.reverse);
      if (this.settings.classes) {
        this.wrapper.classList.add(...this.settings.classes);
      }
      call(this.settings.created, this);
    },

    initGradient () {
      if (this.settings.gradient.length > 1) {
        this.track.style.backgroundImage = `linear-gradient(90deg, ${this.settings.gradient})`;
        return;
      }
      this.track.style.backgroundImage = '';
      this.track.style.backgroundColor = this.settings.gradient[0];
      this.handles.forEach(handle => {
        handle.style.color = this.settings.gradient[0];
      });
      // this.gradient = null;
    },

    initEvents () {
      window.addEventListener('resize', () => {
        this.updateWidth();
        this.update(undefined, true);
      });
      if (this.settings.trackSlide) {
        this.track.addEventListener('mousedown', this.select.bind(this), false);
        this.track.addEventListener('touchstart', this.select.bind(this), false);
      }
      if (this.settings.editable && !this.settings.colorCode) {
        this.el.addEventListener('change', (evt) => {
          this.update(this.el.value);
        }, false);
      }
    },

    /**
     * fire select events
     */
    select (event) {
      event.preventDefault();
      event.stopPropagation();
      // check if  left mouse is clicked
      if (event.buttons !== 1) return;
      this.track.classList.add('is-dragging');
      this.ticking = false;

      const stepValue = this.getStepValue(event);

      if (this.multiple) {
        let closest = getClosestValue(this.values, stepValue);
        this.activeHandle = this.values.indexOf(closest);
      }
      this.update(stepValue);

      this.tempDrag = this.dragging.bind(this);
      this.tempRelease = this.release.bind(this);
      document.addEventListener('mousemove', this.tempDrag);
      document.addEventListener('touchmove', this.tempDrag);
      document.addEventListener('touchend', this.tempRelease);
      document.addEventListener('mouseup', this.tempRelease);
    },

    /**
     * dragging motion
     */
    dragging (event) {
      event.preventDefault();
      const stepValue = this.getStepValue(event);
      if (!this.ticking) {
        window.requestAnimationFrame(() => {
          this.update(stepValue);
          this.ticking = false;
        });

        this.ticking = true;
      }
    },

    /**
     * release handler
     */
    release () {
      this.track.classList.remove('is-dragging');
      document.removeEventListener('mousemove', this.tempDrag);
      document.removeEventListener('touchmove', this.tempDrag);
      document.removeEventListener('mouseup', this.tempRelease);
      document.removeEventListener('touchend', this.tempRelease);
    },

    getStepValue (event) {
      const eventX = event.type.includes('mouse')
        ? event.clientX : event.type.includes('touch')
          ? event.touches[0].clientX : event;

      const mouseValue = (eventX - this.currentX);
      const stepCount = parseInt((mouseValue / this.stepWidth) + 0.5, 10);
      const stepValue = parseInt((stepCount + this.min) / this.step, 10) * this.step;
      return stepValue;
    },

    updateWidth () {
      const trackRect = this.track.getBoundingClientRect();
      this.currentX = trackRect.left;
      this.width = trackRect.width;
      this.stepWidth = (this.width / (this.max - this.min));
    },

    /**
     * get the filled area percentage
     * @param  {Object} slider
     * @param  {Number} value
     * @return {Number}
     */
    getPositionPercentage (value) {
      return (value - this.min) / (this.max - this.min);
    },

    normalizeValue (value) {
      if (isNaN(Number(value))) {
        return this.value;
      }
      if (this.multiple) {
        const prevValue = this.values[this.activeHandle - 1] || this.min;
        const nextValue = this.values[this.activeHandle + 1] || this.max;
        value = Math.min(Math.max(Number(value), prevValue), nextValue);
      }
      return Math.min(Math.max(Number(value), this.min), this.max);
    },

    newGradient (newGradient) {
      this.settings.gradient = newGradient;
      this.initGradient();
      this.update(undefined, true);
    },

    addHandle (value) {
      const closest = getClosestValue(this.values, value);
      const closestIndex = this.values.indexOf(closest);
      const closestValue = this.values[closestIndex];
      const newIndex = closestValue <= value ? closestIndex + 1 : closestIndex;
      this.values.splice(newIndex, 0, value);
      this.handles.splice(newIndex, 0, { });

      this.handles[newIndex].addEventListener('mousedown', this.select.bind(this), false);
      this.handles[newIndex].addEventListener('touchstart', this.select.bind(this), false);
      this.track.appendChild(this.handles[newIndex]);
      this.activeHandle = newIndex;
      this.currentValue = null;
      this.update(value);
      return this.handles[newIndex];
    },

    removeHandle (index) {
      this.handles[index].remove();
      this.handles.splice(index, 1);
      this.values.splice(index, 1);
      this.activeHandle = index === 0 ? index + 1 : index - 1;
    },

    /**
     * get the handle color
     * @param  {Number} positionPercentage
     * @return {Number}                handle hex color code
     */
    getHandleColor (positionPercentage) {
      const colorCount = this.gradient.length - 1;
      const region = positionPercentage;
      for (let i = 1; i <= colorCount; i++) {
        // check the current zone
        if (region >= ((i - 1) / colorCount) && region <= (i / colorCount)) {
          // get the active color percentage
          const colorPercentage = (region - ((i - 1) / colorCount)) / (1 / colorCount);
          // return the mixed color based on the zone boundary colors
          return mixColors(this.gradient[i - 1], this.gradient[i], colorPercentage);
        }
      }
      return 'rgb(0, 0, 0)';
    },

    /**
     * update the slider fill, value and color
     * @param {Number} value
     */
    update (value, mute = false) {
      if (Number(value) === this.value) return;

      if (!this.width) {
        this.updateWidth();
      }
      const normalized = this.normalizeValue(value);
      const positionPercentage = this.getPositionPercentage(normalized);

      if (this.fill) {
        this.fill.translate = positionPercentage * this.width;
        this.fill.scale = 1 - positionPercentage;
      }

      this.values[this.activeHandle] = normalized;
      this.handles[this.activeHandle].value = normalized;
      this.handles[this.activeHandle].positoin = positionPercentage * this.width;
      this.currentValue = this.el.value = normalized;

      if (this.gradient) {
        const color = this.getHandleColor(positionPercentage);
        this.handles[this.activeHandle].color = color.toString();
        if (this.settings.colorCode) {
          this.el.value = color;
        }
      }

      // todo: create reactivity and stop force update
      this.$forceUpdate();
      
      if (mute) return;
      this.el.dispatchEvent(new Event('change')); // eslint-disable-line
      this.el.dispatchEvent(new Event('input'));  // eslint-disable-line
      call(this.settings.updated);
    }
  }
}
</script>

<style lang="sass">
$black: #000
$whiteyar: #fff
$magenta: #eb008b
$blue: #1a3aff
$cyan: #1de9cf
$green: #5fca16
$yellow: #ff9600
$red: #f42828
$gray: #cccccc
$purple: #a324ea
$margin: 10px
$padding: 0.5em
$borderRadius: 0
$border: 1px
$fontTiny: 12px

.slider
  position: relative
  display: flex
  align-items: center
  box-sizing: border-box
  margin-bottom: $margin

  &-input
    display: none
    margin-bottom: 0
    padding: 0.6em
    max-width: 70px
    width: 20%
    border: $border solid $black
    border-radius: $borderRadius
    text-align: center
    font-size: $fontTiny
    -webkit-appearance: none
    -moz-appearance: text

    &:focus
      outline: none
      border-color: $blue

  &-track
    position: relative
    flex: 1
    margin: 0.2em
    width: auto
    height: 0.2em
    background: $gray
    will-change: transfom

  &-handle
    position: relative
    position: absolute
    top: 0
    left: 0
    will-change: transform
    color: $black
    margin: -0.1em 0 0 -0.2em
    width: 0.4em
    height: 0.4em
    background-color: currentColor

  &-label
    position: absolute
    top: -3em
    left: 0.4em
    z-index: 999
    visibility: hidden
    padding: 6px
    min-width: 3em
    border-radius: $borderRadius
    background-color: $black
    color: $whiteyar
    text-align: center
    font-size: $fontTiny
    line-height: 1em
    opacity: 0
    transform: translate(-50%, 0)
    white-space: nowrap

    &:before
      position: absolute
      bottom: -0.6em
      left: 50%
      display: block
      width: 0
      height: 0
      border-width: 0.6em 0.6em 0 0.6em
      border-style: solid
      border-color: $black transparent transparent transparent
      content: ''
      transform: translate3d(-50%, 0, 0)

  &-fill
    width: 100%
    height: 100%
    background-color: $gray
    transform-origin: left top

  &:hover,
  &.is-dragging
    .slider-label
      visibility: visible
      opacity: 1

  &.is-editable
    .slider-input
      display: block

  &.is-reverse
    flex-direction: row-reverse

  &.is-rounded
    .slider-handle,
    .slider-track,
    .slider-fill
      border-radius 10em
</style>
