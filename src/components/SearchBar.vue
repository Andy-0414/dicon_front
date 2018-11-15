<template>
        <v-navigation-drawer clipped fixed app width="350" :value="getShowMenu">
            <v-list two-line class="mx-2">
                <v-subheader class="title mt-3 grey--text text--darken-5">조건</v-subheader>
                <v-list-tile>
                    <v-select v-model="selectDegree" :items="degreeItem" label="참여대상" multiple nudge-right="300">
                    </v-select>
                </v-list-tile>
                <v-list-tile>
                    <v-select :items="ableItem" label="신청 여부"></v-select>
                </v-list-tile>
                <v-subheader class="title mt-5 grey--text text--darken-5">기한</v-subheader>
                <v-list-tile>
                    <v-menu :close-on-content-click="false" :nudge-right="200" lazy transition="scale-transition"
                        offset-y full-width min-width="290px">
                        <v-text-field slot="activator" v-model="startDate" label="시작 날짜" prepend-icon="event" readonly></v-text-field>
                        <v-date-picker ref="picker" v-model="startDate" @change="saveDate" :max="endDate"></v-date-picker>
                    </v-menu>
                </v-list-tile>
                <v-list-tile>
                    <v-menu :close-on-content-click="false" :nudge-right="200" lazy transition="scale-transition"
                        offset-y full-width min-width="290px">
                        <v-text-field slot="activator" v-model="endDate" label="끝 날짜" prepend-icon="event" readonly></v-text-field>
                        <v-date-picker ref="picker" v-model="endDate" @change="saveDate"></v-date-picker>
                    </v-menu>
                </v-list-tile>
                <v-subheader class="title mt-5 grey--text text--darken-5">검색</v-subheader>
                <v-list-tile>
                    <v-combobox :items="tegList" :search-input.sync="search" v-model="tegs" hide-selected label="태그"
                        multiple persistent-hint small-chips>
                        <template slot="selection" slot-scope="{ item, parent, selected }">
                            <v-chip color="deep-orange lighten-3" label small>
                                <span class="">
                                    {{ item }}
                                </span>
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
            tegList: ['교내대회', '태그1','태그2'],

            selectDegree:[],
            startDate: null,
            endDate: null,
            tegs: []
        }),
        watch: {
            tegs(tegs) {
                if (tegs.length > 5) {
                    this.$nextTick(() => this.tegs.pop())
                }
            }
        },
        methods:{
            saveDate(data){

            }
        },
        props: {
        },
        computed: {
            getShowMenu(){
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