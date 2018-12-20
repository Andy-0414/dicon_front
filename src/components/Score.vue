<template>
    <v-dialog v-model="dialog" persistent max-width="600px">
        <v-btn slot="activator" flat color="orange" class="subheading">스코어 보드</v-btn>
        <v-card>
            <v-card-title>
                <span class="headline pl-3 pt-3 nameColor font-weight-bold">"{{data.name}}" 스코어 보드</span>
            </v-card-title>
            <v-card-text>
                <v-container grid-list-md>
                    <v-flex xs12 class="title">
                        수상자 목록
                    </v-flex>
                    <v-flex>
                        <v-data-table :items="data.winner" class="elevation-1 ma-2" hide-actions hide-headers>
                            <template slot="items" slot-scope="props">
                                <td>{{ props.item.user }}</td>
                                <td class="text-xs-right">{{ props.item.text }}</td>
                            </template>
                        </v-data-table>
                    </v-flex>
                </v-container>
            </v-card-text>
            <v-card-actions class="pb-3">
                <v-spacer></v-spacer>
                <v-btn color="deep-purple darken-4" flat @click.native="dialog = false">확인</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        name: 'Score',
        props: {
            data: Object
        },
        data: () => ({
            dialog: false,
        }),
        created: function () {
        },
        methods: {

        },
        components: {

        },
        computed: {
            getMainPath() {
                return this.$store.state.mainPath
            }
        }
    } 
</script>

<style scoped>
</style>