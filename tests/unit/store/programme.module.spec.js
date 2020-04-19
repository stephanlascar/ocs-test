import store from "@/store/programme.module";
import {GET_PROGRAMME} from "../../../src/store/actions.type";
import ApiService from "@/common/api.service";
import {FETCH_START, SET_TITLE_RESULT} from "../../../src/store/mutations.type";

jest.mock('@/common/api.service');


describe("Vuex Programme Module", () => {

    it('it should change state to loading before getting a program', async () => {
        const commitFunction = jest.fn();
        const context = {commit: commitFunction};
        const params = {id: 42};

        ApiService.getProgramme.mockImplementationOnce(() => Promise.resolve({data: {id: 42, contents: null}}));

        await store.actions[GET_PROGRAMME](context, params)
        expect(commitFunction.mock.calls[0][0]).toBe("setLoading");
    });

    it('it should dispatch a new state when a program is successfully loaded', async () => {
        const commitFunction = jest.fn();
        const context = {commit: commitFunction};
        const params = {id: 42};

        ApiService.getProgramme.mockImplementationOnce(() => Promise.resolve({data: {id: 42, contents: null}}));

        await store.actions[GET_PROGRAMME](context, params)
        expect(commitFunction.mock.calls[1][0]).toBe("setTitleResult");
        expect(commitFunction.mock.calls[1][1]).toStrictEqual({id: 42, contents: null});
    });

    it('it should throw error if something weird happen', async () => {
        const commitFunction = jest.fn();
        const context = {commit: commitFunction};
        const params = {id: 42};

        ApiService.getProgramme.mockRejectedValueOnce(new Error());

        await expect(store.actions[GET_PROGRAMME](context, params)).rejects.toMatchObject(Error(`Error`))
    });

    it('it should enable loading when fetching a new program', () => {
        let state = store.state;
        store.mutations[FETCH_START](state)

        expect(state.isLoading).toBe(true)
    });

    it('it should disable loading after loading a new program', () => {
        let state = store.state;
        state.isLoading = true;
        store.mutations[SET_TITLE_RESULT](state, {})

        expect(state.isLoading).toBe(false)
    });

    it('it should update state contents when a new program is fetched', () => {
        let state = store.state;
        store.mutations[SET_TITLE_RESULT](state, {contents: {title: 'Slider'}})

        expect(state.programme).toStrictEqual({title: 'Slider'})
    });

});