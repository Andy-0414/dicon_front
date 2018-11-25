<template>
    <v-navigation-drawer clipped fixed app width="350" :value="getShowMenu" disable-resize-watcher>
        <v-list two-line class="mx-2">
            <v-subheader class="title mt-3 grey--text text--darken-5">조건</v-subheader>
            <v-list-tile>
                <v-select v-model="searchDegree" :items="degreeItem" label="참여대상" multiple :menu-props="{nudgeRight:'300'}" @change="searchData">
                </v-select>
            </v-list-tile>
            <v-list-tile>
                <v-switch v-model="searchApplicable" label="신청여부" @change="searchData"></v-switch>
            </v-list-tile>
            <v-subheader class="title mt-5 grey--text text--darken-5">기한</v-subheader>
            <v-list-tile>
                <v-menu :close-on-content-click="false" :nudge-right="200" lazy transition="scale-transition" offset-y
                    full-width min-width="290px">
                    <v-text-field slot="activator" v-model="searchStartDate" label="시작 날짜" prepend-icon="event"
                        readonly></v-text-field>
                    <v-date-picker ref="picker" v-model="searchStartDate" @change="searchData" :max="searchEndDate"></v-date-picker>
                </v-menu>
            </v-list-tile>
            <v-list-tile>
                <v-menu :close-on-content-click="false" :nudge-right="200" lazy transition="scale-transition" offset-y
                    full-width min-width="290px">
                    <v-text-field slot="activator" v-model="searchEndDate" label="끝 날짜" prepend-icon="event" readonly></v-text-field>
                    <v-date-picker ref="picker" v-model="searchEndDate" @change="searchData" :min="searchStartDate"></v-date-picker>
                </v-menu>
            </v-list-tile>
            <v-subheader class="title mt-5 grey--text text--darken-5">검색</v-subheader>
            <v-list-tile>
                <v-combobox :items="getTagList" :search-input.sync="search" v-model="searchTags" hide-selected label="태그"
                    multiple small-chips :menu-props="{nudgeRight:'300'}" @change="searchData">
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
            </v-list-tile>
            <v-list-tile>
                <v-text-field v-model="searchString" label="이름" @change="searchData"></v-text-field>
            </v-list-tile>
            <v-list-tile>
                <v-btn flat block @click="clearSearch">초기화</v-btn>
            </v-list-tile>
        </v-list>
    </v-navigation-drawer>
</template>

<script>


    export default {
        name: 'SearchBar',
        data: () => ({
            //drawer:true,
            menu: false,
            degreeItem: ['초등', '중등', '고등', '대학'],
            search: null,

            searchDegree: [],
            searchApplicable: true,
            searchStartDate: null,
            searchEndDate: null,
            searchTags: [],
            searchString: null,
        }),
        watch: {
            searchTags(searchTags, prev) {
                if (searchTags.length === prev.length) return
                if (searchTags.length > 6) {
                    this.$nextTick(() => this.searchTags.pop())
                }
                this.searchTags = searchTags.map(v => {
                    var isString = typeof v === 'string'
                    if (isString) {
                        var obj = this.getTagList.find(x=>x.text == v)
                        if(!(obj === undefined)) return obj
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
            searchData() {
                this.$store.state.searchToggle = true
                this.$store.state.searchData = this.$store.state.contestData.filter((item, index, array) =>{
                    return (item.name.indexOf(this.searchString) != -1 || !this.searchString)
                })
                this.$store.state.searchData = this.$store.state.searchData.filter((item, index, array) =>{
                    var count;
                    this.searchTags.forEach(x=>{
                        count =(item.tags.findIndex(_x=>{
                            return (_x.text == x.text || _x.text == x)
                        }) != -1 ? 1 : -1)
                    })
                    return (count != -1)
                })
                this.$store.state.searchData = this.$store.state.searchData.filter((item, index, array) =>{
                    var count;
                    this.searchDegree.forEach(x=>{
                        count =(item.tags.findIndex(_x=>{
                            return _x.text == x
                        }) != -1 ? 1 : -1)
                    })
                    return (count != -1)
                })
                this.$store.state.searchData = this.$store.state.searchData.filter((item, index, array) =>{
                    if(this.searchStartDate)
                        return new Date(this.searchStartDate).getTime() <= new Date(item.date.startDate).getTime()
                    else
                        return true
                })
                this.$store.state.searchData = this.$store.state.searchData.filter((item, index, array) =>{
                    if(this.searchEndDate)
                        return new Date(this.searchEndDate).getTime() >= new Date(item.date.endDate).getTime()
                    else
                        return true
                })
            },
            clearSearch(){
                this.$store.state.searchToggle = false
                this.searchDegree = []
                this.searchStartDate = null
                this.searchEndDate = null
                this.searchTags = []
                this.searchString = null
            }
        },
        props: {
        },
        computed: {
            getShowMenu() {
                return this.$store.state.showMenu
            },
            getTagList() {
                return this.$store.state.tagList
            }
        },
    }
</script>

<style scoped>
    hr {
        width: 80%
    }
</style>