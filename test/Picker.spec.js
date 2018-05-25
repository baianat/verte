import { shallowMount } from '@vue/test-utils';
import Picker from '@/components/Picker';

describe('Picker', () => {
  test('is a Vue instance', () => {
    const wrapper = shallowMount(Picker);
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
});
