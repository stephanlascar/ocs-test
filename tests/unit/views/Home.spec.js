import { shallowMount } from '@vue/test-utils'
import Home from '@/views/Home'


describe('Home.vue', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallowMount(Home)
    });

    test('is a Vue instance', () => {
        expect(wrapper.isVueInstance).toBeTruthy();
    });

    test('is a basic view', () => {
        expect(wrapper.html()).toBe('<div>home</div>')
    });

});