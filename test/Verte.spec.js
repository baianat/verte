import { shallowMount } from '@vue/test-utils';
import Verte from '@/components/Verte';

describe('Verte', () => {
  test('is a Vue instance', () => {
    const wrapper = shallowMount(Verte);
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
});
