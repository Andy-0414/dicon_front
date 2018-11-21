<template>
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition" scrollable>
        <v-btn slot="activator" flat color="orange" class="subheading">신청</v-btn>
        <v-card color="rgba(33,33,33,0.9)">
            <v-card-text class="ma-0 pa-0 scroll-y">
                <v-img :src="data.img" aspect-ratio="3" gradient="to right, rgba(21,21,21,1), rgba(0,0,0,.5)">
                    <v-layout column fill-height>
                        <v-layout justify-end>
                            <v-btn icon dark @click="dialog = false" large>
                                <v-icon large>close</v-icon>
                            </v-btn>
                        </v-layout>
                        <v-card-title class="white--text pl-5">
                            <div class="display-3 px-5 pt-5">{{data.name}}</div>
                        </v-card-title>
                        <v-card-title class="white--text pl-5">
                            <div>
                                <div class="grey--text px-5">
                                    {{`${data.date.startDate} ~ ${data.date.endDate}`}}
                                </div>
                                <div class="white--text py-1 px-5">
                                    {{data.content}}
                                </div>
                            </div>
                        </v-card-title>
                        <v-spacer></v-spacer>
                        <v-card-title class="white--text pl-5 pt-5">
                            <v-layout wrap class="pl-5 pb-5">
                                <v-chip label small v-for="x in data.tags" :key="x.tag" :color="x.color+' lighten-3'">
                                    {{ x.tag }}
                                </v-chip>
                            </v-layout>
                        </v-card-title>
                    </v-layout>
                </v-img>
                <v-layout justify-center>
                    <v-flex xs10 lg8>
                        <v-card flat v-for="(i,index) in data.question" :key="i.label" class="my-5 px-2 pt-2" color="rgba(0,0,0,0.0)">
                            <v-card-title class="headline">{{i.label}}</v-card-title>
                            <v-card-text>
                                <v-flex xs12>
                                    <v-select attach v-if="i.type == 'select'" :items="i.data" solo v-model="inData[index]" />
                                    <v-select attach v-else-if="i.type == 'checkbox'" :items="i.data" multiple v-model="inData[index]" />
                                    <v-text-field v-else-if="i.type == 'text'" flat solo v-model="inData[index]" />
                                    <v-switch v-else-if="i.type == 'switch'" v-model="inData[index]" />
                                </v-flex>
                            </v-card-text>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        name: 'Join',
        props: {
            data: Object
        },
        data: () => ({
            dialog: false,
            inData: [],
        }),
        methods: {
            getLabel(data) {
                return data.map(x => {
                    return x.label
                })
            },
        },
        watch: {
            inData(d) {
                console.log(d)
            }
        },
        computed: {
        },
    } 
</script>

<style scoped>
</style>