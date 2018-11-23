<template>
    <v-app dark>
        <SearchBar />
        <TopBar />
        <router-view></router-view>
    </v-app>
</template>

<script>
    import SearchBar from './components/SearchBar.vue'
    import TopBar from './components/TopBar.vue'
    import axios from 'axios';

    export default {
        components: {
            SearchBar,
            TopBar,
        },
        created: function (){
            this.$store.dispatch('getContest')
            this.$store.dispatch('getUser')
        },
        methods: {
            
        },
        watch: {
        }
    }
</script>

<style>
    html {
        overflow: hidden;
    }

    .v-content {
        height: 0;
        overflow-y: auto;
    }

    ::-webkit-scrollbar {
        width: 15px;
    }

    ::-webkit-scrollbar-track {
        background-color: #212121;
    }

    ::-webkit-scrollbar-thumb {
        background-color: rgba(0, 0, 0, 0.2);
    }

    a{
        text-decoration: none;
    }
</style>