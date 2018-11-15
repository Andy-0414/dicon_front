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

    export default {
        components: {
            SearchBar,
            TopBar,
        },
        methods:{

        },
        watch:{
        }
    }
</script>