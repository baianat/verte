/**
    * v0.0.0
    * (c) 2018 Baianat
    * @license MIT
    */
/**
  * color-fns v0.0.3
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
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
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
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
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
      if (test < 0) test += 1;
      if (test > 1) test -= 1;
      if (test < 1 / 6) return temp2 + (temp1 - temp2) * 6 * test;
      if (test < 1 / 2) return temp1;
      if (test < 2 / 3) return temp2 + (temp1 - temp2) * (2 / 3 - test) * 6;
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

function call (func, args = null) {
  if (typeof func === 'function') {
    func(args);
  }
}

function getClosestValue (array, value) {
  return array.reduce((prev, curr) => {
    return Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev
  });
}

function getCartesianCoords (r, theta) {
  return {
    x: r * Math.cos(theta * Math.PI * 2),
    y: r * Math.sin(theta * Math.PI * 2)
  };
}

//

var script = {
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
      },
      multiple: false,
      handles: [],
      values: []
    }
  },
  watch: {
    gradient: function (val) {
      this.initGradient(val);
      this.reloadHandlesColor();
    },
    values: function () {
      this.multiple = this.values.length > 1;
      this.fill = this.multiple ? false : this.fill || {};
    }
  },
  mounted() {
    this.el = this.$refs.el;
    this.init();
  },
  methods: {
    init () {
      this.multiple = this.values.length > 1;
      this.values = this.handlesValue;
      this.handles = this.handlesValue.map((value, index) => {
        return { value, position: 0, color: '#fff' };
      });
      if (this.values.length === 1) {
        this.values[0] = Number(this.el.value) || Number(this.value);
      }
      this.values.sort();
      if (this.colorCode) {
        this.el.type = 'text';
      }

      this.initElements();
      if (this.gradient) {
        this.initGradient(this.gradient);
      }
      this.initEvents();
      this.values.forEach((handle, index) => {
        this.activeHandle = index;
        this.update(handle);
      });
      this.update();
    },

    initElements () {
      this.wrapper = this.$refs.wrapper;
      this.track = this.$refs.track;

      this.wrapper.classList.toggle('is-editable', this.editable);
      this.wrapper.classList.toggle('is-reverse', this.reverse);
      if (this.classes) {
        this.wrapper.classList.add(...this.classes);
      }
      call(this.created, this);
    },

    initGradient (gradient) {
      if (gradient.length > 1) {
        this.track.style.backgroundImage = `linear-gradient(90deg, ${gradient})`;
        return;
      }
      this.track.style.backgroundImage = '';
      this.track.style.backgroundColor = gradient[0];
      this.handles.forEach(handle => {
        handle.style.color = gradient[0];
      });
    },

    initEvents () {
      window.addEventListener('resize', () => {
        this.updateWidth();
        this.update(this.currentValue, true);
      });
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

    addHandle (value) {
      const closest = getClosestValue(this.values, value);
      const closestIndex = this.values.indexOf(closest);
      const closestValue = this.values[closestIndex];
      const newIndex = closestValue <= value ? closestIndex + 1 : closestIndex;
      this.handles.splice(newIndex, 0, {
        value,
        position: 0,
        color: '#fff'
      });
      this.values.splice(newIndex, 0, value);

      this.activeHandle = newIndex;
      this.currentValue = null;
      this.update(value);
    },

    removeHandle (index) {
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

    reloadHandlesColor () {
      this.handles.forEach((handle, index) => {
        const positionPercentage = this.getPositionPercentage(handle.value);
        const color = this.getHandleColor(positionPercentage);
        this.handles[index].color = color.toString();
      });
    },

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
        if (this.colorCode) {
          this.el.value = color;
        }
      }

      // todo: create reactivity and stop force update
      
      if (mute) return;
      this.$emit('change', this.currentValue);
      this.$emit('input', this.currentValue);
      call(this.updated);
    },
  }
}

const __vue_script__ = script;
            
/* template */
var __vue_render__ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { ref: "wrapper", staticClass: "slider" }, [
    _c(
      "input",
      _vm._g(
        { ref: "el", staticClass: "slider-input" },
        _vm.editable && !_vm.colorCode
          ? {
              change: function(ev) {
                return _vm.update(ev.target.value, true)
              }
            }
          : {}
      )
    ),
    _c(
      "div",
      _vm._g(
        { ref: "track", staticClass: "slider-track" },
        _vm.trackSlide ? { mousedown: _vm.select, touchstrat: _vm.select } : {}
      ),
      [
        _vm.fill
          ? _c("div", {
              staticClass: "slider-fill",
              style:
                "transform: translate(" +
                _vm.fill.translate +
                "px, 0) scale(" +
                _vm.fill.scale +
                ", 1)"
            })
          : _vm._e(),
        _vm._l(_vm.handles, function(handle) {
          return _c(
            "div",
            {
              staticClass: "slider-handle",
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
                ? _c("div", { staticClass: "slider-label" }, [
                    _vm._v(_vm._s(handle.value))
                  ])
                : _vm._e()
            ]
          )
        })
      ],
      2
    )
  ])
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

