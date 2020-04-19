<template>
    <nav class="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
        <a class="navbar-brand" href="#">OCS</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#mainNavbarContent" aria-controls="mainNavbarContent" aria-expanded="false">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="mainNavbarContent">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                    <a class="nav-link" href="#">Accueil <span class="sr-only">(current)</span></a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Séries</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Films</a>
                </li>
            </ul>
            <form class="form-inline my-2 my-lg-0">
                <input class="search-input form-control mr-sm-2" v-debounce="search" type="text" placeholder="Rechercher" aria-label="Rechercher">
            </form>
        </div>
    </nav>
</template>

<script>
    export default {
        name: 'Header',

        methods: {
            search(val) {
                this.$router.push({name: 'search', query: {q: val}});
            }
        }
    }
</script>

<style scoped>

</style>