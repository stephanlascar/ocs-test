import { GET_PROGRAMME } from "./actions.type";
import { FETCH_START, SET_TITLE_RESULT } from "./mutations.type";
import OCSApiService from "../common/api.service";

const state = {
    isLoading: false,
    programme: null,
};

const getters = {
    isProgrammeLoading(state) {
        return state.isLoading;
    },
    programme(state) {
        return state.programme;
    }
};

const actions = {
    [GET_PROGRAMME]({ commit }, params) {
        commit(FETCH_START);
        return OCSApiService.getProgramme(params.id)
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
            state.programme = data.contents;
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


