<template lang="pug">
  .picker
    button.picker-guide {this.settings.guideIcon}
    .picker-menu(tabindex="-1" ref="menu")
      .picker-wheel(ref="wheel")
        canvas.picker-canvas(ref="canvas")
        .picker-cursor(ref="cursor")
      div.picker-input
      button.picker-submit
        svg.icon(viewBox="0 0 24 24")
          path(d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z")

</template>


<script>
export default {
  name: 'Verte',
  data() {
    return {
      currentColor: '#000'
    }
  },
  methods: {
    _initWheel() {
      this.wheel = this.$refs.wheel;
      this.canvas = this.$refs.canvas;
      this.cursor = this.$refs.cursor;


      // setup canvas
      this.canvas.width = 200;
      this.canvas.height = 200;
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

      const updateColor = (event) => {
        // check if mouse outside the wheel
        const mouse = this.getMouseCords(event);
        if (this.ctx.isPointInPath(this.circle.path, mouse.x, mouse.y)) {
          let color = this.getColorCanvas(mouse, this.ctx);
          this.selectColor(color);
          this.updateCursor(mouse);
        }
      }
      // add event listener
      this.wheel.addEventListener('mousedown', (event) => mouseDownHandler(event)(updateColor));

      this.updateWheelColors();
      this.updateCursor();
    },

    getMouseCords() {

    },
    updateWheelColors() {
      const x = this.circle.xCords;
      const y = this.circle.yCords;
      const radius = this.circle.radius;
      const saturation = 100
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      for (let angle = 0; angle < 360; angle += 1) {
        const gradient = this.ctx.createRadialGradient(x, y, 0, x, y, radius);
        const startAngle = (angle - 2) * Math.PI / 180;
        const endAngle = (angle + 2) * Math.PI / 180;

        this.ctx.beginPath();
        this.ctx.moveTo(x, y);
        this.ctx.arc(x, y, radius, startAngle, endAngle);
        this.ctx.closePath();

        gradient.addColorStop(0, `hsl(${angle}, ${saturation}%, 100%)`);
        gradient.addColorStop(0.5, `hsl(${angle}, ${saturation}%, 50%)`);
        gradient.addColorStop(1, `hsl(${angle}, ${saturation}%, 0%)`);
        this.ctx.fillStyle = gradient;
        this.ctx.fill();
      }
    },
    updateCursor() {
yar
    }
  },
  mounted() {
    this._initWheel();
  }
}
</script>


<style lang="sass">
$borderRadius: 20px
$margin: 20px
$clBlack: #000
$clWhite: #fff
$clSecondary: #fff
$fontTiny: 20px

.picker
  position: relative
  display: flex
  justify-content: center
  box-sizing: border-box

  &-guide
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
  &-wheel
    position: relative
    margin: 10px auto 20px
    user-select: none

  &-square
    position: relative
    margin: 10px auto 20px
    user-select: none
    display: flex
    justify-content: center
  &-squareStrip
    margin: 0 5px

  &-menu
    position: absolute
    top: 50px
    display: flex
    flex-direction: column
    justify-content: center
    align-items: stretch
    padding: 40px
    width: 300px
    border-radius: $borderRadius
    background-color: $clWhite
    will-change: transform

    &.is-hidden
      display: none

    &:focus
      outline: none
    

  &-recent
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
    background-color: $clBlack

  &-value
    padding: 0.6em
    width: 100%
    border: 2px solid $clBlack
    border-radius: $borderRadius 0 0 $borderRadius
    text-align: center
    font-size: $fontTiny
    -webkit-appearance: none
    -moz-appearance: textfield
    &:focus
      outline: none
      border-color: $clSecondary

  &-cursor
    position: absolute
    top: 0
    left: 0
    margin: -6px
    width: 10px
    height: 10px
    border: 2px solid $clWhite
    border-radius: 50%
    will-change: transform
    pointer-events: none
    background-color: transparent
  &-input
    display: flex
    margin-bottom: $margin
  &-submit
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
    background-color: $clBlack
    border-color: $clBlack
    >.icon
      width: 22.5px
      height: 18.5px
      fill: $clWhite
    &:hover
      >.icon
        fill: $clSecondary
  .slider-fill
    display: none

</style>

