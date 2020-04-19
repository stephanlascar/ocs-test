import Vue from "vue";
import Vuex from "vuex";

import search from "./search.module";
import programme from "./programme.module";
import serie from "./serie.module";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        search,
        programme,
    }
});

