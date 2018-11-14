<template>
    <div>
        <CompetitionList />
        <SearchBar />
        <TopBar />
    </div>
</template>

<script>
    import SearchBar from '../components/SearchBar.vue'
    import CompetitionList from '../components/CompetitionList.vue'
    import TopBar from '../components/TopBar.vue'

    export default {
        components: {
            SearchBar,
            CompetitionList,
            TopBar,
        },
        methods:{

        },
        watch:{
        }
    }
</script>