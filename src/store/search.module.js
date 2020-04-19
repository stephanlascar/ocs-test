import { SEARCH_TV_SHOWS } from "./actions.type";
import { FETCH_START, SET_SEARCH_RESULTS } from "./mutations.type";
import OCSApiService from "../common/api.service";

const state = {
    contents: [],
    total: 0,
    isLoading: false
};

const getters = {
    tvShowsCount(state) {
        return state.total;
    },
    tvShows(state) {
        return state.contents;
    },
    isLoading(state) {
        return state.isLoading;
    }
};

const actions = {
    [SEARCH_TV_SHOWS]({ commit }, params) {
        commit(FETCH_START);
        return OCSApiService.search(params.term)
            .then(({ data }) => {
                commit(SET_SEARCH_RESULTS, data);
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

    [SET_SEARCH_RESULTS](state, data) {
        state.total = data.total;
        state.contents = data.contents;
        state.isLoading = false;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};


