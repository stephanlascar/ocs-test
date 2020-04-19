<template>
    <div class="col-lg-2 col-md-4 col-6">
        <router-link :to="tvShowId" class="d-block mb-10 h-100">
            <div class="card bg-dark text-white">
                <img class="card-img img-fluid" :src="tvShowImageUrl" alt="Card image">
                <div class="card-img-overlay">
                    <h5 class="card-title">{{ tvShow.title[0].value }}</h5>
                </div>
            </div>
        </router-link>
    </div>
</template>

<script>
    export default {
        name: "tvShowPreview",
        props: {
            tvShow: { type: Object, required: true }
        },
        computed: {
            tvShowImageUrl() {
                return `http://statics.ocs.fr${this.tvShow.imageurl}`;
            },
            tvShowId() {
                return this.tvShow.detaillink.split('/').slice(-2).join('/');
            }
        }
    }
</script>

<style>
    .mb-10 {
        margin-bottom: 6rem !important;
    }

    .col-6 {
        padding-right: 3px;
        padding-left: 3px;
    }

    .card-img-overlay {
        opacity: 0;
        transition: .5s ease;
    }

    .card:hover .card-img-overlay {
        opacity: 1;
    }

    .card:hover img {
        opacity: 0.3;
    }
</style>
