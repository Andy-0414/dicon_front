<template>
    <v-app>
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
            this.$store.commit('setURL',window.location.protocol + "//" + window.location.host) // 어디든지 접속 가능
            this.$store.dispatch('getContest')
            this.$store.dispatch('getUser')
            this.$store.dispatch('getTagList')
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
        background-color: rgba(92,49,143,0.1);
    }

    ::-webkit-scrollbar-thumb {
        background-color: rgba(0, 0, 0, 0.2);
    }

    a{
        text-decoration: none;
    }

    .backColor{
        background-color: rgb(234, 234, 234);
    }
    .boldColor{
        font-weight: 700;
        color: rgb(0, 120, 212);
    }
    .nameColor{
        font-weight: 700;
        color: rgb(36, 58, 94);
    }
    .contentColor{
        
        color: rgb(80, 80, 80);
    }
    .mainColor{
        color:rgb(92,49,143);
    }
</style>