import { shallowMount } from '@vue/test-utils';
import Slider from '@/components/Slider';

describe('Slider', () => {
  test('is a Vue instance', () => {
    const wrapper = shallowMount(Slider);
    expect(wrapper.isVueInstance()).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });
});
