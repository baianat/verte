<template lang="pug">
.verte(:class="{ 'verte--loading': isLoading }")
  button.verte__guide(
    ref="guide"
    type="button"
    v-if="!menuOnly"
    :style="`color: ${currentColor}; fill: ${currentColor};`"
    @click="toggleMenu"
    )
    slot
      svg.verte__icon(viewBox="0 0 24 24")
        circle(cx="12" cy="12" r="12")
  .verte__menu(
    ref="menu"
    tabindex="-1"
    v-on="draggable ? {mousedown: dragMenu} : { }"
    :style="`transform: translate(${delta.x}px, ${delta.y}px)`"
    :class="{'verte__menu--active': isMenuActive, 'verte__menu--static': !draggable || menuOnly }"
  )
    Picker(
      :mode="picker"
      v-model="currentColor"
    )
    .verte__controller
      Slider(
        v-if="enableAlpha"
        :gradient="[`rgba(${rgb.red}, ${rgb.green}, ${rgb.blue}, 0)`, `rgba(${rgb.red}, ${rgb.green}, ${rgb.blue}, 1)`]"
        :min="0"
        :max="1"
        :step="0.01"
        :editable="false"
        v-model="alpha"
      )
      template(v-if="enableSliders")
        template(v-if="model === 'hsl'")
          Slider(
            :gradient="[`hsl(0,${hsl.sat}%,${hsl.lum}%)`, `hsl(360,${hsl.sat}%,${hsl.lum}%)`]"
            :min="0"
            :max="360"
            :step="1"
            v-model="hsl.hue"
          )
          Slider(
            :gradient="[`hsl(${hsl.hue},0%,${hsl.lum}%)`, `hsl(${hsl.hue},100%,${hsl.lum}%)`]"
            :min="0"
            :max="100"
            :step="1"
            v-model="hsl.sat"
          )
          Slider(
            :gradient="[`hsl(${hsl.hue},${hsl.sat}%,0%)`, `hsl(${hsl.hue},${hsl.sat}%,100%)`]"
            :min="0"
            :max="100"
            :step="1"
            v-model="hsl.lum"
          )
        template(v-if="model === 'rgb' || model === 'hex'")
          Slider(
            :gradient="[`rgb(0,${rgb.green},${rgb.blue})`, `rgb(255,${rgb.green},${rgb.blue})`]"
            v-model="rgb.red"
          )
          Slider(
            :gradient="[`rgb(${rgb.red},0,${rgb.blue})`, `rgb(${rgb.red},255,${rgb.blue})`]"
            v-model="rgb.green"
          )
          Slider(
            :gradient="[`rgb(${rgb.red},${rgb.green},0)`, `rgb(${rgb.red},${rgb.green},255)`]"
            v-model="rgb.blue"
          )

      //- verte inputs
      .verte__inputs
        button.verte__model(@click="switchModel") {{currentModel}}
        template(v-if="currentModel === 'hsl'")
          input.verte__input(
            @change="inputChanged($event, 'hue')"
            :value="hsl.hue"
            type="number"
            max="360"
            min="0"
          )
          input.verte__input(
            @change="inputChanged($event, 'sat')"
            :value="hsl.sat"
            type="number"
            min="0"
            max="100"
          )
          input.verte__input(
            @change="inputChanged($event, 'lum')"
            :value="hsl.lum"
            type="number"
            min="0"
            max="100"
          )
        template(v-if="currentModel === 'rgb'")
          input.verte__input(
            @change="inputChanged($event, 'red')"
            :value="rgb.red"
            type="number"
            min="0"
            max="255"
          )
          input.verte__input(
            @change="inputChanged($event, 'green')"
            :value="rgb.green"
            type="number"
            min="0"
            max="255"
          )
          input.verte__input(
            @change="inputChanged($event, 'blue')"
            :value="rgb.blue"
            type="number"
            min="0"
            max="255"
          )
        template(v-if="currentModel === 'hex'")
          input.verte__input(
            @change="inputChanged($event, 'hex')"
            :value="hex"
            type="text"
          )
        button.verte__submit(@click="submit")
          svg.verte__icon(viewBox="0 0 24 24")
            path(d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z")
      .verte__recent(ref="recent")
        a.verte__recent-color(
          role="button"
          href="#"
          v-for="clr in recentColors.colors"
          :style="`background: ${clr}`"
          @click.prevent="selectColor(clr)"
        )

</template>

<script>
import Picker from './Picker.vue';
import Slider from './Slider.vue';
import { toRgb, toHex, toHsl, getRandomColor, isValidColor } from 'color-fns';
import { makeArray, isElementClosest, warn, makeListValidator } from '../utils';

export default {
  name: 'Verte',
  components: {
    Picker,
    Slider
  },
  props: {
    picker: {
      type: String,
      default: 'square',
      validator: makeListValidator('picker', ['wheel', 'square'])
    },
    value: {
      type: String,
      default: '#000'
    },
    model: {
      type: String,
      default: 'hsl',
      validator: makeListValidator('model', ['rgb', 'hex', 'hsl'])
    },
    display: {
      type: String,
      default: 'vertical',
      validator: makeListValidator('display', ['vertical', 'vertical-widget'])
    },
    enableAlpha: {
      type: Boolean,
      default: true
    },
    enableSliders: {
      type: Boolean,
      default: false
    },
    draggable: {
      type: Boolean,
      default: true
    }
  },
  data: () => ({
    isMenuActive: true,
    isLoading: true,
    rgb: toRgb('#000'),
    hex: toHex('#000'),
    hsl: toHsl('#000'),
    delta: { x: 0, y: 0 },
    currentModel: '',
    recentColors: {
      max: 6,
      colors: makeArray(6, getRandomColor)
    }
  }),
  computed: {
    currentColor: {
      get () {
        if (!this[this.model] && process.env.NODE_ENV !== 'production') {
          warn(`You are using a non-supported color model: "${this.model}", the supported models are: "rgb", "hsl" and "hex".`);
          return `rgb(0, 0, 0)`;
        }

        return this[this.model].toString();
      },
      set (val) {
        this.selectColor(val);
      }
    },
    alpha: {
      get () {
        if (!this[this.model]) {
          return 1;
        }

        if (isNaN(this[this.model].alpha)) {
          return 1;
        }

        return this[this.model].alpha;
      },
      set (val) {
        this[this.model].alpha = val;
      }
    },
    menuOnly () {
      return this.display === 'vertical-widget';
    }
  },
  watch: {
    value (val, oldVal) {
      if (val === oldVal || val === this.currentColor) return;

      // value was updated externally.
      this.selectColor(val);
    },
    rgb: {
      handler (val) {
        this.hex = toHex(val.toString());
        this.$emit('input', this.currentColor);
      },
      deep: true
    }
  },
  methods: {
    selectColor (color, muted = false) {
      if (!isValidColor(color)) return;

      this.rgb = toRgb(color);
      this.hex = toHex(color);
      this.hsl = toHsl(color);

      if (muted) return;
      this.$emit('input', this.currentColor);
    },
    switchModel () {
      const models = ['hex', 'rgb', 'hsl'];
      const indx = models.indexOf(this.currentModel);
      this.currentModel = models[indx + 1] || models[0];
    },
    dragMenu (event) {
      if (event.target !== this.$refs.menu || event.button !== 0) return;
      const startPosition = {};
      const endPosition = {};
      const lastMove = Object.assign({}, this.delta);

      event.preventDefault();
      startPosition.x = event.clientX;
      startPosition.y = event.clientY;

      const mousemoveHandler = (evnt) => {
        window.requestAnimationFrame(() => {
          endPosition.x = evnt.clientX;
          endPosition.y = evnt.clientY;
          this.delta.x = lastMove.x + endPosition.x - startPosition.x;
          this.delta.y = lastMove.y + endPosition.y - startPosition.y;
        });
      };
      const mouseupHandler = () => {
        document.removeEventListener('mousemove', mousemoveHandler);
        document.removeEventListener('mouseup', mouseupHandler);
      };
      document.addEventListener('mousemove', mousemoveHandler);
      document.addEventListener('mouseup', mouseupHandler);
    },
    submit () {
      this.$emit('beforeSubmit', this.currentColor);
      if (!this.menuOnly) {
        this.closeMenu();
      }
      this.addRecentColor(this.currentColor);
      this.$emit('submitted', this.currentColor);
    },
    inputChanged (event, value) {
      const el = event.target;
      if (this.currentModel === 'hex') {
        this.selectColor(el.value);
        return;
      }
      const normalized = Math.min(Math.max(el.value, el.min), el.max);
      this[this.currentModel][value] = normalized;
      this.selectColor(this[this.currentModel]);
    },
    addRecentColor (newColor) {
      const { colors, max } = this.recentColors;
      if (colors.includes(newColor)) {
        return;
      }
      if (colors.length >= max) {
        colors.shift();
      }
      colors.push(newColor);
    },
    toggleMenu () {
      if (this.isMenuActive) {
        this.closeMenu();
        return;
      }
      this.openMenu();
    },
    closeMenu () {
      this.isMenuActive = false;
      document.removeEventListener('click', this.closeCallback);
    },
    openMenu () {
      this.isMenuActive = true;
      this.closeCallback = (evnt) => {
        if (
          !isElementClosest(evnt.target, this.$refs.menu) &&
          !isElementClosest(evnt.target, this.$refs.guide)
        ) {
          this.closeMenu();
        }
      };
      document.addEventListener('click', this.closeCallback);
    }
  },
  created () {
    this.selectColor(this.value || '#000', true);
    this.currentModel = this.model;
  },
  mounted () {
    // give sliders time to
    // calculate its visible width
    this.$nextTick(() => {
      this.isLoading = false;
      if (this.menuOnly) return;
      this.isMenuActive = false;
    });
  }
};
</script>

<style lang="sass">
@import '../sass/variables';

.verte
  position: relative
  display: flex
  justify-content: center
  *
    box-sizing: border-box

  &--loading
    opacity: 0
  &__guide
    width: 24px
    height: 24px
    padding: 0
    border: 0
    background: transparent

    &:focus
      outline: 0

    svg
      width: 100%
      height: 100%
      fill: inherit

  &__menu
    position: absolute
    top: 50px
    display: none
    flex-direction: column
    justify-content: center
    align-items: stretch
    width: 250px
    border-radius: $borderRadius
    background-color: $white
    will-change: transform
    box-shadow: 0 8px 15px rgba($black, 0.1)
    overflow: hidden
    &--active
      display: flex
    &--static
      position: static

    &:focus
      outline: none
  &__controller
    padding: 0 20px 20px

  &__recent
    display: flex
    flex-wrap: wrap
    justify-content: flex-end
    align-items: center
    width: 100%

    &-color
      margin: 4px
      width: 27px
      height: 27px
      border-radius: 50%
      background-color: $black
      box-shadow: 0 2px 4px rgba($black, 0.1)

  &__value
    padding: 0.6em
    width: 100%
    border: $border solid $gray
    border-radius: $borderRadius 0 0 $borderRadius
    text-align: center
    font-size: $fontTiny
    -webkit-appearance: none
    -moz-appearance: textfield
    &:focus
      outline: none
      border-color: $blue
  &__icon
    width: 22.5px
    height: 18.5px

  &__input
    padding: 5px
    margin: 0 3px
    min-width: 0
    text-align: center
    border-width: 0 0 1px 0
    &::-webkit-inner-spin-button, 
    &::-webkit-outer-spin-button
      -webkit-appearance: none
      margin: 0
    appearance: none
    -moz-appearance: textfield

  &__inputs
    display: flex
    font-size: 16px
    margin-bottom: 5px

  &__model,
  &__submit
    position: relative
    display: inline-flex
    justify-content: center
    align-items: center
    padding: 0
    border: 0
    text-align: center
    cursor: pointer
    background-color: transparent
    font-weight: 700
    color: $gray
    fill: $gray
    outline: none
    &:hover
      fill: $blue
      color: $blue

</style>
