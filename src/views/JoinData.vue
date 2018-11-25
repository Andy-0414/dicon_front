<template>
    <v-content>
        <v-layout row wrap>
            <v-flex sm12 md4 lg3>
                <v-card class="pa-2 ma-3">
                    <v-data-table :items="joinData" class="elevation-1" item-key="email" hide-actions hide-headers>
                        <template slot="items" slot-scope="props">
                            <tr @click="currentUser = props.item">
                                <td class="title">{{ props.item.email }}</td>
                            </tr>
                        </template>
                    </v-data-table>
                </v-card>
            </v-flex>
            <v-flex>
                <v-card class="pa-3 ma-3" color="rgba(0,0,0,0.1)" v-if="currentUser">
                    <v-card v-if="getContestData" flat v-for="(i,index) in getContestData.question" :key="i.label" class="pa-2 ma-3" color="rgba(0,0,0,0.1)">
                        <v-card-title class="title">{{i.label}}</v-card-title>
                        <v-card-text>{{currentUser.answer[index]}}</v-card-text>
                    </v-card>
                </v-card>
            </v-flex>
        </v-layout>
    </v-content>
</template>

<script>
    import axios from 'axios';

    export default {
        name: 'JoinData',
        props: {
            id: String
        },
        data: () => ({
            joinData: [],
            currentUser: null,
        }),
        created: function () {
            this.getJoinData()
            this.$store.commit('toggleMenu', false);
            this.$store.commit('menuLock', true);
        },
        components: {
        },
        methods: {
            getJoinData() {
                axios(this.$store.state.mainPath + "/join/getJoinData", {
                    method: "post",
                    data: { id: this.id }
                })
                    .then(data => {
                        this.joinData = data.data
                    })
                    .catch(err => {
                        this.joinData = []
                    })
            }
        },
        computed: {
            getContestData() {
                return this.$store.state.contestData.find(x => x.id == this.id)
            },
        }
    } 
</script>