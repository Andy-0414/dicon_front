<template>
    <v-layout row wrap>
        <v-flex sm12 md4 lg3>
            <v-card class="pa-2 ma-3">
                <v-img :src="data.img" aspect-ratio="1" />
                <v-card-title primary-title>
                    <v-text-field class="headline" v-model="data.name"></v-text-field>
                </v-card-title>
                <v-card-text>
                    <div>
                        <v-text-field class="text-truncate" v-model="data.content"></v-text-field>
                        <v-menu :close-on-content-click="false" :nudge-right="200" lazy transition="scale-transition"
                            offset-y full-width min-width="290px">
                            <v-text-field slot="activator" v-model="data.date.startDate" label="시작 날짜" prepend-icon="event"
                                readonly></v-text-field>
                            <v-date-picker ref="picker" v-model="data.date.startDate" :max="data.endDate"></v-date-picker>
                        </v-menu>
                        <v-menu :close-on-content-click="false" :nudge-right="200" lazy transition="scale-transition"
                            offset-y full-width min-width="290px">
                            <v-text-field slot="activator" v-model="data.date.endDate" label="끝 날짜" prepend-icon="event"
                                readonly></v-text-field>
                            <v-date-picker ref="picker" v-model="data.date.endDate"></v-date-picker>
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
                    </div>
                    <v-btn flat block color="green" class="headline" @click="sendServer()">저장</v-btn>
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
                                <v-form ref="form" v-model="valid" lazy-validation>
                                    <v-layout align-center justify-center row fill-height>
                                        <v-flex xs10>
                                            <v-select v-model="type" :items="typeList" placeholder="유형" :rules="notDataRule"
                                                required />
                                        </v-flex>
                                    </v-layout>
                                </v-form>
                            </v-card-text>
                            <v-card-actions class="pb-3">
                                <v-spacer></v-spacer>
                                <v-btn color="red" flat @click.native="dialog = false">취소</v-btn>
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

    export default {
        name: 'ContestSetting',
        props: {
            data: Object
        },
        data: () => ({
            dialog: false,
            valid: true,

            search: null,
            type: null,

            tags: [],

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
            deleteList(index) {
                this.data.question.splice(index, 1)
            },
            createList(type) {
                if (this.$refs.form.validate()) {
                    this.data.question.push({
                        type: type,
                        label: null,
                        data: [],
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
                console.log(this.data)
            }
        },
        computed: {
            getTagList() {
                return this.$store.state.tagList
            }
        }
    } 
</script>

<style scoped>
</style>