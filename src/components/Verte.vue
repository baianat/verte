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
    Slider(
      :gradient="[`rgba(${rgb.red}, ${rgb.green}, ${rgb.blue}, 0)`, `rgba(${rgb.red}, ${rgb.green}, ${rgb.blue}, 1)`]"
      :min="0"
      :max="1"
      :step="0.01"
      :editable="false"
      v-model="alpha"
    )
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
    .verte__input
      input.verte__value(ref="input" @keypress.enter="submit" :value="currentColor")
      button.verte__submit(type="button" @click="submit")
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
      default: 'wheel',
      validator: makeListValidator('picker', ['wheel', 'square'])
    },
    value: {
      type: String,
      default: '#000'
    },
    model: {
      type: String,
      default: 'rgb',
      validator: makeListValidator('model', ['rgb', 'hex', 'hsl'])
    },
    display: {
      type: String,
      default: 'vertical',
      validator: makeListValidator('display', ['vertical', 'vertical-widget'])
    },
    enableAlpha: {
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
      if (!this.menuOnly) {
        this.closeMenu();
      }
      this.selectColor(this.$refs.input.value);
      this.addRecentColor(this.currentColor);
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
    padding: 40px
    width: 300px
    border-radius: $borderRadius
    background-color: $white
    will-change: transform
    box-shadow: 0 10px 15px -5px rgba($black, 0.1)
    &--active
      display: flex
    &--static
      position: static

    &:focus
      outline: none

  &__recent
    display: flex
    flex-wrap: wrap
    justify-content: flex-end
    align-items: center
    width: 100%

    &-color
      margin: 4px
      width: 28px
      height: 28px
      border-radius: 50%
      background-color: $black
      box-shadow: 0 2px 4px rgba($black, 0.1)

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
