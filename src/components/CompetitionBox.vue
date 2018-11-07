<template>
    <v-flex xs12 sm4>
        <v-card class="pa-2 ma-2">
            <v-img
                src="https://ncache.ilbe.com/files/attach/new/20130505/14357299/1117152901/1179996754/5a5a26811deb267e632df6a6f1770006.jpg"
                aspect-ratio="2.75"
            ></v-img>
            <v-card-title primary-title>
            <div>
              <h3 class="headline mb-2">대회이름</h3>
              <div>대회 간략한 소개</div>
              <div>기간</div>
              <div>태그들</div>
            </div>
          </v-card-title>
          <v-card-actions>
            <v-btn flat color="orange">신청</v-btn>
          </v-card-actions>
        </v-card>
    </v-flex>
</template>

<script>
    export default {
        name: 'CompetitionBox',
        props: {
        }
    } 
</script>

<style scoped>

</style>