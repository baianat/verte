/**
    * v0.0.3
    * (c) 2018 Baianat
    * @license MIT
    */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.Verte = factory());
}(this, (function () { 'use strict';

  /**
    * color-fns v0.0.5
    * (c) 2018 Baianat
    * @license MIT
    */
  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };

  var classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  var createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) { descriptor.writable = true; }
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) { defineProperties(Constructor.prototype, protoProps); }
      if (staticProps) { defineProperties(Constructor, staticProps); }
      return Constructor;
    };
  }();

  var get = function get(object, property, receiver) {
    if (object === null) { object = Function.prototype; }
    var desc = Object.getOwnPropertyDescriptor(object, property);

    if (desc === undefined) {
      var parent = Object.getPrototypeOf(object);

      if (parent === null) {
        return undefined;
      } else {
        return get(parent, property, receiver);
      }
    } else if ("value" in desc) {
      return desc.value;
    } else {
      var getter = desc.get;

      if (getter === undefined) {
        return undefined;
      }

      return getter.call(receiver);
    }
  };

  var inherits = function (subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) { Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  };

  var possibleConstructorReturn = function (self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  };

  function getColorModel(color) {
    if ((typeof color === 'undefined' ? 'undefined' : _typeof(color)) === 'object' && color.model) {
      return color.model;
    }

    if (color.slice(0, 1) === '#' && (color.length === 4 || color.length === 7)) {
      return 'hex';
    }

    if (color.slice(0, 1) === '#' && (color.length === 6 || color.length === 9)) {
      return 'hex';
    }

    if (color.slice(0, 4).toUpperCase() === 'RGBA') {
      return 'rgb';
    }

    if (color.slice(0, 3).toUpperCase() === 'RGB') {
      return 'rgb';
    }

    if (color.slice(0, 4).toUpperCase() === 'HSLA') {
      return 'hsl';
    }

    if (color.slice(0, 3).toUpperCase() === 'HSL') {
      return 'hsl';
    }

    return false;
  }

  function hexNumToDec(hexNum) {
    if (isNaN(parseInt(hexNum, 16))) {
      return 0;
    }

    return parseInt(hexNum, 16);
  }

  function isBetween(lb, ub) {
    return function (value) {
      return value >= lb && value <= ub;
    };
  }
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  function mixValue(val1, val2) {
    var ratio = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0.5;

    return Number((val1 * (1 - ratio) + val2 * ratio).toFixed(2));
  }

  var Color = function () {
    function Color(components) {
      var _this = this;

      classCallCheck(this, Color);

      this.invalid = !this.validate(components);
      if (!this.invalid) {
        Object.keys(components).forEach(function (c) {
          _this[c] = components[c];
        });
      }
      this.init();
    }

    createClass(Color, [{
      key: 'init',
      value: function init() {}
    }, {
      key: 'validate',
      value: function validate(components) {
        return !!components && (typeof components === 'undefined' ? 'undefined' : _typeof(components)) === 'object';
      }
    }]);
    return Color;
  }();

  var RgbColor = function (_Color) {
    inherits(RgbColor, _Color);

    function RgbColor() {
      classCallCheck(this, RgbColor);
      return possibleConstructorReturn(this, (RgbColor.__proto__ || Object.getPrototypeOf(RgbColor)).apply(this, arguments));
    }

    createClass(RgbColor, [{
      key: 'validate',
      value: function validate(components) {
        if (!get(RgbColor.prototype.__proto__ || Object.getPrototypeOf(RgbColor.prototype), 'validate', this).call(this, components)) {
          return false;
        }

        var isInRange = isBetween(0, 255);

        return isInRange(components.red) && isInRange(components.green) && isInRange(components.blue);
      }
    }, {
      key: 'init',
      value: function init() {
        this.model = 'rgb';
        this.alpha = this.alpha === undefined ? 1 : this.alpha;
      }
    }, {
      key: 'toString',
      value: function toString() {
        if (this.invalid) {
          return 'Invalid Color';
        }
        if (isBetween(0, 0.999)(this.alpha)) {
          return 'rgba(' + this.red + ',' + this.green + ',' + this.blue + ',' + this.alpha + ')';
        }
        return 'rgb(' + this.red + ',' + this.green + ',' + this.blue + ')';
      }
    }]);
    return RgbColor;
  }(Color);

  var HslColor = function (_Color2) {
    inherits(HslColor, _Color2);

    function HslColor() {
      classCallCheck(this, HslColor);
      return possibleConstructorReturn(this, (HslColor.__proto__ || Object.getPrototypeOf(HslColor)).apply(this, arguments));
    }

    createClass(HslColor, [{
      key: 'validate',
      value: function validate(components) {
        if (!get(HslColor.prototype.__proto__ || Object.getPrototypeOf(HslColor.prototype), 'validate', this).call(this, components)) {
          return false;
        }

        var isPercentage = isBetween(0, 100);

        return isBetween(0, 360)(components.hue) && isPercentage(components.lum) && isPercentage(components.sat);
      }
    }, {
      key: 'init',
      value: function init() {
        this.model = 'hsl';
        this.alpha = this.alpha || 1;
      }
    }, {
      key: 'toString',
      value: function toString() {
        if (this.invalid) {
          return 'Invalid Color';
        }
        if (isBetween(0, 0.999)(this.alpha)) {
          return 'hsla(' + this.hue + ',' + this.sat + '%,' + this.lum + '%,' + this.alpha + ')';
        }
        return 'hsl(' + this.hue + ',' + this.sat + '%,' + this.lum + '%)';
      }
    }]);
    return HslColor;
  }(Color);

  var HexColor = function (_Color3) {
    inherits(HexColor, _Color3);

    function HexColor() {
      classCallCheck(this, HexColor);
      return possibleConstructorReturn(this, (HexColor.__proto__ || Object.getPrototypeOf(HexColor)).apply(this, arguments));
    }

    createClass(HexColor, [{
      key: 'validate',
      value: function validate(components) {
        if (!get(HexColor.prototype.__proto__ || Object.getPrototypeOf(HexColor.prototype), 'validate', this).call(this, components)) {
          return false;
        }

        return (/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test('#' + components.red + components.green + components.blue)
        );
      }
    }, {
      key: 'init',
      value: function init() {
        this.model = 'hex';
        this.alpha = this.alpha || 'ff';
      }
    }, {
      key: 'toString',
      value: function toString() {
        if (this.invalid) {
          return 'Invalid Color';
        }
        if (isBetween(0, 0.999)(hexNumToDec(this.alpha) / 255)) {
          return '#' + this.red + this.green + this.blue + this.alpha;
        }
        return '#' + this.red + this.green + this.blue;
      }
    }]);
    return HexColor;
  }(Color);

  function parseRgb(rgb) {
    if ((typeof rgb === 'undefined' ? 'undefined' : _typeof(rgb)) === 'object') {
      return rgb;
    }

    // will consider rgb/rgba color prefix as a valid input color
    // while the output will be a valid web colors
    // valid input colors examples 'rgb(100, 0, 0, 0.5)', 'rgba(0, 0, 0)'
    // the output for the inputted examples 'rgba(100, 0, 0, 0.5)', 'rgb(0, 0, 0)'
    var match = rgb.match(/^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,*\s*(\d*(?:\.\d+)*)*\)/i);
    if (!match || match.length < 4) {
      return new RgbColor();
    }
    return new RgbColor({
      red: Number(match[1]),
      green: Number(match[2]),
      blue: Number(match[3]),
      alpha: Number(match[4])
    });
  }

  function expandHexShorthand(hex) {
    var regex = /^#([a-f\d])([a-f\d])([a-f\d])([a-f\d])*$/i;
    if ((hex.length === 5 || hex.length === 4) && regex.test(hex)) {
      hex = hex.replace(regex, function (m, r, g, b, a) {
        return '#' + r + r + g + g + b + b + (a ? '' + a + a : '');
      });
    }

    return hex;
  }

  function parseHex(hex) {
    if ((typeof hex === 'undefined' ? 'undefined' : _typeof(hex)) === 'object') {
      return hex;
    }

    var expanded = expandHexShorthand(hex);
    var match = expanded.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})*/i);
    if (!match || match.length < 4) {
      return new HexColor();
    }

    return new HexColor({
      hex: expanded,
      red: match[1],
      green: match[2],
      blue: match[3],
      alpha: match[4]
    });
  }

  function parseHsl(hsl) {
    if ((typeof hsl === 'undefined' ? 'undefined' : _typeof(hsl)) === 'object') {
      return hsl;
    }

    // will consider hsl/hsla color prefix as a valid input color
    // while the output will be a valid web colors
    // valid input colors examples 'hsl(255, 100%, 50%, 0.5)', 'hsla(100, 100%, 50%)'
    // the output for the inputted examples 'hsla(255, 100%, 50%, 0.5)', 'hsl(100, 100%, 50%)'
    var match = hsl.match(/^hsla?\(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*,*\s*(\d*(?:\.\d+)*)*\)/i);
    if (!match || match.length < 4) {
      return new HslColor();
    }

    return new HslColor({
      hue: Number(match[1]),
      sat: Number(match[2]),
      lum: Number(match[3]),
      alpha: Number(match[4])
    });
  }

  /**
   * Checks if the given color string is valid (parsable).
   *
   * @param {String} color The color string to be checked.
   */
  function isValidColor(color) {
    var model = getColorModel(color);

    if (model === 'rgb') {
      return !parseRgb(color).invalid;
    }
    if (model === 'hex') {
      return !parseHex(color).invalid;
    }
    if (model === 'hsl') {
      return !parseHsl(color).invalid;
    }
    return false;
  }

  function decNumToHex(decNum) {
    decNum = Math.floor(decNum);
    if (isNaN(decNum)) {
      return '00';
    }

    return ('0' + decNum.toString(16)).slice(-2);
  }

  function rgbToHex(rgb) {
    if (!rgb) {
      return new HexColor();
    }
    rgb = parseRgb(rgb);
    var _ref = [decNumToHex(rgb.red), decNumToHex(rgb.green), decNumToHex(rgb.blue), rgb.alpha ? decNumToHex(rgb.alpha * 255) : null],
        rr = _ref[0],
        gg = _ref[1],
        bb = _ref[2],
        aa = _ref[3];


    return new HexColor({
      red: rr,
      green: gg,
      blue: bb,
      alpha: aa || 1
    });
  }

  function rgb2Hsl(rgb) {
    if (!rgb) {
      return new HslColor();
    }

    rgb = parseRgb(rgb);

    // Convert the RGB values to the range 0-1
    var _ref = [rgb.red / 255, rgb.green / 255, rgb.blue / 255, rgb.alpha],
        red = _ref[0],
        green = _ref[1],
        blue = _ref[2],
        alpha = _ref[3];
    var hue = 0,
        sat = 0,
        lum = 0;

    // Find the minimum and maximum values of R, G and B.

    var min = Math.min(red, green, blue);
    var max = Math.max(red, green, blue);

    // Calculate the lightness value
    lum = (min + max) / 2;

    // Calculate the saturation.
    if (min !== max) {
      sat = lum > 0.5 ? (max - min) / (2 - max - min) : (max - min) / (max + min);
    }

    // calculate the hue
    if (red >= max && min !== max) {
      hue = 60 * ((green - blue) / (max - min));
    }
    if (green >= max && min !== max) {
      hue = 60 * (2.0 + (blue - red) / (max - min));
    }
    if (blue >= max && min !== max) {
      hue = 60 * (4.0 + (red - green) / (max - min));
    }

    // normalize values
    hue = hue < 0 ? Math.floor(hue + 360) : Math.floor(hue);
    sat = Math.floor(sat * 100);
    lum = Math.floor(lum * 100);

    return new HslColor({
      hue: hue,
      sat: sat,
      lum: lum,
      alpha: alpha
    });
  }

  function hexToRgb(hex) {
    if (!hex) {
      return new RgbColor();
    }

    var _parseHex = parseHex(hex),
        red = _parseHex.red,
        green = _parseHex.green,
        blue = _parseHex.blue,
        alpha = _parseHex.alpha;

    return new RgbColor({
      red: hexNumToDec(red),
      green: hexNumToDec(green),
      blue: hexNumToDec(blue),
      alpha: alpha === undefined ? 1 : Number((hexNumToDec(alpha) / 255).toFixed(2))
    });
  }

  function normalizeDecNum(value) {
    return Math.min(Math.max(parseInt(value), 0), 255);
  }

  function hslToRgb(hsl) {
    if (!hsl) {
      return new RgbColor();
    }
    hsl = parseHsl(hsl);

    var _ref = [hsl.hue / 360, hsl.sat / 100, hsl.lum / 100, hsl.alpha],
        hue = _ref[0],
        sat = _ref[1],
        lgh = _ref[2],
        alpha = _ref[3];
    var red = 0,
        green = 0,
        blue = 0;


    if (sat === 0) {
      red = green = blue = normalizeDecNum(lgh * 255);
    }

    if (sat !== 0) {
      var temp1 = lgh >= 50 ? lgh + sat - lgh * sat : lgh * (1 + sat);
      var temp2 = 2 * lgh - temp1;

      var testHue = function testHue(test) {
        if (test < 0) { test += 1; }
        if (test > 1) { test -= 1; }
        if (test < 1 / 6) { return temp2 + (temp1 - temp2) * 6 * test; }
        if (test < 1 / 2) { return temp1; }
        if (test < 2 / 3) { return temp2 + (temp1 - temp2) * (2 / 3 - test) * 6; }
        return temp2;
      };

      red = normalizeDecNum(255 * testHue(hue + 1 / 3));
      green = normalizeDecNum(255 * testHue(hue));
      blue = normalizeDecNum(255 * testHue(hue - 1 / 3));
    }

    return new RgbColor({
      red: red,
      green: green,
      blue: blue,
      alpha: alpha
    });
  }

  function hexToHsl(hex) {
    if (!hex) {
      return new HslColor();
    }
    return rgb2Hsl(hexToRgb(hex));
  }

  function hslToHex(hsl) {
    if (!hsl) {
      return new HexColor();
    }
    return rgbToHex(hslToRgb(hsl));
  }

  /**
   * Parses the given color string into a RGB color object.
   *
   * @param {String} color The color to be parsed and converted.
   */
  function toRgb(color) {
    var model = getColorModel(color);

    if (model === 'hex') {
      return hexToRgb(color);
    }

    if (model === 'hsl') {
      return hslToRgb(color);
    }

    if (model === 'rgb' && typeof color === 'string') {
      return parseRgb(color);
    }

    if (model === 'rgb' && (typeof color === 'undefined' ? 'undefined' : _typeof(color)) === 'object') {
      return color;
    }

    return new RgbColor();
  }

  /**
   * Parses the given color string into a HSL color object.
   *
   * @param {String} color The color to be parsed and converted.
   */
  function toHsl(color) {
    var model = getColorModel(color);

    if (model === 'hex') {
      return hexToHsl(color);
    }

    if (model === 'rgb') {
      return rgb2Hsl(color);
    }

    if (model === 'hsl' && typeof color === 'string') {
      return parseHsl(color);
    }

    if (model === 'hsl' && (typeof color === 'undefined' ? 'undefined' : _typeof(color)) === 'object') {
      return color;
    }

    return new HslColor();
  }

  /**
   * Parses the given color string into a Hex color object.
   *
   * @param {String} color The color to be parsed and converted.
   */
  function toHex(color) {
    var model = getColorModel(color);

    if (model === 'rgb') {
      return rgbToHex(color);
    }

    if (model === 'hsl') {
      return hslToHex(color);
    }

    if (model === 'hex' && typeof color === 'string') {
      return parseHex(color);
    }

    if (model === 'hex' && (typeof color === 'undefined' ? 'undefined' : _typeof(color)) === 'object') {
      return color;
    }

    return new HexColor();
  }

  function getRandomColor() {
    return 'rgb(' + getRandomInt(0, 255) + ', ' + getRandomInt(0, 255) + ', ' + getRandomInt(0, 255) + ')';
  }

  function mixColors(color1, color2, ratio) {
    color1 = toRgb(color1);
    color2 = toRgb(color2);
    var red = Math.floor(mixValue(color1.red, color2.red, ratio));
    var green = Math.floor(mixValue(color1.green, color2.green, ratio));
    var blue = Math.floor(mixValue(color1.blue, color2.blue, ratio));
    var alpha = mixValue(color1.alpha, color2.alpha, ratio);
    return new RgbColor({
      red: red,
      green: green,
      blue: blue,
      alpha: alpha
    });
  }

  /**
   * Utilities
   */

  function getArray (length, value) {
    var array = [];
    for (var i = 0; i < length; i++) {
      var temp = typeof value === 'function' ? value() : value;
      array.push(temp);
    }
    return array;
  }

  function isElementClosest (element, wrapper) {
    while (element !== document && element !== null) {
      if (element === wrapper) { return true; }
      element = element.parentNode;
    }
    return false;
  }

  function getClosestValue (array, value) {
    return array.reduce(function (prev, curr) {
      return Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev;
    });
  }

  function getCartesianCoords (r, theta) {
    return {
      x: r * Math.cos(theta * Math.PI * 2),
      y: r * Math.sin(theta * Math.PI * 2)
    };
  }

  function warn (message) {
    console.warn(("[Verte]: " + message));
  }

  //

  var script = {
    name: 'Slider',
    props: {
      gradient: Array,
      classes: Array,
      colorCode: { type: Boolean, default: false },
      editable: { type: Boolean, default: true },
      reverse: { type: Boolean, default: false },
      label: { type: Boolean, default: false },
      trackSlide: { type: Boolean, default: true },
      min: { type: Number, default: 0 },
      max: { type: Number, default: 255 },
      step: { type: Number, default: 1 },
      value: { type: Number, default: 0 },
      handlesValue: { type: Array, default: function () { return [0]; } }
    },
    data: function () { return ({
      fill: {
        translate: 0,
        scale: 0
      },
      multiple: false,
      currentValue: 0,
      handles: [],
      values: []
    }); },
    watch: {
      gradient: function gradient (val) {
        this.initGradient(val);
        this.reloadHandlesColor();
      },
      values: function values () {
        this.multiple = this.values.length > 1;
        this.fill = this.multiple ? false : this.fill || {};
      },
      value: function value (val, oldVal) {
        if (val === oldVal || val === this.currentValue) { return; }

        this.updateValue(this.value, true);
      }
    },
    methods: {
      init: function init () {
        var this$1 = this;

        this.multiple = this.values.length > 1;
        this.values = this.handlesValue;
        this.handles = this.handlesValue.map(function (value, index) {
          return { value: value, position: 0, color: '#fff' };
        });
        if (this.values.length === 1) {
          this.values[0] = Number(this.value);
        }
        this.values.sort();

        this.initElements();
        if (this.gradient) {
          this.initGradient(this.gradient);
        }
        this.initEvents();
        this.values.forEach(function (handle, index) {
          this$1.activeHandle = index;
          this$1.updateValue(handle, true);
        });
      },
      initElements: function initElements () {
        var ref;

        this.wrapper = this.$refs.wrapper;
        this.track = this.$refs.track;
        this.fill = this.$refs.fill;

        this.wrapper.classList.toggle('slider--editable', this.editable);
        this.wrapper.classList.toggle('slider--reverse', this.reverse);
        if (this.classes) {
          (ref = this.wrapper.classList).add.apply(ref, this.classes);
        }
      },
      initGradient: function initGradient (gradient) {
        if (gradient.length > 1) {
          this.fill.style.backgroundImage = "linear-gradient(90deg, " + gradient + ")";
          return;
        }
        this.fill.style.backgroundImage = '';
        this.fill.style.backgroundColor = gradient[0];
        this.handles.forEach(function (handle) {
          handle.style.color = gradient[0];
        });
      },
      initEvents: function initEvents () {
        var this$1 = this;

        window.addEventListener('resize', function () {
          this$1.updateWidth();
          this$1.updateValue(this$1.currentValue, true);
        });
      },
      /**
       * fire select events
       */
      select: function select$$1 (event) {
        event.preventDefault();
        event.stopPropagation();
        // check if  left mouse is clicked
        if (event.buttons !== 1) { return; }
        this.track.classList.add('slider--dragging');
        this.ticking = false;

        var stepValue = this.getStepValue(event);

        if (this.multiple) {
          var closest = getClosestValue(this.values, stepValue);
          this.activeHandle = this.values.indexOf(closest);
        }
        this.updateValue(stepValue);

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
      dragging: function dragging (event) {
        var this$1 = this;

        event.preventDefault();
        var stepValue = this.getStepValue(event);
        if (!this.ticking) {
          window.requestAnimationFrame(function () {
            this$1.updateValue(stepValue);
            this$1.ticking = false;
          });

          this.ticking = true;
        }
      },
      /**
       * release handler
       */
      release: function release () {
        this.track.classList.remove('slider--dragging');
        document.removeEventListener('mousemove', this.tempDrag);
        document.removeEventListener('touchmove', this.tempDrag);
        document.removeEventListener('mouseup', this.tempRelease);
        document.removeEventListener('touchend', this.tempRelease);
      },
      getStepValue: function getStepValue (event) {
        var eventX = event.type.includes('mouse')
          ? event.clientX : event.type.includes('touch')
            ? event.touches[0].clientX : event;

        var mouseValue = (eventX - this.currentX);
        var stepCount = parseInt((mouseValue / this.stepWidth) + 0.5, 10);
        var stepValue = (stepCount * this.step) + this.min;
        if (!this.decimalsCount) {
          return stepValue;
        }
        return Number(stepValue.toFixed(this.decimalsCount));
      },
      updateWidth: function updateWidth () {
        var trackRect = this.track.getBoundingClientRect();
        this.currentX = trackRect.left;
        this.width = trackRect.width;
        this.stepWidth = (this.width / (this.max - this.min)) * this.step;
      },
      /**
       * get the filled area percentage
       * @param  {Object} slider
       * @param  {Number} value
       * @return {Number}
       */
      getPositionPercentage: function getPositionPercentage (value) {
        return (value - this.min) / (this.max - this.min);
      },
      normalizeValue: function normalizeValue (value) {
        if (isNaN(Number(value))) {
          return this.value;
        }
        if (this.multiple) {
          var prevValue = this.values[this.activeHandle - 1] || this.min;
          var nextValue = this.values[this.activeHandle + 1] || this.max;
          value = Math.min(Math.max(Number(value), prevValue), nextValue);
        }
        return Math.min(Math.max(Number(value), this.min), this.max);
      },
      addHandle: function addHandle (value) {
        var closest = getClosestValue(this.values, value);
        var closestIndex = this.values.indexOf(closest);
        var closestValue = this.values[closestIndex];
        var newIndex = closestValue <= value ? closestIndex + 1 : closestIndex;
        this.handles.splice(newIndex, 0, {
          value: value,
          position: 0,
          color: '#fff'
        });
        this.values.splice(newIndex, 0, value);

        this.activeHandle = newIndex;
        this.currentValue = null;
        this.updateValue(value);
      },
      removeHandle: function removeHandle (index) {
        this.handles.splice(index, 1);
        this.values.splice(index, 1);
        this.activeHandle = index === 0 ? index + 1 : index - 1;
      },
      /**
       * get the handle color
       * @param  {Number} positionPercentage
       * @return {Number} handle hex color code
       */
      getHandleColor: function getHandleColor (positionPercentage) {
        var this$1 = this;

        var colorCount = this.gradient.length - 1;
        var region = positionPercentage;
        for (var i = 1; i <= colorCount; i++) {
          // check the current zone
          if (region >= ((i - 1) / colorCount) && region <= (i / colorCount)) {
            // get the active color percentage
            var colorPercentage = (region - ((i - 1) / colorCount)) / (1 / colorCount);
            // return the mixed color based on the zone boundary colors
            return mixColors(this$1.gradient[i - 1], this$1.gradient[i], colorPercentage);
          }
        }
        return 'rgb(0, 0, 0)';
      },
      /**
       * update the slider fill, value and color
       * @param {Number} value
       */

      reloadHandlesColor: function reloadHandlesColor () {
        var this$1 = this;

        this.handles.forEach(function (handle, index) {
          var positionPercentage = this$1.getPositionPercentage(handle.value);
          var color = this$1.getHandleColor(positionPercentage);
          this$1.handles[index].color = color.toString();
        });
      },

      updateValue: function updateValue (value, mute) {
        var this$1 = this;
        if ( mute === void 0 ) mute = false;

        // if (Number(value) === this.value) return;

        window.requestAnimationFrame(function () {
          if (!this$1.width) {
            this$1.updateWidth();
          }
          var normalized = this$1.normalizeValue(value);
          var positionPercentage = this$1.getPositionPercentage(normalized);

          if (this$1.fill) {
            this$1.fill.translate = positionPercentage * this$1.width;
            this$1.fill.scale = 1 - positionPercentage;
          }

          this$1.values[this$1.activeHandle] = normalized;
          this$1.handles[this$1.activeHandle].value = normalized;
          this$1.handles[this$1.activeHandle].positoin = positionPercentage * this$1.width;
          this$1.currentValue = normalized;
          this$1.$refs.input.value = this$1.currentValue;

          if (this$1.gradient) {
            var color = this$1.getHandleColor(positionPercentage);
            this$1.handles[this$1.activeHandle].color = color.toString();
            if (this$1.colorCode) {
              this$1.currentValue = color;
            }
          }

          if (mute) { return; }
          this$1.$emit('input', this$1.currentValue);
        });
      }
    },
    created: function created () {
      var stepSplited = this.step.toString().split('.')[1];
      this.currentValue = this.value;
      this.decimalsCount = stepSplited ? stepSplited.length : 0;
    },
    mounted: function mounted () {
      var this$1 = this;

      this.init();
      this.$nextTick(function () {
        this$1.updateWidth();
        this$1.updateValue(undefined, true);
      });
    }
  };

  var __vue_script__ = script;
  /* template */
  var __vue_render__ = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("div", { ref: "wrapper", staticClass: "slider" }, [
      _c(
        "div",
        _vm._g(
          { ref: "track", staticClass: "slider__track" },
          _vm.trackSlide ? { mousedown: _vm.select, touchstrat: _vm.select } : {}
        ),
        [
          _c("div", { ref: "fill", staticClass: "slider__fill" }),
          _vm._l(_vm.handles, function(handle) {
            return _c(
              "div",
              {
                staticClass: "slider__handle",
                style:
                  "transform: translate(" +
                  handle.positoin +
                  "px, 0); background-color: " +
                  handle.color +
                  ";",
                nativeOn: {
                  mousedown: function($event) {
                    return _vm.select($event)
                  },
                  touchstart: function($event) {
                    return _vm.select($event)
                  }
                }
              },
              [
                _vm.label
                  ? _c("div", { staticClass: "slider__label" }, [
                      _vm._v(_vm._s(handle.value))
                    ])
                  : _vm._e()
              ]
            )
          })
        ],
        2
      ),
      _c("input", {
        directives: [
          {
            name: "show",
            rawName: "v-show",
            value: _vm.editable,
            expression: "editable"
          }
        ],
        ref: "input",
        staticClass: "slider__input",
        attrs: { type: _vm.colorCode ? "text" : "number" },
        on: {
          change: function($event) {
            _vm.updateValue($event.target.value);
          }
        }
      })
    ])
  };
  var __vue_staticRenderFns__ = [];
  __vue_render__._withStripped = true;

  var __vue_template__ = typeof __vue_render__ !== 'undefined'
    ? { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ }
    : {};
  /* style */
  var __vue_inject_styles__ = undefined;
  /* scoped */
  var __vue_scope_id__ = undefined;
  /* module identifier */
  var __vue_module_identifier__ = undefined;
  /* functional template */
  var __vue_is_functional_template__ = false;
  /* component normalizer */
  function __vue_normalize__(
    template, style, script$$1,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    var component = script$$1 || {};

    {
      component.__file = "/mnt/c/Users/logar/Code/verte/src/components/Slider.vue";
    }

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) { component.functional = true; }
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  function __vue_create_injector__() {
    var head = document.head || document.getElementsByTagName('head')[0];
    var styles = __vue_create_injector__.styles || (__vue_create_injector__.styles = {});
    var isOldIE =
      typeof navigator !== 'undefined' &&
      /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());

    return function addStyle(id, css) {
      if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]')) { return } // SSR styles are present.

      var group = isOldIE ? css.media || 'default' : id;
      var style = styles[group] || (styles[group] = { ids: [], parts: [], element: undefined });

      if (!style.ids.includes(id)) {
        var code = css.source;
        var index = style.ids.length;

        style.ids.push(id);

        if (isOldIE) {
          style.element = style.element || document.querySelector('style[data-group=' + group + ']');
        }

        if (!style.element) {
          var el = style.element = document.createElement('style');
          el.type = 'text/css';

          if (css.media) { el.setAttribute('media', css.media); }
          if (isOldIE) {
            el.setAttribute('data-group', group);
            el.setAttribute('data-next-index', '0');
          }

          head.appendChild(el);
        }

        if (isOldIE) {
          index = parseInt(style.element.getAttribute('data-next-index'));
          style.element.setAttribute('data-next-index', index + 1);
        }

        if (style.element.styleSheet) {
          style.parts.push(code);
          style.element.styleSheet.cssText = style.parts
            .filter(Boolean)
            .join('\n');
        } else {
          var textNode = document.createTextNode(code);
          var nodes = style.element.childNodes;
          if (nodes[index]) { style.element.removeChild(nodes[index]); }
          if (nodes.length) { style.element.insertBefore(textNode, nodes[index]); }
          else { style.element.appendChild(textNode); }
        }
      }
    }
  }
  /* style inject SSR */


  var Slider = __vue_normalize__(
    __vue_template__,
    __vue_inject_styles__,
    typeof __vue_script__ === 'undefined' ? {} : __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    typeof __vue_create_injector__ !== 'undefined' ? __vue_create_injector__ : function () {},
    typeof __vue_create_injector_ssr__ !== 'undefined' ? __vue_create_injector_ssr__ : function () {}
  );

  //

  var script$1 = {
    name: 'Picker',
    components: {
      Slider: Slider
    },
    props: {
      mode: { type: String, default: 'wheel' },
      edge: { type: Number, default: 190 },
      radius: { type: Number, default: 200 },
      satSlider: { type: Boolean, default: true },
      value: { type: String, default: '#fff' }
    },
    data: function () { return ({
      currentHue: 0,
      currentSat: 0,
      currentColor: '',
      hsl: {},
      cursor: {},
      stopUpdating: false
    }); },
    watch: {
      // should only handle external changes.
      value: function value (val, oldVal) {
        if (this.stopUpdating) {
          this.stopUpdating = false;
          return;
        }
        // TODO: Performance issue here.
        this.handleValue(val, true);
      }
    },
    methods: {
      initSquare: function initSquare () {
        // setup canvas
        var edge = this.edge;
        this.$refs.canvas.width = edge;
        this.$refs.canvas.height = edge;
        this.$refs.strip.width = this.edge / 10;
        this.$refs.strip.height = edge;
        this.ctx = this.$refs.canvas.getContext('2d');
        this.$refs.stripCtx = this.$refs.strip.getContext('2d');

        this.$refs.stripCtx.rect(0, 0, this.$refs.strip.width, this.$refs.strip.height);
        var hue = this.$refs.stripCtx.createLinearGradient(0, 0, 0, this.$refs.strip.height);
        for (var angle = 0; angle < 360; angle += 1) {
          hue.addColorStop(angle / 359, ("hsl(" + angle + ", 100%, 50%)"));
        }
        this.$refs.stripCtx.fillStyle = hue;
        this.$refs.stripCtx.fill();

        this.updateSquareColors();
      },
      initWheel: function initWheel () {
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
      handleValue: function handleValue (color, muted) {
        if ( muted === void 0 ) muted = false;

        this.currentColor = color;
        this.hsl = toHsl(this.currentColor);

        if (this.mode === 'wheel') {
          this.currentSat = this.hsl.sat;
          var r = (100 - this.hsl.lum) * (this.radius / 200);
          var ratio = this.radius / 2;
          var coords = getCartesianCoords(r, this.hsl.hue / 360);
          this.cursor = { x: coords.x + ratio, y: coords.y + ratio };
          this.updateWheelColors();
        }

        if (this.mode === 'square') {
          this.currentHue = this.hsl.hue;
          var x = (this.hsl.sat / 100) * (this.edge);
          var y = ((100 - this.hsl.lum) / 100) * (this.edge);
          var squareEdge = this.edge - 1;
          this.cursor = { x: Math.min(x, squareEdge), y: Math.min(y - 2) };
          this.updateSquareColors();
        }

        this.selectColor(muted);
      },
      selectHue: function selectHue (event) {
        if (event.target !== this.$refs.strip) {
          return;
        }
        var tempColor = this.getColorCanvas(this.getMouseCords(event), this.$refs.stripCtx);
        this.currentHue = toHsl(tempColor).hue;
        this.updateSquareColors();
        this.selectColor();
      },
      selectSat: function selectSat (val) {
        this.currentSat = val;
        this.updateWheelColors();
        this.selectColor();
      },
      onMousedown: function onMousedown (event) {
        if (event.target !== this.$refs.canvas) {
          return;
        }
        this.stopUpdating = true;
        var ref = this.getMouseCords(event);
        var x = ref.x;
        var y = ref.y;
        if (this.mode === 'square') {
          var squareThreshold = this.edge - 1;
          this.cursor = { x: Math.min(x, squareThreshold), y: Math.min(y, squareThreshold) };
        }

        if (this.mode === 'wheel' && this.ctx.isPointInPath(this.circle.path, x, y)) {
          this.cursor = { x: x, y: y };
        }

        this.selectColor();
      },
      selectColor: function selectColor (mute) {
        if ( mute === void 0 ) mute = false;

        this.currentColor = this.getColorCanvas(this.cursor, this.ctx);
        // stops propgation
        if (mute) {
          return;
        }

        this.$emit('input', this.currentColor);
      },
      updateWheelColors: function updateWheelColors () {
        var this$1 = this;

        if (!this.circle) { return; }
        var x = this.circle.xCords;
        var y = this.circle.yCords;
        var radius = this.circle.radius;
        var sat = this.satSlider ? this.currentSat : 100;
        this.ctx.clearRect(0, 0, this.$refs.canvas.width, this.$refs.canvas.height);

        for (var angle = 0; angle < 360; angle += 1) {
          var gradient = this$1.ctx.createRadialGradient(x, y, 0, x, y, radius);
          var startAngle = (angle - 2) * Math.PI / 180;
          var endAngle = (angle + 2) * Math.PI / 180;

          this$1.ctx.beginPath();
          this$1.ctx.moveTo(x, y);
          this$1.ctx.arc(x, y, radius, startAngle, endAngle);
          this$1.ctx.closePath();

          gradient.addColorStop(0, ("hsl(" + angle + ", " + sat + "%, 100%)"));
          gradient.addColorStop(0.5, ("hsl(" + angle + ", " + sat + "%, 50%)"));
          gradient.addColorStop(1, ("hsl(" + angle + ", " + sat + "%, 0%)"));
          this$1.ctx.fillStyle = gradient;
          this$1.ctx.fill();
        }
      },
      updateSquareColors: function updateSquareColors () {
        this.ctx.clearRect(0, 0, this.$refs.canvas.width, this.$refs.canvas.height);

        this.ctx.fillStyle = "hsl(" + (this.currentHue) + ", 100%, 50%)";
        this.ctx.fillRect(0, 0, this.$refs.canvas.width, this.$refs.canvas.height);

        var grdBlack = this.ctx.createLinearGradient(0, 0, this.$refs.canvas.width, 0);
        grdBlack.addColorStop(0, "hsl(0, 0%, 50%)");
        grdBlack.addColorStop(1, "hsla(0, 0%, 50%, 0)");
        this.ctx.fillStyle = grdBlack;
        this.ctx.fillRect(0, 0, this.$refs.canvas.width, this.$refs.canvas.height);

        var grdWhite = this.ctx.createLinearGradient(0, 0, 0, this.$refs.canvas.height);
        grdWhite.addColorStop(0, "hsl(0, 0%, 100%)");
        grdWhite.addColorStop(0.5, "hsla(0, 0%, 100%, 0)");
        grdWhite.addColorStop(0.5, "hsla(0, 0%, 0%, 0)");
        grdWhite.addColorStop(1, "hsl(0, 0%, 0%) ");
        this.ctx.fillStyle = grdWhite;
        this.ctx.fillRect(0, 0, this.$refs.canvas.width, this.$refs.canvas.height);
      },
      getMouseCords: function getMouseCords (ref) {
        var offsetX = ref.offsetX;
        var offsetY = ref.offsetY;

        return {
          x: offsetX,
          y: offsetY
        };
      },
      getColorCanvas: function getColorCanvas (ref, ctx) {
        var x = ref.x;
        var y = ref.y;

        var imageData = ctx.getImageData(x, y, 1, 1).data;
        return ("rgb(" + (imageData[0]) + ", " + (imageData[1]) + ", " + (imageData[2]) + ")");
      },
      mouseDownHandler: function mouseDownHandler (event, func) {
        event.preventDefault();
        func(event);
        var mouseupHandler = function () {
          document.removeEventListener('mousemove', func);
          document.removeEventListener('mouseup', mouseupHandler);
        };
        document.addEventListener('mousemove', func);
        document.addEventListener('mouseup', mouseupHandler);
      }

    },
    mounted: function mounted () {
      var this$1 = this;

      if (this.mode === 'wheel') {
        this.initWheel();
        this.$refs.origin.style.width = (this.radius) + "px";
      }
      if (this.mode === 'square') {
        this.initSquare();
      }
      this.$nextTick(function () {
        this$1.handleValue(this$1.value);
      });
    }
  };

  var __vue_script__$1 = script$1;
  /* template */
  var __vue_render__$1 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "div",
      { ref: "picker", staticClass: "verte-picker" },
      [
        _c("div", { ref: "origin", staticClass: "verte-picker__origin" }, [
          _c("canvas", {
            ref: "canvas",
            staticClass: "verte-picker__canvas",
            class: "verte-picker__canvas--" + _vm.mode,
            on: {
              mousedown: function($event) {
                _vm.mouseDownHandler($event, _vm.onMousedown);
              }
            }
          }),
          _vm.mode === "square"
            ? _c("canvas", {
                ref: "strip",
                staticClass: "verte-picker__strip",
                on: {
                  mousedown: function($event) {
                    _vm.mouseDownHandler($event, _vm.selectHue);
                  }
                }
              })
            : _vm._e(),
          _c("div", {
            ref: "cursor",
            staticClass: "verte-picker__cursor",
            style:
              "transform: translate3d(" +
              _vm.cursor.x +
              "px, " +
              _vm.cursor.y +
              "px, 0)"
          })
        ]),
        _vm.mode === "wheel"
          ? _c("slider", {
              ref: "saturation",
              staticClass: "verte-picker__saturation",
              attrs: {
                gradient: [
                  "hsl(" + _vm.hsl.hue + ",0%," + _vm.hsl.lum + "%)",
                  "hsl(" + _vm.hsl.hue + ",100%," + _vm.hsl.lum + "%)"
                ],
                editable: false,
                max: 100,
                value: _vm.currentSat
              },
              on: { input: _vm.selectSat }
            })
          : _vm._e()
      ],
      1
    )
  };
  var __vue_staticRenderFns__$1 = [];
  __vue_render__$1._withStripped = true;

  var __vue_template__$1 = typeof __vue_render__$1 !== 'undefined'
    ? { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 }
    : {};
  /* style */
  var __vue_inject_styles__$1 = undefined;
  /* scoped */
  var __vue_scope_id__$1 = undefined;
  /* module identifier */
  var __vue_module_identifier__$1 = undefined;
  /* functional template */
  var __vue_is_functional_template__$1 = false;
  /* component normalizer */
  function __vue_normalize__$1(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    var component = script || {};

    {
      component.__file = "/mnt/c/Users/logar/Code/verte/src/components/Picker.vue";
    }

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) { component.functional = true; }
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  function __vue_create_injector__$1() {
    var head = document.head || document.getElementsByTagName('head')[0];
    var styles = __vue_create_injector__$1.styles || (__vue_create_injector__$1.styles = {});
    var isOldIE =
      typeof navigator !== 'undefined' &&
      /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());

    return function addStyle(id, css) {
      if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]')) { return } // SSR styles are present.

      var group = isOldIE ? css.media || 'default' : id;
      var style = styles[group] || (styles[group] = { ids: [], parts: [], element: undefined });

      if (!style.ids.includes(id)) {
        var code = css.source;
        var index = style.ids.length;

        style.ids.push(id);

        if (isOldIE) {
          style.element = style.element || document.querySelector('style[data-group=' + group + ']');
        }

        if (!style.element) {
          var el = style.element = document.createElement('style');
          el.type = 'text/css';

          if (css.media) { el.setAttribute('media', css.media); }
          if (isOldIE) {
            el.setAttribute('data-group', group);
            el.setAttribute('data-next-index', '0');
          }

          head.appendChild(el);
        }

        if (isOldIE) {
          index = parseInt(style.element.getAttribute('data-next-index'));
          style.element.setAttribute('data-next-index', index + 1);
        }

        if (style.element.styleSheet) {
          style.parts.push(code);
          style.element.styleSheet.cssText = style.parts
            .filter(Boolean)
            .join('\n');
        } else {
          var textNode = document.createTextNode(code);
          var nodes = style.element.childNodes;
          if (nodes[index]) { style.element.removeChild(nodes[index]); }
          if (nodes.length) { style.element.insertBefore(textNode, nodes[index]); }
          else { style.element.appendChild(textNode); }
        }
      }
    }
  }
  /* style inject SSR */


  var Picker = __vue_normalize__$1(
    __vue_template__$1,
    __vue_inject_styles__$1,
    typeof __vue_script__$1 === 'undefined' ? {} : __vue_script__$1,
    __vue_scope_id__$1,
    __vue_is_functional_template__$1,
    __vue_module_identifier__$1,
    typeof __vue_create_injector__$1 !== 'undefined' ? __vue_create_injector__$1 : function () {},
    typeof __vue_create_injector_ssr__ !== 'undefined' ? __vue_create_injector_ssr__ : function () {}
  );

  //

  var script$2 = {
    name: 'Verte',
    components: {
      Picker: Picker,
      Slider: Slider
    },
    props: {
      picker: { type: String, default: 'wheel' },
      value: { type: String, default: '#000' },
      model: { type: String, default: 'rgb' },
      display: {
        type: String,
        default: 'vertical',
        validator: function (value) {
          var list = ['vertical', 'vertical-widget'];
          var isValid = list.indexOf(value) !== -1;
          if (!isValid && "development" !== 'production') {
            warn(("The \"display\" property can be only one of: " + (list.map(function (l) { return "'" + l + "' "; }).toString().trim()) + "."));
          }

          return isValid;
        }
      },
      enableAlpha: { type: Boolean, default: false },
      draggable: { type: Boolean, default: true }
    },
    data: function () { return ({
      isMenuActive: true,
      isLoading: true,
      rgb: toRgb('#000'),
      hex: toHex('#000'),
      hsl: toHsl('#000'),
      delta: { x: 0, y: 0 },
      recentColors: {
        max: 6,
        colors: getArray(6, getRandomColor)
      }
    }); },
    computed: {
      currentColor: {
        get: function get () {
          return this[this.model].toString();
        },
        set: function set (val) {
          this.selectColor(val);
        }
      },
      alpha: {
        get: function get () {
          if (isNaN(this[this.model].alpha)) {
            return 1;
          }
          return this[this.model].alpha;
        },
        set: function set (val) {
          this[this.model].alpha = val;
        }
      },
      menuOnly: function menuOnly () {
        return this.display === 'vertical-widget';
      }
    },
    watch: {
      value: function value (val, oldVal) {
        if (val === oldVal || val === this.currentColor) { return; }

        // value was updated externally.
        this.selectColor(val);
      },
      rgb: {
        handler: function handler (val) {
          this.$emit('input', this.currentColor);
        },
        deep: true
      }
    },
    methods: {
      selectColor: function selectColor (color, mute) {
        if ( mute === void 0 ) mute = false;

        if (!isValidColor(color)) { return; }

        this.rgb = toRgb(color);
        this.hex = toHex(color);
        this.hsl = toHsl(color);

        if (mute) { return; }
        this.$emit('input', this.currentColor);
      },
      dragMenu: function dragMenu (event) {
        var this$1 = this;

        if (event.target !== this.$refs.menu || event.button !== 0) { return; }
        var startPosition = {};
        var endPosition = {};
        var lastMove = Object.assign({}, this.delta);

        event.preventDefault();
        startPosition.x = event.clientX;
        startPosition.y = event.clientY;

        var mousemoveHandler = function (evnt) {
          window.requestAnimationFrame(function () {
            endPosition.x = evnt.clientX;
            endPosition.y = evnt.clientY;
            this$1.delta.x = lastMove.x + endPosition.x - startPosition.x;
            this$1.delta.y = lastMove.y + endPosition.y - startPosition.y;
          });
        };
        var mouseupHandler = function () {
          document.removeEventListener('mousemove', mousemoveHandler);
          document.removeEventListener('mouseup', mouseupHandler);
        };
        document.addEventListener('mousemove', mousemoveHandler);
        document.addEventListener('mouseup', mouseupHandler);
      },
      submit: function submit () {
        if (!this.menuOnly) {
          this.closeMenu();
        }
        this.selectColor(this.$refs.input.value);
        this.addRecentColor(this.currentColor);
      },
      addRecentColor: function addRecentColor (newColor) {
        var ref = this.recentColors;
        var colors = ref.colors;
        var max = ref.max;
        if (colors.includes(newColor)) {
          return;
        }
        if (colors.length >= max) {
          colors.shift();
        }
        colors.push(newColor);
      },
      toggleMenu: function toggleMenu () {
        if (this.isMenuActive) {
          this.closeMenu();
          return;
        }
        this.openMenu();
      },
      closeMenu: function closeMenu () {
        this.isMenuActive = false;
        document.removeEventListener('click', this.closeCallback);
      },
      openMenu: function openMenu () {
        var this$1 = this;

        this.isMenuActive = true;
        this.closeCallback = function (evnt) {
          if (
            !isElementClosest(evnt.target, this$1.$refs.menu) &&
            !isElementClosest(evnt.target, this$1.$refs.guide)
          ) {
            this$1.closeMenu();
          }
        };
        document.addEventListener('click', this.closeCallback);
      }
    },
    created: function created () {
      this.selectColor(this.value || '#000');
    },
    mounted: function mounted () {
      var this$1 = this;

      // give sliders time to
      // calculate its visible width
      this.$nextTick(function () {
        this$1.isLoading = false;
        if (this$1.menuOnly) { return; }
        this$1.isMenuActive = false;
      });
    }
  };

  var __vue_script__$2 = script$2;
  /* template */
  var __vue_render__$2 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "div",
      { staticClass: "verte", class: { "verte--loading": _vm.isLoading } },
      [
        !_vm.menuOnly
          ? _c(
              "button",
              {
                ref: "guide",
                staticClass: "verte__guide",
                style:
                  "color: " +
                  _vm.currentColor +
                  "; fill: " +
                  _vm.currentColor +
                  ";",
                on: { click: _vm.toggleMenu }
              },
              [
                _vm._t("default", [
                  _c(
                    "svg",
                    {
                      staticClass: "verte__icon",
                      attrs: { viewBox: "0 0 24 24" }
                    },
                    [_c("circle", { attrs: { cx: "12", cy: "12", r: "12" } })]
                  )
                ])
              ],
              2
            )
          : _vm._e(),
        _c(
          "div",
          _vm._g(
            {
              ref: "menu",
              staticClass: "verte__menu",
              class: {
                "verte__menu--active": _vm.isMenuActive,
                "verte__menu--static": !_vm.draggable || _vm.menuOnly
              },
              style:
                "transform: translate(" +
                _vm.delta.x +
                "px, " +
                _vm.delta.y +
                "px)",
              attrs: { tabindex: "-1" }
            },
            _vm.draggable ? { mousedown: _vm.dragMenu } : {}
          ),
          [
            _c("Picker", {
              attrs: { mode: _vm.picker },
              model: {
                value: _vm.currentColor,
                callback: function($$v) {
                  _vm.currentColor = $$v;
                },
                expression: "currentColor"
              }
            }),
            _c("Slider", {
              attrs: {
                gradient: [
                  "rgba(" +
                    _vm.rgb.red +
                    ", " +
                    _vm.rgb.green +
                    ", " +
                    _vm.rgb.blue +
                    ", 0)",
                  "rgba(" +
                    _vm.rgb.red +
                    ", " +
                    _vm.rgb.green +
                    ", " +
                    _vm.rgb.blue +
                    ", 1)"
                ],
                min: 0,
                max: 1,
                step: 0.01,
                editable: false
              },
              model: {
                value: _vm.alpha,
                callback: function($$v) {
                  _vm.alpha = $$v;
                },
                expression: "alpha"
              }
            }),
            _c("Slider", {
              attrs: {
                gradient: [
                  "rgb(0," + _vm.rgb.green + "," + _vm.rgb.blue + ")",
                  "rgb(255," + _vm.rgb.green + "," + _vm.rgb.blue + ")"
                ]
              },
              model: {
                value: _vm.rgb.red,
                callback: function($$v) {
                  _vm.$set(_vm.rgb, "red", $$v);
                },
                expression: "rgb.red"
              }
            }),
            _c("Slider", {
              attrs: {
                gradient: [
                  "rgb(" + _vm.rgb.red + ",0," + _vm.rgb.blue + ")",
                  "rgb(" + _vm.rgb.red + ",255," + _vm.rgb.blue + ")"
                ]
              },
              model: {
                value: _vm.rgb.green,
                callback: function($$v) {
                  _vm.$set(_vm.rgb, "green", $$v);
                },
                expression: "rgb.green"
              }
            }),
            _c("Slider", {
              attrs: {
                gradient: [
                  "rgb(" + _vm.rgb.red + "," + _vm.rgb.green + ",0)",
                  "rgb(" + _vm.rgb.red + "," + _vm.rgb.green + ",255)"
                ]
              },
              model: {
                value: _vm.rgb.blue,
                callback: function($$v) {
                  _vm.$set(_vm.rgb, "blue", $$v);
                },
                expression: "rgb.blue"
              }
            }),
            _c("div", { staticClass: "verte__input" }, [
              _c("input", {
                ref: "input",
                staticClass: "verte__value",
                domProps: { value: _vm.currentColor },
                on: {
                  keypress: function($event) {
                    if (
                      !("button" in $event) &&
                      _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")
                    ) {
                      return null
                    }
                    return _vm.submit($event)
                  }
                }
              }),
              _c(
                "button",
                {
                  staticClass: "verte__submit",
                  attrs: { type: "button" },
                  on: { click: _vm.submit }
                },
                [
                  _c(
                    "svg",
                    {
                      staticClass: "verte__icon",
                      attrs: { viewBox: "0 0 24 24" }
                    },
                    [
                      _c("path", {
                        attrs: {
                          d: "M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"
                        }
                      })
                    ]
                  )
                ]
              )
            ]),
            _c(
              "div",
              { ref: "recent", staticClass: "verte__recent" },
              _vm._l(_vm.recentColors.colors, function(clr) {
                return _c("a", {
                  staticClass: "verte__recent-color",
                  style: "background: " + clr,
                  attrs: { role: "button", href: "#" },
                  on: {
                    click: function($event) {
                      $event.preventDefault();
                      _vm.selectColor(clr);
                    }
                  }
                })
              })
            )
          ],
          1
        )
      ]
    )
  };
  var __vue_staticRenderFns__$2 = [];
  __vue_render__$2._withStripped = true;

  var __vue_template__$2 = typeof __vue_render__$2 !== 'undefined'
    ? { render: __vue_render__$2, staticRenderFns: __vue_staticRenderFns__$2 }
    : {};
  /* style */
  var __vue_inject_styles__$2 = undefined;
  /* scoped */
  var __vue_scope_id__$2 = undefined;
  /* module identifier */
  var __vue_module_identifier__$2 = undefined;
  /* functional template */
  var __vue_is_functional_template__$2 = false;
  /* component normalizer */
  function __vue_normalize__$2(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    var component = script || {};

    {
      component.__file = "/mnt/c/Users/logar/Code/verte/src/components/Verte.vue";
    }

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) { component.functional = true; }
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  function __vue_create_injector__$2() {
    var head = document.head || document.getElementsByTagName('head')[0];
    var styles = __vue_create_injector__$2.styles || (__vue_create_injector__$2.styles = {});
    var isOldIE =
      typeof navigator !== 'undefined' &&
      /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());

    return function addStyle(id, css) {
      if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]')) { return } // SSR styles are present.

      var group = isOldIE ? css.media || 'default' : id;
      var style = styles[group] || (styles[group] = { ids: [], parts: [], element: undefined });

      if (!style.ids.includes(id)) {
        var code = css.source;
        var index = style.ids.length;

        style.ids.push(id);

        if (isOldIE) {
          style.element = style.element || document.querySelector('style[data-group=' + group + ']');
        }

        if (!style.element) {
          var el = style.element = document.createElement('style');
          el.type = 'text/css';

          if (css.media) { el.setAttribute('media', css.media); }
          if (isOldIE) {
            el.setAttribute('data-group', group);
            el.setAttribute('data-next-index', '0');
          }

          head.appendChild(el);
        }

        if (isOldIE) {
          index = parseInt(style.element.getAttribute('data-next-index'));
          style.element.setAttribute('data-next-index', index + 1);
        }

        if (style.element.styleSheet) {
          style.parts.push(code);
          style.element.styleSheet.cssText = style.parts
            .filter(Boolean)
            .join('\n');
        } else {
          var textNode = document.createTextNode(code);
          var nodes = style.element.childNodes;
          if (nodes[index]) { style.element.removeChild(nodes[index]); }
          if (nodes.length) { style.element.insertBefore(textNode, nodes[index]); }
          else { style.element.appendChild(textNode); }
        }
      }
    }
  }
  /* style inject SSR */


  var Verte = __vue_normalize__$2(
    __vue_template__$2,
    __vue_inject_styles__$2,
    typeof __vue_script__$2 === 'undefined' ? {} : __vue_script__$2,
    __vue_scope_id__$2,
    __vue_is_functional_template__$2,
    __vue_module_identifier__$2,
    typeof __vue_create_injector__$2 !== 'undefined' ? __vue_create_injector__$2 : function () {},
    typeof __vue_create_injector_ssr__ !== 'undefined' ? __vue_create_injector_ssr__ : function () {}
  );

  return Verte;

})));
