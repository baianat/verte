import { getRandomColor } from 'color-fns';
import { newArray } from './utils';

const MAX_COLOR_HISTROY = 6;
let Vue;
let store;

export function initStore (_Vue, { recentColors } = {}) {
  if (store) {
    return store;
  }

  Vue = _Vue;
  store = new Vue({
    data: () => ({
      recentColors: recentColors || newArray(6, getRandomColor)
    }),
    methods: {
      addRecentColor (newColor) {
        if (this.recentColors.includes(newColor)) {
          return;
        }

        if (this.recentColors.length >= MAX_COLOR_HISTROY) {
          this.recentColors.shift();
        }

        this.recentColors.push(newColor);
      }
    }
  });

  return store;
};
