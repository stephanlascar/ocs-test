<template>
    <div class="movie-details">
        <template v-if="!isSerieLoading">
            <div class="row">
                <div class="col-md-6 left-box">
                    <h1>{{ serie.title[0].value }}</h1>
                    <p>{{ serie.seasons[0].pitch }}</p>
                    <router-link :to="{name: 'watch', params: {id: $route.params.id}}"><i class="fa fa-play"></i> Regarder</router-link>
                    <a href="#" class="download-btn"><i class="fa fa-arrow-down"></i> Télécharger</a>
                </div>
                <div class="col-md-6 text-center">
                    <img :src="image(this.serie.seasons[0].imageurl)"/>
                </div>
            </div>
            <div class="more mt-4 pt-5">
                <h3 class="mb-5">Saisons</h3>
                <div class="row text-center text-lg-left">
                    <div class="col-lg-2 col-md-4 col-6" v-for="(season) in serie.seasons" v-bind:key="season.id">
                        <a href="#" class="d-block mb-3 h-100">
                            <div class="card bg-dark text-white">
                                <img class="card-img img-fluid" :src="image(season.imageurl)" alt="Card image">
                                <div class="card-img-overlay">
                                    <h5 class="card-title">Saison {{ season.number }}</h5>
                                    <h6 class="card-subtitle mb-2 text-muted">{{ season.subtitle }}</h6>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </template>
        <template v-else>
            <loader></loader>
        </template>
    </div>
</template>

<script>
    import Loader from "../components/Loader";
    import {GET_SERIE} from "../store/actions.type";
    import {mapGetters} from "vuex";

    export default {
        name: "serie",
        components: {
            Loader
        },
        watch: {
            'serie': function (serie) {
                document.querySelector('body').style.backgroundImage = `linear-gradient(rgba(0,0,0,0.8),rgba(0,0,0,0.8)),url(http://statics.ocs.fr${serie.seasons[0].imageurl})`;
                document.querySelector('body').style.backgroundPosition = 'top';
                document.querySelector('body').style.backgroundSize = 'cover';
            }
        },
        mounted() {
            this.$store.dispatch(GET_SERIE, {id: this.$route.params.id});
        },
        computed: {
            ...mapGetters(["serie", "isSerieLoading"])
        },
        methods: {
            image(id) {
                return `http://statics.ocs.fr${id}`;
            },
        },
        destroyed() {
            document.querySelector('body').style.backgroundImage = 'none';
        }
    }
</script>

<style>
    .movie-details {
        margin: 3% 1%;
    }

    .left-box, .more {
        color: #fff;
    }

    .left-box a {
        text-decoration: none;
        border-radius: 30px;
        padding: 7px 20px;
        margin-top: 15px;
        color: #fff;
        background-color: #107afd;
        font-weight: 600;
        display: inline-block;
        margin-right: 10px;
    }

    .left-box a.download-btn {
        border: 1px solid #fff;
        background-color: transparent;
    }
</style>
