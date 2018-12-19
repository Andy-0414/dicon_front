<template>
    <v-layout row wrap>
        <v-flex sm12 md4 lg3>
            <v-card class="pa-2 ma-3">
                <v-img :src="getNewImage" aspect-ratio="1" v-if="data.img">
                    <v-layout align-center justify-center row fill-height>
                        <v-text-field label="이미지" v-model='imageName' @click="pickFile" prepend-icon='attach_file'></v-text-field>
                        <input type="file" style="display: none" ref="image" accept="image/*" @change="onFilePicked">
                    </v-layout>
                </v-img>
                <v-card-title primary-title>
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <v-text-field class="headline nameColor font-weight-bold" v-model="data.name" placeholder="대회 이름"
                            :rules="notDataRule" required></v-text-field>
                    </v-form>
                </v-card-title>
                <v-card-text>
                    <div>
                        <v-text-field class="text-truncate" v-model="data.content" placeholder="대회 설명"></v-text-field>
                        <v-menu :close-on-content-click="false" :nudge-right="200" lazy transition="scale-transition"
                            offset-y full-width min-width="290px">
                            <v-text-field slot="activator" v-model="data.date.startDate" label="시작 날짜" prepend-icon="event"
                                readonly></v-text-field>
                            <v-date-picker ref="picker" v-model="data.date.startDate" :max="data.date.endDate"></v-date-picker>
                        </v-menu>
                        <v-menu :close-on-content-click="false" :nudge-right="200" lazy transition="scale-transition"
                            offset-y full-width min-width="290px">
                            <v-text-field slot="activator" v-model="data.date.endDate" label="끝 날짜" prepend-icon="event"
                                readonly></v-text-field>
                            <v-date-picker ref="picker" v-model="data.date.endDate" :min="data.date.startDate"></v-date-picker>
                        </v-menu>
                        <v-combobox :items="getTagList" :search-input.sync="search" v-model="tags" hide-selected label="태그"
                            multiple small-chips :menu-props="{nudgeRight:'300'}">
                            <template slot="no-data">
                                <v-list-tile>
                                    <span class="subheading">Create</span>
                                    <v-chip :color="`grey lighten-3`" label small>
                                        {{ search }}
                                    </v-chip>
                                </v-list-tile>
                            </template>
                            <template slot="selection" slot-scope="{ item, parent, selected }">
                                <v-chip :color="(item.color ? item.color : 'grey') +' lighten-3'" label small>
                                    {{ item.text }}
                                </v-chip>
                            </template>
                        </v-combobox>
                        <v-switch v-model="data.isApplicable" :color="data.isApplicable ? 'rgb(92,49,143)' : 'red'"
                            :label="data.isApplicable ? '참가 가능' : '참가 불가'"></v-switch>
                    </div>
                    <v-btn flat block color="green" class="headline" @click="sendServer()" v-if="!isCreated" :disabled="!valid">저장</v-btn>
                    <v-btn flat block color="green" class="headline" @click="sendCreateServer()" v-else :disabled="!valid">생성</v-btn>
                </v-card-text>
            </v-card>
        </v-flex>
        <v-flex>
            <v-card class="pa-3 ma-3" color="rgba(0,0,0,0.1)">
                <v-card flat v-for="(i,index) in data.question" :key="data[index]" class="my-5 px-2 pt-2" color="rgba(0,0,0,0)">
                    <v-card-title>
                        <v-text-field class="headline" v-model="data.question[index].label"></v-text-field>
                        <v-spacer></v-spacer>
                        <div class="grey--text">{{i.type}}</div>
                        <v-btn fab flat color="red" @click="deleteList(index)">
                            <v-icon medium dark>clear</v-icon>
                        </v-btn>
                    </v-card-title>
                    <v-card-text>
                        <v-flex xs12>
                            <v-layout v-if="i.type == 'select'" row fill-height>
                                <v-select attach :items="i.data" />
                                <v-spacer></v-spacer>
                                <div>
                                    <v-layout v-for="(j,idx) in i.data" :key="idx">
                                        <v-text-field solo v-model="data.question[index].data[idx]" />
                                        <v-btn flat small width fab @click="delData(index,idx)">
                                            <v-icon>clear</v-icon>
                                        </v-btn>
                                    </v-layout>
                                    <v-btn flat block color="green" @click="addData(index)">
                                        <v-icon>add</v-icon>
                                    </v-btn>
                                </div>
                            </v-layout>
                            <v-layout v-else-if="i.type == 'checkbox'" row fill-height>
                                <v-select attach :items="i.data" multiple />
                                <v-spacer></v-spacer>
                                <div>
                                    <v-layout v-for="(j,idx) in i.data" :key="idx">
                                        <v-text-field solo v-model="data.question[index].data[idx]" multiple />
                                        <v-btn flat small width fab @click="delData(index,idx)">
                                            <v-icon>clear</v-icon>
                                        </v-btn>
                                    </v-layout>
                                    <v-btn flat block color="green" @click="addData(index)">
                                        <v-icon>add</v-icon>
                                    </v-btn>
                                </div>
                            </v-layout>
                            <v-layout v-else-if="i.type == 'text'" row fill-height>
                                <v-text-field :placeholder="i.data" flat solo />
                                <v-spacer></v-spacer>
                                <v-text-field solo v-model="data.question[index].data" />
                            </v-layout>
                            <v-layout v-else-if="i.type == 'switch'" row fill-height>
                                <v-switch :label="i.data" />
                                <v-spacer></v-spacer>
                                <v-text-field solo v-model="data.question[index].data" />
                            </v-layout>
                        </v-flex>
                    </v-card-text>
                </v-card>
                <v-layout align-center justify-center row fill-height>
                    <v-dialog v-model="dialog" max-width="400px">
                        <v-btn fab slot="activator" flat color="green" class="title">
                            <v-icon dark large>add</v-icon>
                        </v-btn>
                        <v-card>
                            <v-card-title>
                                <span class="headline pl-3 pt-3">항목 추가</span>
                            </v-card-title>
                            <v-card-text>
                                <v-layout align-center justify-center row fill-height>
                                    <v-flex xs10>
                                        <v-select v-model="type" :items="typeList" placeholder="유형" />
                                    </v-flex>
                                </v-layout>
                            </v-card-text>
                            <v-card-actions class="pb-3">
                                <v-spacer></v-spacer>
                                <v-btn color="red accent-4" flat @click.native="dialog = false">취소</v-btn>
                                <v-btn color="green" flat :disable="!valid" @click="createList(type)">추가</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-layout>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
    import axios from 'axios';

    export default {
        name: 'ContestSetting',
        props: {
            data: Object,
            isCreated: Boolean
        },
        data: () => ({
            dialog: false,
            valid: true,

            search: null,
            type: "text",

            tags: [],

            imageName: '',
            imageFile: '',
            tmpImg: '',

            notDataRule: [v => !!v || '필수 입력'],
            typeList: ['text', 'checkbox', 'select', 'switch']
        }),
        created: function () {
            this.tags = this.data.tags
        },
        components: {

        },
        watch: {
            tags(tags, prev) {
                if (tags.length === prev.length) return
                if (tags.length > 10) {
                    this.$nextTick(() => this.tags.pop())
                }
                this.tags = tags.map(v => {
                    var isString = typeof v === 'string'
                    if (isString) {
                        var obj = this.getTagList.find(x => x.text == v)
                        if (!(obj === undefined)) return obj
                        v = {
                            text: v,
                            color: 'grey'
                        }
                    }
                    return v
                })
            }
        },
        methods: {
            pickFile() {
                this.$refs.image.click()
            },
            onFilePicked(e) {
                const files = e.target.files
                if (files[0] !== undefined) {
                    this.imageName = files[0].name
                    if (this.imageName.lastIndexOf('.') <= 0) {
                        return
                    }
                    const fr = new FileReader()
                    fr.readAsDataURL(files[0])
                    fr.addEventListener('load', () => {
                        this.tmpImg = fr.result
                        this.imageFile = files[0] // this is an image file that can be sent to server...
                    })
                } else {
                    this.imageName = ''
                    this.imageFile = ''
                    this.tmpImg = ''
                }
            },

            deleteList(index) {
                this.data.question.splice(index, 1)
            },
            createList(type) {
                if (this.$refs.form.validate()) {
                    this.data.question.push({
                        type: type,
                        label: null,
                        data: (type == 'text' || type == 'switch' ? "" : []),
                    })
                    this.dialog = false
                }
            },
            addData(index) {
                this.data.question[index].data.push('')
            },
            delData(index, idx) {
                this.data.question[index].data.splice(idx, 1)
            },
            sendServer() {
                if (this.$refs.form.validate()) {
                    this.data.tags = this.tags
                    axios(this.$store.state.mainPath + "/contest/updateContest", {
                        method: "post",
                        //withCredentials: true,
                        data: {
                            data: this.data,
                            img: this.imageFile
                        }
                    })
                        .then(data => {
                            let formData = new FormData();
                            formData.append('id', data.data.id);
                            formData.append('img', this.imageFile);
                            axios(this.$store.state.mainPath + "/contest/imgUpload", {
                                method: "post",
                                headers: {
                                    'Content-Type': 'multipart/form-data'
                                },
                                data: formData
                                //withCredentials: true,
                            }).then((data) => { console.log("clear!") }).catch(err => { console.log("notclear!") })

                            this.$store.dispatch('getContest')
                            this.$router.push("/")
                        })
                        .catch(data => {
                            this.$router.push("/")
                        })
                }
            },
            sendCreateServer() {
                this.data.tags = this.tags
                this.data.img = this.imageName

                axios(this.$store.state.mainPath + "/contest/createContest", {
                    method: "post",
                    data: {
                        data: this.data
                    }
                    //withCredentials: true,
                })
                    .then(data => {
                        let formData = new FormData();
                        formData.append('id', data.data.id);
                        formData.append('img', this.imageFile);
                        axios(this.$store.state.mainPath + "/contest/imgUpload", {
                            method: "post",
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            },
                            data: formData
                            //withCredentials: true,
                        }).then((data) => { console.log("clear!") }).catch(err => { console.log("notclear!") })

                        this.$store.dispatch('getContest')
                        this.$router.push("/")
                    })
                    .catch(data => {
                        this.$router.push("/")
                    })
            }
        },
        computed: {
            getTagList() {
                return this.$store.state.tagList
            },
            getMainPath() {
                return this.$store.state.mainPath
            },
            getNewImage() {
                if (this.tmpImg) return this.tmpImg
                else{
                    if( this.data.img.indexOf("https://")|| this.data.img.indexOf("http://"))
                        return this.data.img
                    else
                        return `${getMainPath}/${this.data.img}`
                }
            },
            getImgUrl(){
                
            }
        }
    } 
</script>

<style scoped>
</style>