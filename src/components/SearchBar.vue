<template>
    <v-navigation-drawer clipped fixed app width="350" :value="getShowMenu">
        <v-list two-line class="mx-2">
            <v-subheader class="title mt-3 grey--text text--darken-5">조건</v-subheader>
            <v-list-tile>
                <v-select v-model="searchDegree" :items="degreeItem" label="참여대상" multiple :menu-props="{nudgeRight:'300'}">
                </v-select>
            </v-list-tile>
            <v-list-tile>
                <v-select :items="ableItem" label="신청 여부"></v-select>
            </v-list-tile>
            <v-subheader class="title mt-5 grey--text text--darken-5">기한</v-subheader>
            <v-list-tile>
                <v-menu :close-on-content-click="false" :nudge-right="200" lazy transition="scale-transition" offset-y
                    full-width min-width="290px">
                    <v-text-field slot="activator" v-model="searchStartDate" label="시작 날짜" prepend-icon="event"
                        readonly></v-text-field>
                    <v-date-picker ref="picker" v-model="searchStartDate" @change="saveDate" :max="searchEndDate"></v-date-picker>
                </v-menu>
            </v-list-tile>
            <v-list-tile>
                <v-menu :close-on-content-click="false" :nudge-right="200" lazy transition="scale-transition" offset-y
                    full-width min-width="290px">
                    <v-text-field slot="activator" v-model="searchEndDate" label="끝 날짜" prepend-icon="event" readonly></v-text-field>
                    <v-date-picker ref="picker" v-model="searchEndDate" @change="saveDate"></v-date-picker>
                </v-menu>
            </v-list-tile>
            <v-subheader class="title mt-5 grey--text text--darken-5">검색</v-subheader>
            <v-list-tile>
                <v-combobox :items="tagList" :search-input.sync="search" v-model="tags" hide-selected label="태그"
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
            </v-list-tile>
            <v-list-tile>
                <v-text-field label="이름"></v-text-field>
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
            ableItem: ["가능", "불가능"],
            search: null,
            tagList: [
                {
                    "color": "red",
                    "text": "고등"
                },
                {
                    "color": "orange",
                    "text": "해커톤"
                },
                {
                    "color": "orange",
                    "text": "교내대회"
                }
            ],

            searchDegree: [],
            searchStartDate: null,
            searchEndDate: null,
            tags: []
        }),
        watch: {
            tags(tags, prev) {
                if (tags.length === prev.length) return
                if (tags.length > 6) {
                    this.$nextTick(() => this.tags.pop())
                }
                this.tags = tags.map(v => {
                    if (typeof v === 'string') {
                        v = {
                            text: v,
                            color: "grey"
                        }
                        this.tagList.push(v)
                    }
                    return v
                })
                console.log(tags)
            }
        },
        methods: {
            saveDate(data) {

            }
        },
        props: {
        },
        computed: {
            getShowMenu() {
                return this.$store.state.showMenu
            }
        },
    }
</script>

<style scoped>
    hr {
        width: 80%
    }
</style>