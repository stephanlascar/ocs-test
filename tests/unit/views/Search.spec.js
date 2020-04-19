import {shallowMount, createLocalVue, RouterLinkStub} from '@vue/test-utils';
import Vuex from 'vuex';
import Search from '@/views/Search';
import TvShowPreview from "../../../src/components/TvShowPreview";

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Search.vue', () => {
    let wrapper;
    let actions;

    beforeEach(() => {
        let series = [
            {
                id: 1,
                title: [{value: 'Slider'}],
                seasons: [
                    {pitch: 'The best tv show', imageurl: '/toto/titi.png', number: 1, subtitle: 'subtitle 1'},
                    {pitch: 'The best tv show 2', imageurl: '/toto/titi_2.png', number: 2, subtitle: 'subtitle 2'},
                    {pitch: 'The best tv show 3', imageurl: '/toto/titi_3.png', number: 3, subtitle: 'subtitle 3'},
                ]
            }, {
                id: 2,
                title: [{value: 'Stargate'}],
                seasons: [
                    {pitch: 'The best tv show', imageurl: '/toto/stargate_1.png', number: 1, subtitle: 'subtitle 1'},
                    {pitch: 'The best tv show 2', imageurl: '/toto/stargate_2.png', number: 2, subtitle: 'subtitle 2'},
                    {pitch: 'The best tv show 3', imageurl: '/toto/stargate_3.png', number: 3, subtitle: 'subtitle 3'},
                ]
            }, {
                id: 3,
                title: [{value: 'Star Trek'}],
                seasons: [
                    {pitch: 'The best tv show', imageurl: '/toto/startrek_1.png', number: 1, subtitle: 'subtitle 1'},
                    {pitch: 'The best tv show 2', imageurl: '/toto/startrek_2.png', number: 2, subtitle: 'subtitle 2'},
                    {pitch: 'The best tv show 3', imageurl: '/toto/startrek_3.png', number: 3, subtitle: 'subtitle 3'},
                ]
            }
        ];
        actions = {
            searchTvShows: jest.fn()
        };
        let getters = {
            tvShows: () => series,
            isLoading: () => false,
            tvShowsCount: () => series.length
        };

        let store = new Vuex.Store({
            getters,
            actions
        });

        wrapper = shallowMount(Search, {
            store,
            localVue,
            mocks: {
                $route: {query: {q: 'search value'}}
            },
            stubs: {
                RouterLink: RouterLinkStub
            }
        });
    });

    test('is a Vue instance', () => {
        expect(wrapper.isVueInstance).toBeTruthy();
    });

    test('it should search all tv shows on load', () => {
        expect(actions.searchTvShows.mock.calls[0][1]).toStrictEqual({"term": "search value"});
    });

    test('it should search all tv shows when url params changed', () => {
        wrapper.vm.$options.watch['$route.query.q'].call(wrapper.vm, 'search value');
        expect(actions.searchTvShows.mock.calls[1][1]).toStrictEqual({"term": "search value"});
    });

    test('it should display each show', () => {
        expect(wrapper.findAll(TvShowPreview).length).toBe(3);
    });

});