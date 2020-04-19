<template>
    <div class="row text-center text-lg-left">
        <template v-if="!isLoading">
            <TvShowPreview
                v-for="(tvShow) in tvShows"
                :tvShow="tvShow"
                :key="tvShow.id"
            />
        </template>
        <template v-else>
            <loader></loader>
        </template>
    </div>
</template>

<script>
    import { mapGetters } from "vuex";
    import { SEARCH_TV_SHOWS } from "../store/actions.type";
    import TvShowPreview from "../components/TvShowPreview";
    import Loader from "../components/Loader";

    export default {
        name: "search",
        components: {
            TvShowPreview,
            Loader
        },
        mounted() {
            this.$store.dispatch(SEARCH_TV_SHOWS, {term: this.$route.query.q});
        },
        watch: {
            '$route.query.q': function (term) {
                this.$store.dispatch(SEARCH_TV_SHOWS, {term: term});
            }
        },
        computed: {
            ...mapGetters(["tvShows", "isLoading", "tvShowsCount"])
        }
    }
</script>

<style>
    .row {
        margin-top: 6rem;
        padding: 0 60px;
    }
</style>