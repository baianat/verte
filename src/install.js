import Picker from './components/Picker.vue';

const install = {
  install (Vue, options) {
    Vue.component(Picker.name, Picker);
  }
};

export default install;
