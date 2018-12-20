<template>
    <v-flex xs12>
        <v-hover>
            <v-card class="pa-2 my-3 mx-2" slot-scope="{ hover }" :color='(data.isJoin ? "deep-purple lighten-5" : "")'>
                <v-img v-if="getMainPath" :src="getImgUrl" aspect-ratio="1">
                    <div v-if="!data.isEnded">
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
                    </div>
                    <div v-else>
                        <v-expand-transition>
                            <div v-if="hover" class="d-flex transition-fast-in-fast-out red accent-4 title v-card--reveal white--text"
                                style="height: 30px;">
                                종료
                            </div>
                        </v-expand-transition>
                    </div>
                </v-img>
                <v-card-title primary-title>
                    <h3 class="headline nameColor font-weight-bold">{{data.name}}</h3>
                </v-card-title>
                <v-card-text>
                    <div>
                        <div class="text-truncate contentColor">{{data.content}}</div>
                        <div class="contentColor">{{`${data.date.startDate} ~ ${data.date.endDate}`}} </div>
                        <div>
                            <v-chip label small v-for="x in data.tags" :key="x.text" :color="x.color+' lighten-3'"
                                @click="pushTag(x)">
                                {{ x.text }}
                            </v-chip>
                        </div>
                    </div>
                </v-card-text>
                <v-card-actions>
                    <v-layout align-end justify-end row fill-height wrap>
                        <v-flex>
                            <div class="text-truncate contentColor">개최: {{data.owner}}</div>
                        </v-flex>
                        <v-layout wrap align-end justify-end>
                            <v-btn flat color="green" class="subheading" v-if="data.isJoin">{{data.isEnded ? "대회 종료":"신청 완료"}}</v-btn>
                            <v-dialog v-model="dialog" max-width="500" v-if="data.isJoin && !data.isEnded">
                                <v-btn slot="activator" flat color="red accent-4" class="subheading">신청 취소</v-btn>
                                <v-card>
                                    <v-card-title class="headline pl-3 pt-3 nameColor font-weight-bold">'{{data.name}}''
                                        신청을 취소하시겠습니까?</v-card-title>
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn flat @click="dialog=false">취소</v-btn>
                                        <v-btn flat color="red accent-4" class="subheading" @click="detachContest">신청
                                            취소</v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                            <Score :data="data" v-if="data.isEnded"/>
                            <Join :data="data" v-if="!data.isEnded && !data.isJoin" />
                        </v-layout>
                    </v-layout>
                </v-card-actions>
            </v-card>
        </v-hover>
    </v-flex>
</template>

<script>
    import axios from 'axios';

    import Join from './Join.vue'
    import Score from './Score.vue'

    export default {
        name: 'CompetitionBox',
        props: {
            data: Object
        },
        components: {
            Join,
            Score
        },
        data: () => ({
            dialog: false
        }),
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
                        this.dialog = false
                        this.$store.dispatch('getContest')
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },
            pushTag(x) {
                if (this.$store.state.searchTags.indexOf(x) == -1 && this.$store.state.searchTags.length < 6) {
                    this.$store.state.searchTags.push(x)
                }
            },
        },
        computed: {
            getMainPath() {
                return this.$store.state.mainPath
            },
            getImgUrl() {
                if (this.data.img.indexOf("https://") != -1 || this.data.img.indexOf("http://") != -1)
                    return this.data.img
                else
                    return `${this.getMainPath}/${this.data.img}`
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