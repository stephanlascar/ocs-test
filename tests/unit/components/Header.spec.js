import { shallowMount } from '@vue/test-utils'
import Header from '@/components/Header'
import Vue from 'vue'
import vueDebounce from "vue-debounce";

Vue.use(vueDebounce);
jest.useFakeTimers();

describe('Header.vue', () => {
    let wrapper;
    let $router;

    beforeEach(() => {
        $router = {
            push: jest.fn()
        }
        wrapper = shallowMount(
            Header,{mocks: { $router: $router }}
        )
    });

    test('is a Vue instance', () => {
        expect(wrapper.isVueInstance).toBeTruthy();
    });

    test('has 3 main navigations items', () => {
        expect(wrapper.findAll('.nav-item').length).toBe(3);
    });

    test('redirect to search page when user search something', () => {
        const searchInput = wrapper.find('.search-input');
        searchInput.setValue('search terms');
        searchInput.trigger('keyup');
        jest.advanceTimersByTime(300);

        expect($router.push).toHaveBeenCalledTimes(1);
        expect($router.push).toBeCalledWith({name: "search", query: {q: "search terms"}});
    });

    test('wait some ms before redirect to search page', () => {
        const searchInput = wrapper.find('.search-input');
        searchInput.setValue('the lord');
        searchInput.trigger('keyup');
        jest.advanceTimersByTime(100);

        expect($router.push).toHaveBeenCalledTimes(0);

        searchInput.setValue('the lord of the rings');
        searchInput.trigger('keyup');
        jest.advanceTimersByTime(300);

        expect($router.push).toHaveBeenCalledTimes(1);
        expect($router.push).toBeCalledWith({name: "search", query: {q: "the lord of the rings"}});
    });
});

