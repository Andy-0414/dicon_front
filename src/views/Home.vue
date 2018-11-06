<template>
    <div id="app">
        <SearchBar/>
        <CompetitionList/>
    </div>
</template>
<script>
    // @ is an alias to /src
    import SearchBar from '@/components/SearchBar.vue'
    import CompetitionList from '@/components/CompetitionList.vue'

    export default {
        name: 'home',
        components: {
            SearchBar,
            CompetitionList
        }
    }
</script> 