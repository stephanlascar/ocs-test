<template>
    <div id="app">
        <Header v-on:searchResult="onSearchResult"/>
        <img alt="Vue logo" src="./assets/logo.png">
        <HelloWorld msg="Welcome to Your Vue.js App"/>
    </div>
</template>

<script>
    import 'bootstrap'
    import 'bootstrap/dist/css/bootstrap.min.css'
    import Header from './components/Header.vue'
    import HelloWorld from './components/HelloWorld.vue'

    export default {
        name: 'App',
        components: {
            Header,
            HelloWorld
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
