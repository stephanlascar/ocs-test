import { shallowMount } from '@vue/test-utils'
import Header from '@/components/Header'

describe('Header.vue', () => {
    const debounce = jest.fn()
    const wrapper = shallowMount(Header, {
        directives: {
            debounce
        }
    })

    test('is a Vue instance', () => {
        expect(wrapper.isVueInstance).toBeTruthy();
    });

    test('has 3 main navigations items', () => {
        expect(wrapper.findAll('.nav-item').length).toBe(3);
    });

    //expect(toggle).toHaveBeenCalled()
})