<template lang="pug">
.verte
  button.verte__guide(
    ref="guide"
    :style="`color: ${currentColor}; fill: ${currentColor};`"
    @click="toggleMenu"
    )
    slot
      svg.verte__icon(viewBox="0 0 24 24")
        circle(cx="12" cy="12" r="12")
  .verte__menu(
    ref="menu"
    tabindex="-1"
    @mousedown="dragMenu"
    :style="`transform: translate(${delta.x}px, ${delta.y}px)`"
    :class="{'verte__menu--active': isMenuActive}"
  )
    Picker(
      :mode="picker"
      v-model="currentColor"
    )
    Slider(
      :gradient="[`rgb(0,${rgb.green},${rgb.blue})`, `rgb(255,${rgb.green},${rgb.blue})`]"
      v-model="rgb.red"
    )
    Slider(ref="green"
      :gradient="[`rgb(${rgb.red},0,${rgb.blue})`, `rgb(${rgb.red},255,${rgb.blue})`]"
      v-model="rgb.green"
    )
    Slider(ref="blue"
      :gradient="[`rgb(${rgb.red},${rgb.green},0)`, `rgb(${rgb.red},${rgb.green},255)`]"
      v-model="rgb.blue"
    )
    .verte__input
      input.verte__value(ref="el" v-model="currentColor")
      button.verte__submit(type="button" @click="closeMenu")
        svg.verte__icon(viewBox="0 0 24 24")
          path(d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z")
    .verte__recent(ref="recent")
      a.verte__color(
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
import { toRgb, toHex, toHsl, getRandomColor, isAColor } from 'color-fns';
import { getArray, call, isElementClosest } from '../utils'

export default {
  name: 'Verte',
  components: {
    Picker,
    Slider
  },
  props: {
    picker: { type: String, default: 'wheel' },
    value: { type: String, default: '#000' },
    model: { type: String, default: 'rgb' },
  },
  data: () => ({
    isMenuActive: true,
    rgb: toRgb('#000'),
    hex: toHex('#000'),
    hsl: toHsl('#000'),
    delta: { x: 0, y: 0 },
    recentColors: {
      max: 6,
      colors: getArray(6, getRandomColor)
    }
  }),
  computed: {
    currentColor: {
      get () {
        return this[this.model].toString();
      },
      set (val) {
        this.selectColor(val);
      }
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
        this.$emit('input', this.currentColor);
      },
      deep: true
    }
  },
  methods: {
    selectColor (color, mute = false) {
      if (!isAColor(color)) return;

      this.rgb = toRgb(color);
      this.hex = toHex(color);
      this.hsl = toHsl(color);

      if (mute) return;
      this.$emit('input', this.currentColor);
    },
    dragMenu (event) {
      if (event.target !== this.$refs.menu || event.button !== 0) return;
      const startPosition = {}
      const endPosition = {}
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
      }
      const mouseupHandler = () => {
        document.removeEventListener('mousemove', mousemoveHandler);
        document.removeEventListener('mouseup', mouseupHandler);
      }
      document.addEventListener('mousemove', mousemoveHandler);
      document.addEventListener('mouseup', mouseupHandler);
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
          return;
        }
      };
      document.addEventListener('click', this.closeCallback);
    }
  },
  created () {
    this.selectColor(this.value || '#000');
  },
  mounted () {
    // give sliders time to
    // calculate its visible width
    this.$nextTick(() => {
      this.isMenuActive = true;
    })
  }
}
</script>


<style lang="sass">
@import 'variables';

.verte
  position: relative
  display: flex
  justify-content: center
  *
    box-sizing: border-box
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
    padding: 40px
    width: 300px
    border-radius: $borderRadius
    background-color: $white
    will-change: transform
    box-shadow: 0 10px 15px -5px rgba($black, 0.1)
    &--active
      display: flex

    &:focus
      outline: none


  &__recent
    display: flex
    flex-wrap: wrap
    justify-content: flex-end
    align-items: center
    width: 100%

  &__color
    margin: 4px
    width: 28px
    height: 28px
    border-radius: 50%
    background-color: $black

  &__value
    padding: 0.6em
    width: 100%
    border: $border solid $black
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
    fill: $white

  &__input
    display: flex
    margin-bottom: $margin
  &__submit
    position: relative
    display: inline-flex
    justify-content: center
    align-items: center
    padding: 0.4em 0.75em
    outline-width: 2px
    outline-offset: 1px
    border-width: 2px
    border-style: solid
    border-radius: 0 $borderRadius $borderRadius 0
    background-clip: border-box
    vertical-align: top
    text-align: center
    text-decoration: none
    cursor: pointer
    background-color: $black
    border-color: $black
    &:hover
      fill: $blue

</style>

