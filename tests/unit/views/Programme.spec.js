import {shallowMount, createLocalVue, RouterLinkStub} from '@vue/test-utils';
import Vuex from 'vuex';
import Programme from '@/views/Programme';

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Programme.vue', () => {
    let wrapper;
    let actions;

    beforeEach(() => {
        const programme = {title: [{value: 'Slider'}], pitch: 'The best tv show', imageurl: '/toto/titi.png', fullscreenimageurl: '/toto/big.png'};
        actions = {
            getProgramme: jest.fn()
        };
        let getters = {
            programme: () => programme,
            isProgrammeLoading: () => false
        };

        let store = new Vuex.Store({
            getters,
            actions
        });

        wrapper = shallowMount(Programme, {
            store,
            localVue,
            mocks: {
                $route: {params: {id: 42}}
            },
            stubs: {
                RouterLink: RouterLinkStub
            }
        });

        wrapper.vm.$options.watch.programme.call(wrapper.vm, programme);
    });

    test('is a Vue instance', () => {
        expect(wrapper.isVueInstance).toBeTruthy();
    });

    test('it should get all programme information on mount', () => {
        expect(actions.getProgramme.mock.calls[0][1]).toStrictEqual({id: 42});
    });

    test('it should show the program title', () => {
        expect(wrapper.findAll('h1').at(0).text()).toBe('Slider');
    });

    test('it should show the program pitch', () => {
        expect(wrapper.findAll('p').at(0).text()).toBe('The best tv show');
    });

    test('it should have an hyperlink to watch this show', () => {
        expect(wrapper.find(RouterLinkStub).props().to).toStrictEqual({"name": "watch", "params": {"id": 42}});
    });

});