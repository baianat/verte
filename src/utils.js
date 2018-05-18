/**
 * Utilities
 */
export function select (element) {
  if (typeof element === 'string') {
    return document.querySelector(element);
  }
  return element;
}

export function css (element, styles) {
  Object.keys(styles).forEach((key) => {
    element.style[key] = styles[key];
  });
}

export function sync (callback) {
  setTimeout(() => callback(), 1000 / 60);
}

export function call (func, args = null) {
  if (typeof func === 'function') {
    func(args);
  }
}

export function toggleVisibility (el) {
  if (el.classList.contains('is-hidden')) {
    show(el);
    return;
  }
  hide(el);
}

export function show (el) {
  el.classList.add('is-visible');
  el.classList.remove('is-hidden');
  el.setAttribute('aria-hidden', 'false');
}

export function hide (el) {
  el.classList.remove('is-visible');
  el.classList.add('is-hidden');
  el.setAttribute('aria-hidden', 'true');
}

export function getAverage (array, length) {
  let sum = 0;
  const elements = array.slice(Math.max(array.length - length, 1));
  elements.forEach((value) => sum + value);
  return Math.ceil(sum / length);
}

export function getArray (length, value) {
  let array = []
  for (let i = 0; i < length; i++) {
    let temp = typeof value === 'function' ? value() : value;
    array.push(temp);
  }
  return array;
}

export function getNumber (number1, number2) {
  return number1 ? parseInt(number1, 10) : parseInt(number2, 10);
}

export function debounce (func, immediate = false) {
  let timeout;
  return function () {
    let later = () => {
      timeout = null;
      if (!immediate) func(...arguments);
    };
    let callNow = immediate && !timeout;
    window.cancelAnimationFrame(timeout);
    timeout = window.requestAnimationFrame(later);
    if (callNow) func(...arguments);
  };
}

export function throttle (callback, limit) {
  let wait = false;
  return () => {
    if (!wait) {
      callback.apply(this, arguments);
      wait = true;
      setTimeout(() => {
        wait = false;
      }, limit);
    }
  };
}

export function wrap (el, wrapper) {
  // insert wrapper before el in the DOM tree
  el.parentNode.insertBefore(wrapper, el);

  // move el into wrapper
  wrapper.appendChild(el);
}

/**
 * Converts an array-like object to an array.
 */
export function toArray (arrayLike, mappingFn) {
  if (Array.from) {
    return Array.from(arrayLike, mappingFn);
  }

  const array = [];
  const shouldMap = typeof mappingFn === 'function';
  const length = arrayLike.length;
  for (let i = 0; i < length; i++) {
    array.push(shouldMap ? mappingFn(arrayLike[i]) : arrayLike[i]);
  }

  return array;
}

export function getRandomInt (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function isElementClosest (element, wrapper) {
  while (element !== document && element !== null) {
    if (element === wrapper) return true;
    element = element.parentNode;
  }
  return false;
}

export function stringToDOM (string) {
  return document.createRange().createContextualFragment(string).firstElementChild;
}

export function getClosestValue (array, value) {
  return array.reduce((prev, curr) => {
    return Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev
  });
}

export function mouseDownHandler (event) {
  event.preventDefault();
  return function (func) {
    func(event);
    let tempFunc = (event) => {
      window.requestAnimationFrame(() => func(event));
    }
    const mouseupHandler = () => {
      document.removeEventListener('mousemove', tempFunc);
      document.removeEventListener('mouseup', mouseupHandler);
    }
    document.addEventListener('mousemove', tempFunc);
    document.addEventListener('mouseup', mouseupHandler);
  }
}
