<template>
    <div class="movie-details">
        <template v-if="!isProgrammeLoading">
            <div class="row">
                <div class="col-md-6 left-box">
                    <h1>{{ programme.title[0].value }}</h1>
                    <p>{{ programme.pitch }}</p>
                    <router-link :to="{name: 'watch', params: {id: $route.params.id}}"><i class="fa fa-play"></i> Regarder</router-link>
                    <a href="#" class="download-btn"><i class="fa fa-arrow-down"></i> Télécharger</a>
                </div>
                <div class="col-md-6 text-center">
                    <img :src="tvShowImageUrl"/>
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
    import {GET_PROGRAMME} from "../store/actions.type";
    import {mapGetters} from "vuex";

    export default {
        name: "programme",
        components: {
            Loader
        },
        watch: {
            'programme': function (programme) {
                document.querySelector('body').style.backgroundImage = `linear-gradient(rgba(0,0,0,0.8),rgba(0,0,0,0.8)),url(http://statics.ocs.fr${programme.fullscreenimageurl})`;
                document.querySelector('body').style.backgroundPosition = 'top';
                document.querySelector('body').style.backgroundSize = 'cover';
            }
        },
        mounted() {
            this.$store.dispatch(GET_PROGRAMME, {id: this.$route.params.id});
        },
        computed: {
            tvShowImageUrl() {
                return `http://statics.ocs.fr${this.programme.imageurl}`;
            },
            ...mapGetters(["programme", "isProgrammeLoading"])
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

    .left-box {
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
