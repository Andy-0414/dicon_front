<template>
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition" scrollable>
        <v-btn slot="activator" flat color="rgb(92,49,143)" class="subheading" :disabled="!data.isApplicable">신청</v-btn>
        <v-card color="rgba(33,33,33,0.9)">
            <v-card-text class="ma-0 pa-0 scroll-y">
                <v-layout justify-end>
                    <v-btn icon dark @click="dialog = false" large>
                        <v-icon large>close</v-icon>
                    </v-btn>
                </v-layout>
                <v-layout wrap justify-center>
                    <v-flex xs12 lg4>
                        <v-card dark class="pa-2 ma-3">
                            <v-img v-if="getMainPath" :src="getImgUrl" aspect-ratio="1"></v-img>
                            <v-card-title primary-title>
                                <h3 class="headline white--text font-weight-bold">{{data.name}}</h3>
                            </v-card-title>
                            <v-card-text>
                                <div>
                                    <div class="text-truncate white--text">{{data.content}}</div>
                                    <div class="white--text">{{`${data.date.startDate} ~ ${data.date.endDate}`}} </div>
                                    <div>
                                        <v-chip label small v-for="x in data.tags" :key="x.text" :color="x.color+' lighten-3'"
                                            @click="pushTag(x)">
                                            {{ x.text }}
                                        </v-chip>
                                    </div>
                                </div>
                            </v-card-text>
                        </v-card>
                    </v-flex>
                    <v-flex xs12 lg8>
                        <v-card class="white--text my-1 pa-5" color="rgba(0,0,0,0.2)" v-html="compiledMarkdown"></v-card>
                        <v-btn block large class="title" :href="data.link" v-if="data.link">외부 링크</v-btn>
                        <v-form ref="form" v-model="valid" lazy-validation v-else>
                            <v-card flat v-for="(i,index) in data.question" :key="i.label" class="my-5 px-2 pt-2" color="rgba(0,0,0,0.0)"
                                dark>
                                <v-card-title class="headline">{{i.label}}</v-card-title>
                                <v-card-text>
                                    <v-flex xs12>
                                        <v-select attach v-if="i.type == 'select'" :items="i.data" v-model="inData[index]"
                                            :rules="notDataRule" required />
                                        <v-select attach v-else-if="i.type == 'checkbox'" :items="i.data" multiple
                                            :rules="notArrayRule" v-model="inData[index]" required />
                                        <v-text-field v-else-if="i.type == 'text'" :label="i.data" flat solo v-model="inData[index]"
                                            :rules="notDataRule" required />
                                        <v-switch v-else-if="i.type == 'switch'" v-model="inData[index]" :label="i.data"
                                            color="rgb(92,49,143)" />
                                    </v-flex>
                                </v-card-text>
                            </v-card>
                            <v-btn :disabled="!valid || !data.isApplicable || !this.$store.state.userData" @click="sendData"
                                block large color="rgb(23, 23, 23)" dark class="title mb-5">제출</v-btn>
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
            }
        },
    } 
</script>

<style scoped>
</style>