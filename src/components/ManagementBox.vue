<template>
    <v-flex d-flex xs12 sm3>
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
                    <router-link :to="'/joinData/'+data.id"><v-btn flat color="green" class="subheading">신청자 확인</v-btn></router-link>
                    <router-link :to="'/management/'+data.id"><v-btn flat color="green" class="subheading">대회 설정 변경</v-btn></router-link>
                    <v-dialog v-model="dialog" max-width="290">
                        <v-btn slot="activator" flat color="red" class="subheading">대회 폐쇠</v-btn>
                        <v-card>
                            <v-card-title class="headline">'{{data.name}}'' 을 폐쇠하시겠습니까?</v-card-title>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn flat @click="dialog=false">취소</v-btn>
                                <v-btn flat color="red" class="subheading" @click="deleteThisContest(data.id)">대회 폐쇠</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                    
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
        data : ()=>({
            dialog: false
        }),
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