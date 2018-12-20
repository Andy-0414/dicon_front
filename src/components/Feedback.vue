<template>
    <v-dialog v-model="dialog" persistent max-width="700px">
        <v-btn slot="activator" flat color="green" class="subheading">피드백</v-btn>
        <v-card>
            <v-card-title>
                <span class="headline pl-3 pt-3 nameColor font-weight-bold">피드백</span>
            </v-card-title>
            <v-card-text>
                    <v-container grid-list-md @keyup.enter="register">
                        <v-flex xs12>
                            <v-layout justify-end class="title">대회 참가자의 수준은 어느정도였나요?</v-layout>
                            <v-slider v-model="feed[0]" :tick-labels="ticksLabels" thumb-label ticks="always" min="1" max="10"></v-slider>
                        </v-flex>
                        <v-flex xs12>
                            <v-layout justify-end class="title">대회 운영이 매끄러웠나요?</v-layout>
                            <v-slider v-model="feed[1]" :tick-labels="ticksLabels" thumb-label ticks="always" min="1" max="10"></v-slider>
                        </v-flex>
                        <v-flex xs12>
                            <v-layout justify-end class="title">대회에서 주어진 과제는 어느정도 수준이었나요?</v-layout>
                            <v-slider v-model="feed[2]" :tick-labels="ticksLabels" thumb-label ticks="always" min="1" max="10"></v-slider>
                        </v-flex>
                        <v-flex xs12>
                            <v-layout justify-end class="title">대회에서 주어진 과제의 질은 어느정도 었나요?</v-layout>
                            <v-slider v-model="feed[3]" :tick-labels="ticksLabels" thumb-label ticks="always" min="1" max="10"></v-slider>
                        </v-flex>
                        <v-flex xs12>
                            <v-layout justify-end class="title">대회가 당신의 실력을 끌어올리는데 어느정도 도움이 되었나요?</v-layout>
                            <v-slider v-model="feed[4]" :tick-labels="ticksLabels" thumb-label ticks="always" min="1" max="10"></v-slider>
                        </v-flex>
                    </v-container>
            </v-card-text>
            <v-card-actions class="pb-3">
                <v-spacer></v-spacer>
                <v-btn color="red accent-4" flat @click.native="dialog = false">취소</v-btn>
                <v-btn color="deep-purple darken-4" flat @click="sendServer">보내기</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    import axios from 'axios';

    export default {
        name: 'Feedback',
        data: () => ({
            dialog: false,
            valid: false,
            
            feed:[],

            ticksLabels: ["하","","","","중","","","","","상"],
        }),
        methods: {
            sendServer(){
                axios(this.$store.state.mainPath + "/contest/feedback", {
                        method: "post",
                        data: {
                            id: this.data.id,
                            feed: this.feed
                        }
                        //withCredentials: true,
                    })
                        .then(data => {
                            this.dialog = false
                            this.$store.dispatch('getContest')
                            this.$router.push("/")
                        })
                        .catch(err => {
                            this.dialog = false

                            console.log(err)
                        })
            }
        },
        computed: {
        },
        props: {
            data:Object
        }
    } 
</script>

<style scoped>

</style>