const __vue_template__ = typeof __vue_render__ !== 'undefined'
  ? { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ }
  : {};
/* style */
const __vue_inject_styles__ = function (inject) {
  if (!inject) return
  inject("data-v-7227e2b8_0", { source: "\n.slider {\n  position: relative;\n  display: flex;\n  align-items: center;\n  box-sizing: border-box;\n  margin-bottom: 10px;\n}\n.slider-input {\n    display: none;\n    margin-bottom: 0;\n    padding: 0.6em;\n    max-width: 70px;\n    width: 20%;\n    border: 1px solid #000;\n    border-radius: 0;\n    text-align: center;\n    font-size: 12px;\n    -webkit-appearance: none;\n    -moz-appearance: text;\n}\n.slider-input:focus {\n      outline: none;\n      border-color: #1a3aff;\n}\n.slider-track {\n    position: relative;\n    flex: 1;\n    margin: 0.2em;\n    width: auto;\n    height: 0.2em;\n    background: #cccccc;\n    will-change: transfom;\n}\n.slider-handle {\n    position: relative;\n    position: absolute;\n    top: 0;\n    left: 0;\n    will-change: transform;\n    color: #000;\n    margin: -0.1em 0 0 -0.2em;\n    width: 0.4em;\n    height: 0.4em;\n    background-color: currentColor;\n}\n.slider-label {\n    position: absolute;\n    top: -3em;\n    left: 0.4em;\n    z-index: 999;\n    visibility: hidden;\n    padding: 6px;\n    min-width: 3em;\n    border-radius: 0;\n    background-color: #000;\n    color: #fff;\n    text-align: center;\n    font-size: 12px;\n    line-height: 1em;\n    opacity: 0;\n    transform: translate(-50%, 0);\n    white-space: nowrap;\n}\n.slider-label:before {\n      position: absolute;\n      bottom: -0.6em;\n      left: 50%;\n      display: block;\n      width: 0;\n      height: 0;\n      border-width: 0.6em 0.6em 0 0.6em;\n      border-style: solid;\n      border-color: #000 transparent transparent transparent;\n      content: '';\n      transform: translate3d(-50%, 0, 0);\n}\n.slider-fill {\n    width: 100%;\n    height: 100%;\n    background-color: #cccccc;\n    transform-origin: left top;\n}\n.slider:hover .slider-label, .slider.is-dragging .slider-label {\n    visibility: visible;\n    opacity: 1;\n}\n.slider.is-editable .slider-input {\n    display: block;\n}\n.slider.is-reverse {\n    flex-direction: row-reverse;\n}\n\n/*# sourceMappingURL=Slider.vue.map */", map: undefined, media: undefined });

};
/* scoped */
const __vue_scope_id__ = undefined;
/* module identifier */
const __vue_module_identifier__ = undefined;
/* functional template */
const __vue_is_functional_template__ = false;
/* component normalizer */
function __vue_normalize__(
  template, style, script$$1,
  scope, functional, moduleIdentifier,
  createInjector, createInjectorSSR
) {
  const component = script$$1 || {};

  {
    component.__file = "/mnt/c/Users/Abdelrahman/Projects/verte/src/components/Slider.vue";
  }

  if (!component.render) {
    component.render = template.render;
    component.staticRenderFns = template.staticRenderFns;
    component._compiled = true;

    if (functional) component.functional = true;
  }

  component._scopeId = scope;

  {
    let hook;
    if (style) {
      hook = function(context) {
        style.call(this, createInjector(context));
      };
    }

    if (hook !== undefined) {
      if (component.functional) {
        // register for functional component in vue file
        const originalRender = component.render;
        component.render = function renderWithStyleInjection(h, context) {
          hook.call(context);
          return originalRender(h, context)
        };
      } else {
        // inject component registration as beforeCreate hook
        const existing = component.beforeCreate;
        component.beforeCreate = existing ? [].concat(existing, hook) : [hook];
      }
    }
  }

  return component
}
/* style inject */
function __vue_create_injector__() {
  const head = document.head || document.getElementsByTagName('head')[0];
  const styles = __vue_create_injector__.styles || (__vue_create_injector__.styles = {});
  const isOldIE =
    typeof navigator !== 'undefined' &&
    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());

  return function addStyle(id, css) {
    if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]')) return // SSR styles are present.

    const group = isOldIE ? css.media || 'default' : id;
    const style = styles[group] || (styles[group] = { ids: [], parts: [], element: undefined });

    if (!style.ids.includes(id)) {
      let code = css.source;
      let index = style.ids.length;

      style.ids.push(id);

      if (isOldIE) {
        style.element = style.element || document.querySelector('style[data-group=' + group + ']');
      }

      if (!style.element) {
        const el = style.element = document.createElement('style');
        el.type = 'text/css';

        if (css.media) el.setAttribute('media', css.media);
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
        const textNode = document.createTextNode(code);
        const nodes = style.element.childNodes;
        if (nodes[index]) style.element.removeChild(nodes[index]);
        if (nodes.length) style.element.insertBefore(textNode, nodes[index]);
        else style.element.appendChild(textNode);
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
)

//

var script$1 = {
  name: 'Picker',
  props: {
    mode: { type: String, default: 'wheel' },
    edge: { type: Number, default: 190 },
    radius: { type: Number, default: 200 },
    satSlider: { type: Boolean, default: true },
  },
  data() {
    return {
      currentColor: '#000'
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
      this.cursor = this.$refs.cursor;

      this.currentHue = 'hsl(0, 100%, 50%)';

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

    updateHue(event) {
      if (event.target !== this.strip) {
        return;
      }
      this.currentHue = this.getColorCanvas(this.getMouseCords(event), this.stripCtx);
      this.updateSquareColors();
      const color = this.getColorCanvas(this.mouse, this.ctx);
      this.$emit('updateColor', color);
    },

    updateColor(event) {
      if (event.target !== this.canvas) {
        return;
      }
      const { x, y } = this.getMouseCords(event);
      if (this.mode === 'square') {
        const squareThreshold = this.edge - 1;
        this.mouse = { x: Math.min(x, squareThreshold), y: Math.min(y, squareThreshold) };
      }

      if (this.mode === 'wheel' && this.ctx.isPointInPath(this.circle.path, x, y)) {
        this.mouse = { x, y };
      }

      this.currentColor = this.getColorCanvas(this.mouse, this.ctx);
      this.$emit('update', this.currentColor );
      this.updateCursor(this.mouse);
    },

    _initWheel () {
      this.picker = this.$refs.picker;
      this.saturation = this.$refs.saturation;
      this.canvas = this.$refs.canvas;
      this.cursor = this.$refs.cursor;

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
      this.updateCursor();
    },

    updateWheelColors () {
      if (!this.circle) return;
      const x = this.circle.xCords;
      const y = this.circle.yCords;
      const radius = this.circle.radius;
      const saturation = this.satSlider ? this.saturation.currentValue : 100;
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

    updateSquareColors () {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      this.ctx.fillStyle = this.currentHue;
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
      if (mouse) {
        this.cursor.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0)`;
        return;
      }

      const hslColor = toHsl(this.currentColor, true);
      if (this.mode === 'wheel') {
        const r = (100 - hslColor[3]) * (this.radius / 200);
        const ratio = this.radius / 2;
        this.mouse = getCartesianCoords(r, hslColor[1] / 360);
        this.cursor.style.transform = `translate3d(${this.mouse.x + ratio}px, ${this.mouse.y + ratio}px, 0)`;
      }
      if (this.mode === 'square') {
        const x = (hslColor[2] / 100) * (this.edge);
        const y = ((100 - hslColor[3]) / 100) * (this.edge);
        this.mouse = { x: x, y: y };
        this.cursor.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }
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
  }
}

const __vue_script__$1 = script$1;
            
/* template */
var __vue_render__$1 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    {
      ref: "picker",
      staticClass: "verte-picker",
      class: "verte-picker--" + _vm.mode
    },
    [
      _c("canvas", {
        ref: "canvas",
        staticClass: "verte-picker__canvas",
        on: {
          mousedown: function($event) {
            _vm.mouseDownHandler($event, _vm.updateColor);
          }
        }
      }),
      _vm.mode === "square"
        ? _c("canvas", {
            ref: "strip",
            staticClass: "verte-picker__strip",
            on: {
              mousedown: function($event) {
                _vm.mouseDownHandler($event, _vm.updateHue);
              }
            }
          })
        : _vm._e(),
      _c("div", { ref: "cursor", staticClass: "verte-picker__cursor" }),
      _vm.mode === "wheel"
        ? _c("Slider", {
            ref: "saturation",
            staticClass: "verte-picker__saturation",
            attrs: {
              gradient: ["#FFFFFF", "#000000"],
              label: false,
              min: 0,
              max: 100,
              value: 100
            },
            on: { change: _vm.updateWheelColors }
          })
        : _vm._e()
    ],
    1
  )
};
var __vue_staticRenderFns__$1 = [];
__vue_render__$1._withStripped = true;

const __vue_template__$1 = typeof __vue_render__$1 !== 'undefined'
  ? { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 }
  : {};
/* style */
const __vue_inject_styles__$1 = function (inject) {
  if (!inject) return
  inject("data-v-246679a0_0", { source: "\n.verte-picker {\n  position: relative;\n  margin: 10px auto 20px;\n  user-select: none;\n}\n.verte-picker__strip {\n    margin: 0 5px;\n}\n.verte-picker__cursor {\n    position: absolute;\n    top: 0;\n    left: 0;\n    margin: -6px;\n    width: 10px;\n    height: 10px;\n    border: 2px solid #fff;\n    border-radius: 50%;\n    will-change: transform;\n    pointer-events: none;\n    background-color: transparent;\n}\n.verte-picker__input {\n    display: flex;\n    margin-bottom: 10px;\n}\n\n/*# sourceMappingURL=Picker.vue.map */", map: undefined, media: undefined });

};
/* scoped */
const __vue_scope_id__$1 = undefined;
/* module identifier */
const __vue_module_identifier__$1 = undefined;
/* functional template */
const __vue_is_functional_template__$1 = false;
/* component normalizer */
function __vue_normalize__$1(
  template, style, script,
  scope, functional, moduleIdentifier,
  createInjector, createInjectorSSR
) {
  const component = script || {};

  {
    component.__file = "/mnt/c/Users/Abdelrahman/Projects/verte/src/components/Picker.vue";
  }

  if (!component.render) {
    component.render = template.render;
    component.staticRenderFns = template.staticRenderFns;
    component._compiled = true;

    if (functional) component.functional = true;
  }

  component._scopeId = scope;

  {
    let hook;
    if (style) {
      hook = function(context) {
        style.call(this, createInjector(context));
      };
    }

    if (hook !== undefined) {
      if (component.functional) {
        // register for functional component in vue file
        const originalRender = component.render;
        component.render = function renderWithStyleInjection(h, context) {
          hook.call(context);
          return originalRender(h, context)
        };
      } else {
        // inject component registration as beforeCreate hook
        const existing = component.beforeCreate;
        component.beforeCreate = existing ? [].concat(existing, hook) : [hook];
      }
    }
  }

  return component
}
/* style inject */
function __vue_create_injector__$1() {
  const head = document.head || document.getElementsByTagName('head')[0];
  const styles = __vue_create_injector__$1.styles || (__vue_create_injector__$1.styles = {});
  const isOldIE =
    typeof navigator !== 'undefined' &&
    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());

  return function addStyle(id, css) {
    if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]')) return // SSR styles are present.

    const group = isOldIE ? css.media || 'default' : id;
    const style = styles[group] || (styles[group] = { ids: [], parts: [], element: undefined });

    if (!style.ids.includes(id)) {
      let code = css.source;
      let index = style.ids.length;

      style.ids.push(id);

      if (isOldIE) {
        style.element = style.element || document.querySelector('style[data-group=' + group + ']');
      }

      if (!style.element) {
        const el = style.element = document.createElement('style');
        el.type = 'text/css';

        if (css.media) el.setAttribute('media', css.media);
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
        const textNode = document.createTextNode(code);
        const nodes = style.element.childNodes;
        if (nodes[index]) style.element.removeChild(nodes[index]);
        if (nodes.length) style.element.insertBefore(textNode, nodes[index]);
        else style.element.appendChild(textNode);
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
)

const install = {
  install (Vue, options) {
    Vue.component(Picker.name, Picker);
  }
};

export default install;
