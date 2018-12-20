<template>
    <v-content class="backColor">
        <v-layout row wrap>
            <v-flex lg4 md12>
                <v-card class="pa-2 ma-3">
                    <v-data-table :headers='header' :items="joinData" class="elevation-1" item-key="email" hide-actions>
                        <template slot="items" slot-scope="props">
                            <tr @click="currentUser = props.item">
                                <td>{{props.index}}</td>
                                <td class="subheading">{{ props.item.email }}</td>
                                <td>{{(props.item.ok ? "O":"X")}}</td>
                            </tr>
                        </template>
                        <template slot="no-data">
                            <v-alert :value="true" color="error" icon="warning">
                                데이터가 없습니다.
                            </v-alert>
                        </template>
                    </v-data-table>
                </v-card>
            </v-flex>
            <v-flex>
                <v-card class="pa-3 ma-3" color="rgba(0,0,0,0.1)" v-if="currentUser">
                    <v-card-title>
                        <v-layout align-center justify-center row fill-height>
                            <v-flex class="display-2 w">
                                <v-avatar size="100" color="grey lighten-4" class="ma-5"><v-img :src="getMainPath+'/noneImage.png'" aspect-ratio="1" /></v-avatar>
                                {{currentUser.email}}
                            </v-flex>
                        </v-layout>
                        <v-flex xs12 class="pa-2 ma-3 subheading">
                            <div>전화번호 : {{currentUser.phoneNumber}}</div> 
                            <div>학교 : {{currentUser.school}}</div> 
                            <div>나이 : {{currentUser.age}}</div>
                        </v-flex>
                    </v-card-title>
                    <v-card v-if="getContestData" flat v-for="(i,index) in getContestData.question" :key="i.label" class="pa-2 ma-3" color="rgba(0,0,0,0.1)">
                        <v-card-title class="title">{{i.label}}</v-card-title>
                        <v-card-text>{{currentUser.answer[index]}}</v-card-text>
                    </v-card>
                    <v-layout justify-center>
                        <v-flex xs4>
                            <v-btn block class="subheading white--text" color="green" v-if="!currentUser.ok" @click="sendOK(currentUser.email)">승인</v-btn>
                            <v-btn block class="subheading white--text" color="red" v-else @click="sendOK(currentUser.email)">승인 취소</v-btn>
                        </v-flex>
                    </v-layout>
                </v-card>
            </v-flex>
        </v-layout>
    </v-content>
</template>

<script>
    import axios from 'axios';

    export default {
        name: 'JoinData',
        props: {
            id: String
        },
        data: () => ({
            header:[
                {text : "신청번호", value: "index"},
                {text : "이메일", value: "email"},
                {text : "승인", value: "ok"}
            ],

            joinData: [],
            currentUser: null,
        }),
        created: function () {
            this.getJoinData()
            this.$store.commit('toggleMenu', false);
            this.$store.commit('menuLock', true);
        },
        components: {
        },
        methods: {
            getJoinData() {
                axios(this.$store.state.mainPath + "/join/getJoinData", {
                    method: "post",
                    data: { id: this.id }
                })
                    .then(data => {
                        this.joinData = data.data
                        if(this.currentUser){
                            var idx = this.joinData.findIndex(x => x.email == this.currentUser.email)
                            if(idx != -1) this.currentUser = this.joinData[idx]
                        }
                    })
                    .catch(err => {
                        this.joinData = []
                    })
            },
            sendOK(email){
                axios(this.$store.state.mainPath + "/join/okUser", {
                    method: "post",
                    data: {
                        id: this.id,
                        email : email
                    }
                })
                    .then(data => {
                        this.getJoinData()
                    })
                    .catch(err => {
                        this.getJoinData()
                    })
            }
        },
        computed: {
            getContestData() {
                return this.$store.state.contestData.find(x => x.id == this.id)
            },
            getMainPath() {
                return this.$store.state.mainPath
            }
        }
    } 
</script>
<style scoped>
    .w{
        overflow: hidden; 
        word-wrap: break-word;
    }
</style>
