import Verte from './Verte.vue';
import Slider from './Slider.vue';

const install = {
  install (Vue, options) {
    Vue.component(Verte.name, Verte);
    Vue.component(Slider.name, Slider);
  }
};

export default install;
