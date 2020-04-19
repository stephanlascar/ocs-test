import store from "@/store/search.module";
import {SEARCH_TV_SHOWS} from "../../../src/store/actions.type";
import ApiService from "@/common/api.service";
import {FETCH_START, SET_SEARCH_RESULTS} from "../../../src/store/mutations.type";

jest.mock('@/common/api.service');


describe("Vuex Search Module", () => {

    it('it should change state to loading before searching a tv show', async () => {
        const commitFunction = jest.fn();
        const context = {commit: commitFunction};
        const params = {id: 42};

        ApiService.search.mockImplementationOnce(() => Promise.resolve({data: {id: 42, contents: null}}));

        await store.actions[SEARCH_TV_SHOWS](context, params)
        expect(commitFunction.mock.calls[0][0]).toBe("setLoading");
    });

    it('it should dispatch a new state when there is a search result', async () => {
        const commitFunction = jest.fn();
        const context = {commit: commitFunction};
        const params = {id: 42};

        ApiService.search.mockImplementationOnce(() => Promise.resolve({data: {id: 42, contents: null}}));

        await store.actions[SEARCH_TV_SHOWS](context, params)
        expect(commitFunction.mock.calls[1][0]).toBe("setSearchResults");
        expect(commitFunction.mock.calls[1][1]).toStrictEqual({id: 42, contents: null});
    });

    it('it should throw error if something weird happen', async () => {
        const commitFunction = jest.fn();
        const context = {commit: commitFunction};
        const params = {id: 42};

        ApiService.search.mockRejectedValueOnce(new Error());

        await expect(store.actions[SEARCH_TV_SHOWS](context, params)).rejects.toMatchObject(Error(`Error`))
    });

    it('it should enable loading when search request is not done', () => {
        let state = store.state;
        store.mutations[FETCH_START](state)

        expect(state.isLoading).toBe(true)
    });

    it('it should disable loading after search request', () => {
        let state = store.state;
        state.isLoading = true;
        store.mutations[SET_SEARCH_RESULTS](state, {})

        expect(state.isLoading).toBe(false)
    });

    it('it should update state contents when search request is done', () => {
        let state = store.state;
        store.mutations[SET_SEARCH_RESULTS](state, {contents: {title: 'Slider'}})

        expect(state.contents).toStrictEqual({title: 'Slider'})
    });

});