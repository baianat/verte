<template lang="pug">
.verte-picker(ref="picker")
  canvas.verte-picker__canvas(
    ref="canvas"
    :class="`verte-picker__canvas--${mode}`"
    @mousedown="mouseDownHandler($event, selectColor)"
    )
  canvas.verte-picker__strip(
    ref="strip"
    v-if="mode === 'square'"
    @mousedown="mouseDownHandler($event, selectHue)"
    )
  .verte-picker__cursor(
    ref="cursor"
    :style="`transform: translate3d(${cursor.x}px, ${cursor.y}px, 0)`"
    )
  Slider.verte-picker__saturation(
    ref="saturation"
    v-if="mode === 'wheel'"
    @change="updateWheelColors"
    :gradient="[`hsl(${hsl.hue},0%,${hsl.lum}%)`, `hsl(${hsl.hue},100%,${hsl.lum}%)`]"
    :editable="false"
    :max="100"
    v-model="currentSat"
    )

</template>


<script>
import Slider from './Slider.vue';
import { toHsl } from 'color-fns';
import {
  getCartesianCoords,
} from '../utils'

export default {
  name: 'Picker',
  props: {
    mode: { type: String, default: 'wheel' },
    edge: { type: Number, default: 190 },
    radius: { type: Number, default: 200 },
    satSlider: { type: Boolean, default: true },
    color: { type: String, default: '#fff' }
  },
  data() {
    return {
      currentHue: 0,
      currentSat: 0,
      currentColor: {},
      hsl: {},
      mouse: {},
      cursor: {}
    }
  },
  watch: {
    color: function () {
      this.handleColor(this.color);
    },
    currentHue: function () {
      this.updateSquareColors();
      this.selectColor();
    },
    currentSat: function () {
      this.updateWheelColors();
      this.selectColor();
    }
  },
  components: {
    Slider
  },
  methods: {
    _initSquare () {
      this.picker = this.$refs.picker;
      this.canvas = this.$refs.canvas;
      this.strip = this.$refs.strip;

      // setup canvas
      const edge = this.edge;
      this.canvas.width = edge;
      this.canvas.height = edge;
      this.strip.width = this.edge / 10;
      this.strip.height = edge;
      this.ctx = this.canvas.getContext('2d');
      this.stripCtx = this.strip.getContext('2d');

      this.stripCtx.rect(0, 0, this.strip.width, this.strip.height);
      const hue = this.stripCtx.createLinearGradient(0, 0, 0, this.strip.height);
      for (let angle = 0; angle < 360; angle += 1) {
        hue.addColorStop(angle / 359, `hsl(${angle}, 100%, 50%)`);
      }
      this.stripCtx.fillStyle = hue;
      this.stripCtx.fill();

      this.updateSquareColors();
    },

    _initWheel () {
      this.picker = this.$refs.picker;
      this.saturation = this.$refs.saturation;
      this.canvas = this.$refs.canvas;

      // setup canvas
      this.canvas.width = this.radius;
      this.canvas.height = this.radius;
      this.ctx = this.canvas.getContext('2d');

      // draw wheel circle path
      this.circle = {
        path: new Path2D(), // eslint-disable-line
        xCords: this.canvas.width / 2,
        yCords: this.canvas.height / 2,
        radius: this.canvas.width / 2
      }
      this.circle.path.moveTo(this.circle.xCords, this.circle.yCords);
      this.circle.path.arc(
        this.circle.xCords,
        this.circle.yCords,
        this.circle.radius,
        0,
        360
      );
      this.circle.path.closePath();
      this.updateWheelColors();
    },


    handleColor (color) {
      this.currentColor = color;
      this.hsl = toHsl(this.currentColor);

      if (this.mode === 'wheel') {
        this.currentSat = this.hsl.sat;
        const r = (100 - this.hsl.lum) * (this.radius / 200);
        const ratio = this.radius / 2;
        const coords = getCartesianCoords(r, this.hsl.hue / 360);
        this.mouse = { x: coords.x + ratio, y: coords.y + ratio }
      }
  
      if (this.mode === 'square') {
        this.currentHue = this.hsl.hue;
        const x = (this.hsl.sat / 100) * (this.edge);
        const y = ((100 - this.hsl.lum) / 100) * (this.edge);
        const squareEdge = this.edge - 1;
        this.mouse = { x: Math.min(x, squareEdge) , y: Math.min(y - 2) };
      }

      this.updateCursor(this.mouse);
    },

    selectHue (event) {
      if (event.target !== this.strip) {
        return;
      }
      let tempColor = this.getColorCanvas(this.getMouseCords(event), this.stripCtx);
      this.currentHue = toHsl(tempColor).hue;
    },

    selectColor (event) {
      if (event && event.target === this.canvas) {
        const { x, y } = this.getMouseCords(event);
        if (this.mode === 'square') {
          const squareThreshold = this.edge - 1;
          this.mouse = { x: Math.min(x, squareThreshold), y: Math.min(y, squareThreshold) };
        }

        if (this.mode === 'wheel' && this.ctx.isPointInPath(this.circle.path, x, y)) {
          this.mouse = { x, y };
        }
      }

      this.currentColor = this.getColorCanvas(this.mouse, this.ctx);
      this.updateCursor(this.mouse);
      this.$emit('updateColor', this.currentColor );
    },


    updateWheelColors () {
      if (!this.circle) return;
      const x = this.circle.xCords;
      const y = this.circle.yCords;
      const radius = this.circle.radius;
      const sat = this.satSlider ? this.currentSat : 100
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      for (let angle = 0; angle < 360; angle += 1) {
        const gradient = this.ctx.createRadialGradient(x, y, 0, x, y, radius);
        const startAngle = (angle - 2) * Math.PI / 180;
        const endAngle = (angle + 2) * Math.PI / 180;

        this.ctx.beginPath();
        this.ctx.moveTo(x, y);
        this.ctx.arc(x, y, radius, startAngle, endAngle);
        this.ctx.closePath();

        gradient.addColorStop(0, `hsl(${angle}, ${sat}%, 100%)`);
        gradient.addColorStop(0.5, `hsl(${angle}, ${sat}%, 50%)`);
        gradient.addColorStop(1, `hsl(${angle}, ${sat}%, 0%)`);
        this.ctx.fillStyle = gradient;
        this.ctx.fill();
      }
    },

    updateSquareColors () {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      this.ctx.fillStyle = `hsl(${this.currentHue}, 100%, 50%)`;
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

      let grdBlack = this.ctx.createLinearGradient(0, 0, this.canvas.width, 0);
      grdBlack.addColorStop(0, `hsl(0, 0%, 50%)`);
      grdBlack.addColorStop(1, `hsla(0, 0%, 50%, 0)`);
      this.ctx.fillStyle = grdBlack;
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

      let grdWhite = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
      grdWhite.addColorStop(0, `hsl(0, 0%, 100%)`);
      grdWhite.addColorStop(0.5, `hsla(0, 0%, 100%, 0)`);
      grdWhite.addColorStop(0.5, `hsla(0, 0%, 0%, 0)`);
      grdWhite.addColorStop(1, `hsl(0, 0%, 0%) `);
      this.ctx.fillStyle = grdWhite;
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    },

    updateCursor (mouse) {
      if (!mouse) return;
      this.cursor = mouse;
    },

    getMouseCords ({ offsetX, offsetY }) {
      return {
        x: offsetX,
        y: offsetY
      };
    },

    getColorCanvas ({ x, y }, ctx) {
      const imageData = ctx.getImageData(x, y, 1, 1).data;
      return `rgb(${imageData[0]}, ${imageData[1]}, ${imageData[2]})`;
    },

    mouseDownHandler (event, func) {
      event.preventDefault();
      const el = event.target;
      func(event);
      const mouseupHandler = () => {
        document.removeEventListener('mousemove', func);
        document.removeEventListener('mouseup', mouseupHandler);
      };
      document.addEventListener('mousemove', func);
      document.addEventListener('mouseup', mouseupHandler);
    }

  },
  mounted() {
    if (this.mode === 'wheel') {
      this._initWheel();
    }
    if (this.mode === 'square') {
      this._initSquare();
    }
    this.$nextTick(() => {
      this.handleColor(this.color);
    });
  }
}
</script>


<style lang="sass">
@import 'variables';

.verte-picker
  position: relative
  margin: 0 auto 10px
  user-select: none
  width: 100%

  &__canvas
    &--wheel
      display: block
      margin-bottom: 10px
      margin-left: auto
      margin-right: auto

  &__strip
    margin: 0 5px

  &__cursor
    position: absolute
    top: 0
    left: 0
    margin: -6px
    width: 10px
    height: 10px
    border: 2px solid $white
    border-radius: 50%
    will-change: transform
    pointer-events: none
    background-color: transparent

  &__input
    display: flex
    margin-bottom: $margin

</style>

