/**
 * Utilities
 */
export function newArray (length, valueSource) {
  let array = [];
  for (let i = 0; i < length; i++) {
    const value = typeof valueSource === 'function' ? valueSource() : valueSource;
    array.push(value);
  }

  return array;
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

export function isElementClosest (element, wrapper) {
  while (element !== document && element !== null) {
    if (element === wrapper) return true;
    element = element.parentNode;
  }

  return false;
}

export function getClosestValue (array, value) {
  return array.reduce((prev, curr) => {
    return Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev;
  });
}

export function getPolarCoords (x, y) {
  return {
    r: Math.sqrt((x * x) + (y * y)),
    theta: Math.atan2(y, x) * 180 / Math.PI
  };
}

export function getCartesianCoords (r, theta) {
  return {
    x: r * Math.cos(theta * Math.PI * 2),
    y: r * Math.sin(theta * Math.PI * 2)
  };
}

export function warn (message) {
  console.warn(`[Verte]: ${message}`);
}

export function makeListValidator (propName, list) {
  return value => {
    const isValid = list.indexOf(value) !== -1;
    if (!isValid && process.env.NODE_ENV !== 'production') {
      warn(`The "${propName}" property can be only one of: ${list.map(l => "'" + l + "'").join(', ')}.`);
    }

    return isValid;
  };
};

export function getEventCords (event) {
  if (event.type.match(/^touch/i)) {
    const touch = event.touches[0];
    return { x: touch.clientX, y: touch.clientY };
  }
  if (event.type.match(/^mouse/i)) {
    return { x: event.clientX, y: event.clientY };
  }
  return { x: 0, y: 0 };
}
