<template>
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition" scrollable>
        <v-btn slot="activator" flat color="rgb(92,49,143)" class="subheading" :disabled="!data.isApplicable">신청</v-btn>
        <v-card color="rgb(80, 80, 80,0.8)">
            <v-card-text class="ma-0 pa-0 scroll-y">
                <v-layout justify-end>
                    <v-btn icon @click="dialog = false" large dark>
                        <v-icon large>close</v-icon>
                    </v-btn>
                </v-layout>
                <v-layout wrap justify-center>
                    <v-flex xs12 sm4 lg3>
                        <v-card class="pa-2 ma-3" dark>
                            <v-img v-if="getMainPath" :src="getImgUrl" aspect-ratio="1"></v-img>
                            <v-card-title primary-title>
                                <h3 class="headline font-weight-bold white--text">{{data.name}}</h3>
                            </v-card-title>
                            <v-card-text>
                                <div>
                                    <div class="text-truncate white--text">{{data.content}}</div>
                                    <div class="white--text">{{`${data.date.startDate} ~ ${data.date.endDate}`}} </div>
                                    <div>
                                        <v-chip label small v-for="x in data.tags" :key="x.text" :color="x.color+' lighten-3'">
                                            {{ x.text }}
                                        </v-chip>
                                    </div>
                                </div>
                            </v-card-text>
                        </v-card>
                    </v-flex>
                    <v-flex xs12 sm8 lg9>
                        <v-card class="pa-5 ma-3 white--text" v-html="compiledMarkdown" dark></v-card>
                        <v-btn block large class="title" :href="data.link" v-if="data.link">외부 링크</v-btn>
                        <v-form ref="form" v-model="valid" lazy-validation v-else>
                            <v-card dark class="my-5 pa-2 ma-3">
                                <div class="display-1 ma-4 white--text">신청</div>
                                <v-card v-for="(i,index) in data.question" :key="i.label" class="pa-2 ma-2" dark flat
                                    v-if="data.isApplicable">
                                    <v-card-title class="headline white--text">{{i.label}}</v-card-title>
                                    <v-card-text>
                                        <v-flex xs12>
                                            <v-select attach v-if="i.type == 'select'" :items="i.data" v-model="inData[index]"
                                                :rules="notDataRule" solo flat light required />
                                            <v-select attach v-else-if="i.type == 'checkbox'" :items="i.data" multiple
                                                :rules="notArrayRule" solo flat light v-model="inData[index]" required />
                                            <v-text-field v-else-if="i.type == 'text'" :label="i.data" flat v-model="inData[index]"
                                                :rules="notDataRule" solo light required />
                                            <v-switch v-else-if="i.type == 'switch'" v-model="inData[index]" :label="i.data"
                                                color="rgb(92,49,143)" />
                                        </v-flex>
                                    </v-card-text>
                                </v-card>
                            </v-card>
                            <v-layout justify-center>
                                <v-flex xs12 lg8>
                                     <v-tooltip top>
                                        <v-btn slot="activator" v-if="data.isApplicable" :disabled="!valid || !this.$store.state.userData" @click="sendData"
                                        large block color="rgb(23, 23, 23)" dark class="title mb-5">제출</v-btn>
                                        <span style="min-width:500px;">{{ getMsg }}</span>
                                     </v-tooltip>
                                </v-flex>
                            </v-layout>
                        </v-form>
                    </v-flex>
                </v-layout>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>

    import axios from 'axios';

    export default {
        name: 'Join',
        props: {
            data: Object
        },
        data: () => ({
            valid: true,
            dialog: false,

            notDataRule: [v => !!v || '필수 입력'],
            notArrayRule: [v => v.length > 0 || '필수 입력'],

            inData: [],
        }),
        methods: {
            sendData() {
                if (this.$refs.form.validate()) {
                    axios(this.$store.state.mainPath + "/join/joinContest", {
                        method: "post",
                        data: {
                            id: this.data.id,
                            data: this.inData
                        }
                        //withCredentials: true,
                    })
                        .then(data => {
                            this.$store.dispatch('getContest')
                            this.$router.push("/")
                        })
                        .catch(err => {
                            console.log(err)
                        })
                }
            }
        },
        watch: {
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
            },
            compiledMarkdown: function () {
                return marked(this.data.md, { sanitize: true })
            },
            getMsg(){
                if(!this.$store.state.userData){
                    return "로그인이 필요합니다."
                }
                if(!this.valid){
                    return "조건에 맞지 않습니다."
                }
                return "신청 가능합니다."
            }
        },
    } 
</script>

<style scoped>
</style>