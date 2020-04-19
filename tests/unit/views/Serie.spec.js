import {shallowMount, createLocalVue, RouterLinkStub} from '@vue/test-utils';
import Vuex from 'vuex';
import Serie from '@/views/Serie';

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Serie.vue', () => {
    let wrapper;
    let actions;

    beforeEach(() => {
        const serie = {
            title: [{value: 'Slider'}],
            seasons: [
                {pitch: 'The best tv show', imageurl: '/toto/titi.png', number: 1, subtitle: 'subtitle 1'},
                {pitch: 'The best tv show 2', imageurl: '/toto/titi_2.png', number: 2, subtitle: 'subtitle 2'},
                {pitch: 'The best tv show 3', imageurl: '/toto/titi_3.png', number: 3, subtitle: 'subtitle 3'},
            ]};
        actions = {
            getSerie: jest.fn()
        };
        let getters = {
            serie: () => serie,
            isSerieLoading: () => false
        };

        let store = new Vuex.Store({
            getters,
            actions
        });

        wrapper = shallowMount(Serie, {
            store,
            localVue,
            mocks: {
                $route: {params: {id: 42}}
            },
            stubs: {
                RouterLink: RouterLinkStub
            }
        });

        wrapper.vm.$options.watch.serie.call(wrapper.vm, serie);
    });

    test('is a Vue instance', () => {
        expect(wrapper.isVueInstance).toBeTruthy();
    });

    test('it should get all programme information on mount', () => {
        expect(actions.getSerie.mock.calls[0][1]).toStrictEqual({id: 42});
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

    test('it should show an image of the show', () => {
        expect(wrapper.findAll('img').at(0).attributes('src')).toBe('http://statics.ocs.fr/toto/titi.png');
    });

    test('it should show an image for each seasons', () => {
        expect(wrapper.findAll('img').at(0).attributes('src')).toBe('http://statics.ocs.fr/toto/titi.png');
    });

    test('it should show an image of the show', () => {
        expect(wrapper.findAll('.card-img').length).toBe(3);

        expect(wrapper.findAll('.card-img').at(0).attributes('src')).toBe('http://statics.ocs.fr/toto/titi.png');
        expect(wrapper.findAll('.card-img').at(1).attributes('src')).toBe('http://statics.ocs.fr/toto/titi_2.png');
        expect(wrapper.findAll('.card-img').at(2).attributes('src')).toBe('http://statics.ocs.fr/toto/titi_3.png');
    });

    test('it should show the season number on each season photo', () => {
        expect(wrapper.findAll('.card-img-overlay .card-title').length).toBe(3);

        expect(wrapper.findAll('.card-img-overlay .card-title').at(0).text()).toBe('Saison 1');
        expect(wrapper.findAll('.card-img-overlay .card-title').at(1).text()).toBe('Saison 2');
        expect(wrapper.findAll('.card-img-overlay .card-title').at(2).text()).toBe('Saison 3');
    });

    test('it should show a subtitle on each season photo', () => {
        expect(wrapper.findAll('.card-img-overlay .card-subtitle').length).toBe(3);

        expect(wrapper.findAll('.card-img-overlay .card-subtitle').at(0).text()).toBe('subtitle 1');
        expect(wrapper.findAll('.card-img-overlay .card-subtitle').at(1).text()).toBe('subtitle 2');
        expect(wrapper.findAll('.card-img-overlay .card-subtitle').at(2).text()).toBe('subtitle 3');
    });

});