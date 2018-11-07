<template>
  <div>
    <SearchBar/>
    <CompetitionList/>
    <LoginBar/>
  </div>
</template>

<script>
  import SearchBar from '../components/SearchBar.vue'
  import CompetitionList from '../components/CompetitionList.vue'

  export default {
    components: {
      SearchBar,
      CompetitionList,
    }
  }
</script>