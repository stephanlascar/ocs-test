import { shallowMount } from '@vue/test-utils'
import Header from '@/components/Header'

describe('Header.vue', () => {
    const wrapper = shallowMount(Header, {})

    test('is a Vue instance', () => {
        expect(wrapper.isVueInstance).toBeTruthy();
    });

    test('has 3 main navigations items', () => {
        expect(wrapper.findAll('.nav-item').length).toBe(3);
    });
})