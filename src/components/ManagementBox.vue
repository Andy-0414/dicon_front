<template>
    <v-flex d-flex xs12 sm4>
        <v-card class="pa-2 ma-3">
            <v-img :src="`${getMainPath}/${data.img}`" aspect-ratio="1"></v-img>
            <v-card-title primary-title>
                <h3 class="headline">{{data.name}}</h3>
            </v-card-title>
            <v-card-text>
                <div>
                    <div class="text-truncate">신청자 수 : ?</div>
                </div>
            </v-card-text>
            <v-card-actions>
                <v-layout align-end justify-end row fill-height wrap>
                    <router-link :to="'/management/'+data.id"><v-btn flat color="green" class="subheading">대회 설정 변경</v-btn></router-link>
                    <v-btn flat color="red" class="subheading" @click="deleteThisContest(data.id)">대회 폐쇠</v-btn>
                </v-layout>
            </v-card-actions>
        </v-card>
    </v-flex>
</template>

<script>
    import axios from 'axios';

    export default {
        name: 'ManagementBox',
        props: {
            data: Object
        },
        created: function () {
        },
        methods:{
            deleteThisContest(id){
                axios(this.$store.state.mainPath + "/contest/deleteContest", {
                    method: "post",
                    //withCredentials: true,
                    data: {
                        data: {id : id}
                    }
                })
                    .then(data => {
                        this.$store.dispatch('getContest')
                    })
                    .catch(data => {
                    })
            }
        },
        components: {
            
        },
        computed:{
            getMainPath() {
                return this.$store.state.mainPath
            }
        }
    } 
</script>

<style scoped>
</style>