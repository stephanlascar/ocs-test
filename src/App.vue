<template>
    <div id="app">
        <Header v-on:searchResult="onSearchResult"/>
        <router-view></router-view>
    </div>
</template>

<script>
    import Header from './components/Header.vue'

    export default {
        name: 'App',
        components: {
            Header
        },
        methods: {
            onSearchResult(toto) {
                console.log(toto);
            }
        }
    }
</script>

<style>
    #app {
        padding-top: 5rem;
    }
</style>
