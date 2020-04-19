import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";

const OCSApiService = {
    init() {
        Vue.use(VueAxios, axios);
        Vue.axios.defaults.baseURL = 'http://localhost:8080/apps/v2';
    },

    setHeader() {
        Vue.axios.defaults.headers.common["Content-Type"] = 'application/json';
    },

    search(term) {
        return Vue.axios.get(`contents?search=title=${term}`).catch(error => {
            throw new Error(`ApiService ${error}`);
        });
    },

    getProgramme(id) {
        return Vue.axios.get(`details/programme/${id}`).catch(error => {
            throw new Error(`ApiService ${error}`);
        });
    },

    getSerie(id) {
        return Vue.axios.get(`details/serie/${id}`).catch(error => {
            throw new Error(`ApiService ${error}`);
        });
    }
}

export default OCSApiService;