<template>
    <div id="app">
        <Header/>
        <div class="container-fluid">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import Header from './components/Header.vue'

    export default {
        name: 'App',
        components: {
            Header
        }
    }
</script>

<style>
    #app {
        padding-top: 5rem;
    }
</style>
