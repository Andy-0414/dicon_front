<template>
    <v-flex d-flex xs12 sm4>
        <v-hover>
            <v-card class="pa-2 ma-3" slot-scope="{ hover }" :color='(data.isJoin ? "deep-purple lighten-5" : "")'>
                <v-img :src="`${getMainPath}/${data.img}`" aspect-ratio="1">
                    <v-expand-transition>
                        <div v-if="(hover && data.isApplicable)" class="d-flex transition-fast-in-fast-out green darken-3 title v-card--reveal white--text"
                            style="height: 30px">
                            신청 가능
                        </div>
                        <div v-if="(hover && !data.isApplicable)" class="d-flex transition-fast-in-fast-out red accent-4 title v-card--reveal white--text"
                            style="height: 30px;">
                            신청 불가
                        </div>
                    </v-expand-transition>
                </v-img>
                <v-card-title primary-title>
                    <h3 class="headline nameColor font-weight-bold">{{data.name}}</h3>
                </v-card-title>
                <v-card-text>
                    <div>
                        <div class="text-truncate contentColor">{{data.content}}</div>
                        <div class="contentColor">{{`${data.date.startDate} ~ ${data.date.endDate}`}} </div>
                        <div>
                            <v-chip label small v-for="x in data.tags" :key="x.text" :color="x.color+' lighten-3'">
                                {{ x.text }}
                            </v-chip>
                        </div>
                    </div>
                </v-card-text>
                <v-card-actions>
                    <v-layout align-end justify-end row fill-height v-if="data.isJoin">
                        <v-btn flat color="green" class="subheading">신청 완료</v-btn>
                        <v-btn flat color="red accent-4" class="subheading" @click="detachContest">신청 취소</v-btn>
                    </v-layout>
                    <v-layout align-end justify-end row fill-height v-else>
                        <Join :data="data" />
                    </v-layout>
                </v-card-actions>
            </v-card>
        </v-hover>
    </v-flex>
</template>

<script>
    import axios from 'axios';

    import Join from './Join.vue'

    export default {
        name: 'CompetitionBox',
        props: {
            data: Object
        },
        components: {
            Join
        },
        methods: {
            detachContest() {
                axios(this.$store.state.mainPath + "/join/detachContest", {
                    method: "post",
                    data: {
                        id: this.data.id,
                    }
                    //withCredentials: true,
                })
                    .then(data => {
                        this.$store.dispatch('getContest')
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
        },
        computed: {
            getMainPath() {
                return this.$store.state.mainPath
            }
        },
    } 
</script>

<style scoped>
    .v-card--reveal {
        align-items: center;
        bottom: 0;
        justify-content: center;
        opacity: .5;
        position: absolute;
        width: 100%;
    }
</style>