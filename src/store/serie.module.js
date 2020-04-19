import { GET_SERIE } from "./actions.type";
import { FETCH_START, SET_TITLE_RESULT } from "./mutations.type";
import ApiService from "../common/api.service";

const state = {
    isLoading: false,
    serie: null,
};

const getters = {
    isSerieLoading(state) {
        return state.isLoading;
    },
    serie(state) {
        return state.serie;
    }
};

const actions = {
    [GET_SERIE]({ commit }, params) {
        commit(FETCH_START);

        return ApiService.getSerie(params.id)
            .then(({ data }) => {
                commit(SET_TITLE_RESULT, data);
            })
            .catch(error => {
                throw new Error(error);
            });
    }
};

const mutations = {
    [FETCH_START](state) {
        state.isLoading = true;
    },

    [SET_TITLE_RESULT](state, data) {
        if (data.contents) {
            state.serie = data.contents;
        }
        state.isLoading = false;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};


