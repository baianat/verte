<template lang="pug">
.verte-picker(
  ref="picker"
  :class="`verte-picker--${mode}`"
)
  .verte-picker__origin(ref="origin")
    canvas.verte-picker__canvas(
      ref="canvas"
      @mousedown="mouseDownHandler($event, onMousedown)"
    )
    .verte-picker__cursor(
      ref="cursor"
      :style="`transform: translate3d(${cursor.x}px, ${cursor.y}px, 0)`"
    )
  slider.verte-picker__slider(
    v-if="mode === 'square'"
    :gradient="['#f00', '#ff0', '#0f0', '#0ff', '#00f', '#f0f', '#f00']"
    :editable="false"
    :max="360"
    v-model="currentHue"
  )
  slider.verte-picker__slider(
    v-if="mode === 'wheel'"
    :gradient="[`hsl(${hsl.hue},0%,${hsl.lum}%)`, `hsl(${hsl.hue},100%,${hsl.lum}%)`]"
    :editable="false"
    :max="100"
    v-model="currentSat"
  )

</template>

<script>
import Slider from './Slider.vue';
import { toHsl } from 'color-fns';
import { getCartesianCoords } from '../utils';

export default {
  name: 'VertePicker',
  components: {
    Slider
  },
  props: {
    mode: { type: String, default: 'wheel' },
    edge: { type: Number, default: 250 },
    radius: { type: Number, default: 180 },
    satSlider: { type: Boolean, default: true },
    value: { type: String, default: '#fff' }
  },
  data: () => ({
    currentHue: 0,
    currentSat: 0,
    currentColor: '',
    hsl: {},
    cursor: {},
    stopUpdating: false
  }),
  watch: {
    // should only handle external changes.
    value (val, oldVal) {
      if (this.stopUpdating) {
        this.stopUpdating = false;
        return;
      }
      // TODO: Performance issue here.
      this.handleValue(val, true);
    },
    currentSat () {
      this.updateWheelColors();
      this.selectColor();
    },
    currentHue () {
      this.updateSquareColors();
      this.selectColor();
    }
  },
  methods: {
    initSquare () {
      // setup canvas
      const edge = this.edge;
      this.$refs.canvas.width = edge;
      this.$refs.canvas.height = edge - 100;
      this.ctx = this.$refs.canvas.getContext('2d');
      this.updateSquareColors();
    },
    initWheel () {
      // setup canvas
      this.$refs.canvas.width = this.radius;
      this.$refs.canvas.height = this.radius;
      this.ctx = this.$refs.canvas.getContext('2d');

      // draw wheel circle path
      this.circle = {
        path: new Path2D(), // eslint-disable-line
        xCords: this.$refs.canvas.width / 2,
        yCords: this.$refs.canvas.height / 2,
        radius: this.$refs.canvas.width / 2
      };
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
    handleValue (color, muted = false) {
      this.currentColor = color;
      this.hsl = toHsl(this.currentColor);

      if (this.mode === 'wheel') {
        this.currentSat = this.hsl.sat;
        const r = (100 - this.hsl.lum) * (this.radius / 200);
        const ratio = this.radius / 2;
        const coords = getCartesianCoords(r, this.hsl.hue / 360);
        this.cursor = { x: coords.x + ratio, y: coords.y + ratio };
        this.updateWheelColors();
      }

      if (this.mode === 'square') {
        this.currentHue = this.hsl.hue;
        const x = (this.hsl.sat / 100) * (this.$refs.canvas.width);
        const y = ((100 - this.hsl.lum) / 100) * (this.$refs.canvas.height);
        const squareEdge = this.edge - 1;
        this.cursor = { x: Math.min(x, squareEdge), y: Math.min(y - 2) };
        this.updateSquareColors();
      }

      this.selectColor(muted);
    },
    onMousedown (event) {
      if (event.target !== this.$refs.canvas) {
        return;
      }
      this.stopUpdating = true;
      const { x, y } = this.getMouseCords(event);
      if (this.mode === 'square') {
        const squareThreshold = this.edge - 1;
        this.cursor = { x: Math.min(x, squareThreshold), y: Math.min(y, squareThreshold) };
      }

      if (this.mode === 'wheel' && this.ctx.isPointInPath(this.circle.path, x, y)) {
        this.cursor = { x, y };
      }

      this.selectColor();
    },
    selectColor (muted = false) {
      this.currentColor = this.getCanvasColor(this.cursor, this.ctx);
      // stops propgation
      if (muted) return;

      this.$emit('input', this.currentColor);
    },
    updateWheelColors () {
      if (!this.circle) return;
      const x = this.circle.xCords;
      const y = this.circle.yCords;
      const radius = this.circle.radius;
      const sat = this.satSlider ? this.currentSat : 100;
      this.ctx.clearRect(0, 0, this.$refs.canvas.width, this.$refs.canvas.height);

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
      this.ctx.clearRect(0, 0, this.$refs.canvas.width, this.$refs.canvas.height);

      this.ctx.fillStyle = `hsl(${this.currentHue}, 100%, 50%)`;
      this.ctx.fillRect(0, 0, this.$refs.canvas.width, this.$refs.canvas.height);

      let grdBlack = this.ctx.createLinearGradient(0, 0, this.$refs.canvas.width, 0);
      grdBlack.addColorStop(0, `hsl(0, 0%, 50%)`);
      grdBlack.addColorStop(1, `hsla(0, 0%, 50%, 0)`);
      this.ctx.fillStyle = grdBlack;
      this.ctx.fillRect(0, 0, this.$refs.canvas.width, this.$refs.canvas.height);

      let grdWhite = this.ctx.createLinearGradient(0, 0, 0, this.$refs.canvas.height);
      grdWhite.addColorStop(0, `hsl(0, 0%, 100%)`);
      grdWhite.addColorStop(0.5, `hsla(0, 0%, 100%, 0)`);
      grdWhite.addColorStop(0.5, `hsla(0, 0%, 0%, 0)`);
      grdWhite.addColorStop(1, `hsl(0, 0%, 0%) `);
      this.ctx.fillStyle = grdWhite;
      this.ctx.fillRect(0, 0, this.$refs.canvas.width, this.$refs.canvas.height);
    },
    getMouseCords ({ offsetX, offsetY }) {
      return {
        x: offsetX,
        y: offsetY
      };
    },
    getCanvasColor ({ x, y }, ctx) {
      const imageData = ctx.getImageData(x, y, 1, 1).data;
      return `rgb(${imageData[0]}, ${imageData[1]}, ${imageData[2]})`;
    },
    mouseDownHandler (event, func) {
      event.preventDefault();
      func(event);
      const mouseupHandler = () => {
        document.removeEventListener('mousemove', func);
        document.removeEventListener('mouseup', mouseupHandler);
      };
      document.addEventListener('mousemove', func);
      document.addEventListener('mouseup', mouseupHandler);
    }

  },
  mounted () {
    if (this.mode === 'wheel') {
      this.initWheel();
      this.$refs.origin.style.width = `${this.radius}px`;
    }
    if (this.mode === 'square') {
      this.initSquare();
    }
    this.$nextTick(() => {
      this.handleValue(this.value);
    });
  }
};
</script>

<style lang="sass">
@import '../sass/variables';

.verte-picker
  width: 100%
  margin: 0 auto 10px
  &--wheel
    margin-top: 20px

  &__origin
    user-select: none
    position: relative
    margin: 0 auto
  &__slider
    margin: 10px 20px 0

  &__canvas
    display: block
    margin: 0
  &__cursor
    position: absolute
    top: 0
    left: 0
    margin: -6px
    width: 12px
    height: 12px
    border: 2px solid $white
    border-radius: 50%
    will-change: transform
    pointer-events: none
    background-color: transparent

  &__input
    display: flex
    margin-bottom: $margin

</style>
