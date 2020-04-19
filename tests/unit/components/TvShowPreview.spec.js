import { shallowMount } from '@vue/test-utils'
import TvShowPreview from '@/components/TvShowPreview'


describe('TvShowPreview.vue', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallowMount(
            TvShowPreview, {
                propsData: {
                    tvShow: {
                        imageurl: 'http://www.toto.com/titi.png',
                        detaillink: 'http://www.detail.link.com/test/42',
                        title: [
                            {value: 'Slider'}
                        ]
                    }
                },
                stubs: ['router-link']
            }
        )
    });

    test('is a Vue instance', () => {
        expect(wrapper.isVueInstance).toBeTruthy();
    });

    test('it should have an hyperlink to watch this show', () => {
        expect(wrapper.findAll('.d-block').at(0).attributes('to')).toBe('test/42');
    });

    test('it should display an image of the show', () => {
        expect(wrapper.findAll('img').at(0).attributes('src')).toBe('http://statics.ocs.frhttp://www.toto.com/titi.png');
    });

    test('it should display the title of the show', () => {
        expect(wrapper.findAll('.card-title').at(0).text()).toBe('Slider');
    });


});