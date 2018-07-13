/**
 * Utilities
 */
export function makeArray (length, valueSource) {
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

export function getCartesianCoords (r, theta) {
  return {
    x: r * Math.cos(theta * Math.PI * 2),
    y: r * Math.sin(theta * Math.PI * 2)
  };
}

export function warn (message) {
  console.warn(`[Verte]: ${message}`);
}
