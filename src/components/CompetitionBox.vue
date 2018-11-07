<template>
    <v-flex xs12 sm4>
        <v-card class="pa-2 ma-2">
            <v-img
                src="https://ncache.ilbe.com/files/attach/new/20130505/14357299/1117152901/1179996754/5a5a26811deb267e632df6a6f1770006.jpg"
                aspect-ratio="2.75"
            ></v-img>
            <v-card-title primary-title>
                <h3 class="headline">{{name}}</h3>
          </v-card-title>
          <v-card-text>
              <div>
              <div class="text-truncate">{{content}}</div>
              <div class="grey--text">기간</div>
              <div class="grey--text">태그들</div>
            </div>
          </v-card-text>
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
            name:String,
            content:String,
        }
    } 
</script>

<style scoped>

</style>