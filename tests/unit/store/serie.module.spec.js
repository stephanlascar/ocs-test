import store from "@/store/serie.module";
import {GET_SERIE} from "../../../src/store/actions.type";
import ApiService from "@/common/api.service";
import {FETCH_START, SET_TITLE_RESULT} from "../../../src/store/mutations.type";

jest.mock('@/common/api.service');


describe("Vuex Article Module", () => {

    it('it should change state to loading before getting a tv show', async () => {
        const commitFunction = jest.fn();
        const context = {commit: commitFunction};
        const params = {id: 42};

        ApiService.getSerie.mockImplementationOnce(() => Promise.resolve({data: {id: 42, contents: null}}));

        await store.actions[GET_SERIE](context, params)
        expect(commitFunction.mock.calls[0][0]).toBe("setLoading");
    });

    it('it should dispatch a new state when a tv show is successfully loaded', async () => {
        const commitFunction = jest.fn();
        const context = {commit: commitFunction};
        const params = {id: 42};

        ApiService.getSerie.mockImplementationOnce(() => Promise.resolve({data: {id: 42, contents: null}}));

        await store.actions[GET_SERIE](context, params)
        expect(commitFunction.mock.calls[1][0]).toBe("setTitleResult");
        expect(commitFunction.mock.calls[1][1]).toStrictEqual({id: 42, contents: null});
    });

    it('it should throw error if something weird happen', async () => {
        const commitFunction = jest.fn();
        const context = {commit: commitFunction};
        const params = {id: 42};

        ApiService.getSerie.mockRejectedValueOnce(new Error());

        await expect(store.actions[GET_SERIE](context, params)).rejects.toMatchObject(Error(`Error`))
    });

    it('it should enable loading when fetching a new tv show', () => {
        let state = store.state;
        store.mutations[FETCH_START](state)

        expect(state.isLoading).toBe(true)
    });

    it('it should disable loading after loading a new tv show', () => {
        let state = store.state;
        state.isLoading = true;
        store.mutations[SET_TITLE_RESULT](state, {})

        expect(state.isLoading).toBe(false)
    });

    it('it should update state contents when a new tv show is fetched', () => {
        let state = store.state;
        store.mutations[SET_TITLE_RESULT](state, {contents: {title: 'Slider'}})

        expect(state.serie).toStrictEqual({title: 'Slider'})
    });

});