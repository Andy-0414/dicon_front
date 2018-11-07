<template>
    <div>
        <v-navigation-drawer
            clipped
            fixed
            v-model="drawer"
            app
            width="400"
        >
            <v-list two-line class="mx-3">
                <v-subheader class="mt-3 grey--text text--darken-5">조건</v-subheader>
                <v-list-tile>
                    <v-autocomplete
                    :items="degreeItem"
                    label="참여대상"
                    
                    ></v-autocomplete>
                </v-list-tile>
                <v-list-tile>
                    <v-select
                    :items="ableItem"
                    label="신청가능"
                    ></v-select>
                </v-list-tile>
                <v-subheader class="mt-3 grey--text text--darken-5">기한</v-subheader>
                <v-list-tile>
                    <v-menu
                        :close-on-content-click="false"
                        :nudge-right="40"
                        lazy
                        transition="scale-transition"
                        offset-y
                        full-width
                        min-width="290px"
                        >
                        <v-text-field
                        slot="activator"
                        v-model="startDate"
                        label="개최 기간 시작"
                        prepend-icon="event"
                        readonly
                        ></v-text-field>
                        <v-date-picker
                        ref="picker"
                        v-model="startDate"
                        @change="save"
                        :max="endDate"
                        ></v-date-picker>
                    </v-menu>
                </v-list-tile>
                <v-list-tile>
                    <v-menu
                        :close-on-content-click="false"
                        :nudge-right="40"
                        lazy
                        transition="scale-transition"
                        offset-y
                        full-width
                        min-width="290px"
                        >
                        <v-text-field
                        slot="activator"
                        v-model="endDate"
                        label="개최 기간 끝"
                        prepend-icon="event"
                        readonly
                        ></v-text-field>
                        <v-date-picker
                        ref="picker"
                        v-model="endDate"
                        @change="save"
                        ></v-date-picker>
                    </v-menu>
                </v-list-tile>
                <v-subheader class="mt-3 grey--text text--darken-5">검색</v-subheader>
                <v-list-tile>
                    <v-combobox
                    :items="tegList"
                    :search-input.sync="search"
                    v-model="tegs"
                    hide-selected
                    label="태그"
                    multiple
                    persistent-hint
                    small-chips
                    ></v-combobox>
                </v-list-tile>
                <v-list-tile>
                    <v-text-field
                    label="이름"
                    ></v-text-field>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>
        <v-toolbar app fixed clipped-left>
            <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
            <v-toolbar-title>서비스 이름</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-layout row align-center style="max-width: 200px">
                <Login/>
                <Register/>
            </v-layout>
        </v-toolbar>
    </div>
</template>

<script>
import Login from './Login.vue'
import Register from './Register.vue'

    export default {
        name: 'SearchBar',
        data: ()=>({
            drawer: true,
            menu: false,
            degreeItem: ['초등','중등','고등','대학','전부'],
            ableItem: ["가능","불가능"],
            search:null,
            tegList:['Vue','VueVue'],

            startDate:null,
            endDate:null,
            tegs:[]
        }),
        watch: {
            tegs (tegs) {
                if (tegs.length > 5) {
                    this.$nextTick(() => this.tegs.pop())
                }
            }
        },
        props: {
        },
        components: {
            Login,
            Register
        }
    }
</script>

<style scoped>
    hr{
        width: 80%
    }
</style>