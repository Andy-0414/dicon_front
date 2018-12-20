<template>
    <v-flex d-flex xs12 sm3>
        <v-card class="pa-2 ma-3">
            <v-img :src="getImgUrl" aspect-ratio="1"></v-img>
            <v-card-title primary-title>
                <h3 class="headline nameColor font-weight-bold">{{data.name}}</h3>
            </v-card-title>
            <v-card-text>
                <div>
                    <div class="text-truncate">신청자 수 : {{num}}</div>
                </div>
            </v-card-text>
            <v-card-actions>
                <v-layout align-end justify-end row fill-height wrap>
                    <router-link :to="'/joinData/'+data.id"><v-btn flat color="green" class="subheading">신청자</v-btn></router-link>
                    <v-if v-if="!data.isEnded">
                    <router-link :to="'/management/'+data.id"><v-btn flat color="green" class="subheading">설정</v-btn></router-link>
                    <v-dialog v-model="dialog" max-width="1000">
                        <v-btn slot="activator" flat color="red accent-4" class="subheading">종료</v-btn>
                        <v-card>
                            <v-card-title class="headline pl-3 pt-3 nameColor font-weight-bold">'{{data.name}}'' 을 종료하시겠습니까?</v-card-title>
                            <v-card-text>
                                <v-card>
                                    <v-card-title class="title">
                                        수상자
                                    </v-card-title>
                                    <v-card-text>
                                        <v-flex d-flex v-for="(i,idx) in winner" :key="idx">
                                            <v-text-field v-model="winner[idx].text" style="max-width:200px;" placeholder="상 이름"> </v-text-field>
                                            <v-combobox v-model="winner[idx].user" :items="user" label="아이디" multiple></v-combobox>
                                        </v-flex>
                                        <v-flex xs12>
                                            <v-btn flat block color="green" @click="addList">추가</v-btn>
                                        </v-flex>
                                    </v-card-text>
                                </v-card>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn flat @click="dialog=false">취소</v-btn>
                                <v-btn flat color="red accent-1" class="subheading" @click="closeThisContest(data.id)">대회 종료</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                    <v-dialog v-model="dialoga" max-width="500">
                        <v-btn slot="activator" flat color="red accent-4" class="subheading" >삭제</v-btn>
                        <v-card>
                            <v-card-title class="headline pl-3 pt-3 nameColor font-weight-bold">'{{data.name}}'' 을 삭제하시겠습니까?</v-card-title>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn flat @click="dialoga=false">취소</v-btn>
                                <v-btn flat color="red accent-4" class="subheading" @click="deleteThisContest(data.id)">대회 삭제</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                    </v-if>
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
            dialog: false,
            dialoga: false,

            num: 0,
            user:[],
            winner: []
        }),
        created: function () {
            this.getJoinData()
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
            },
            closeThisContest(id){
                console.log(this.winner)
                axios(this.$store.state.mainPath + "/contest/closeContest", {
                    method: "post",
                    //withCredentials: true,
                    data: {
                        id : id,
                        winner: this.winner
                    }
                })
                    .then(data => {
                        this.dialog = false
                        this.$store.dispatch('getContest')
                    })
                    .catch(data => {
                        this.dialog = false
                    })
            },
            getJoinData() {
                axios(this.$store.state.mainPath + "/join/getJoinData", {
                    method: "post",
                    data: {id: this.data.id }
                })
                    .then(data => {
                        this.num = data.data.length
                        this.user = data.data.map(x=>{
                            return x.email
                        })
                    })
                    .catch(err => {
                        this.num = 0
                    })
            },
            addList(){
                this.winner.push({
                    text: "",
                    user: []
                })
            }
        },
        components: {
            
        },
        computed:{
            getMainPath() {
                return this.$store.state.mainPath
            },
            getImgUrl(){
                if( this.data.img.indexOf("https://") != -1|| this.data.img.indexOf("http://") != -1)
                    return this.data.img
                else
                    return `${this.getMainPath}/${this.data.img}`
            }
        }
    } 
</script>

<style scoped>
</style>