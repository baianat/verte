import { getRandomColor } from 'color-fns';
import { newArray } from './utils';

export const MAX_COLOR_HISTROY = 6;
let Vue;
let store;

export function initStore (_Vue, opts) {
  if (store) {
    return store;
  }

  opts = opts || {};
  const { recentColors, onRecentColorsChange } = opts;

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
          this.recentColors.pop();
        }

        this.recentColors.unshift(newColor);
        if (onRecentColorsChange) {
          onRecentColorsChange(this.recentColors);
        }
      }
    }
  });

  return store;
};
