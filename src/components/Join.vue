<template>
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition" scrollable>
        <v-btn slot="activator" flat color="orange" class="subheading">신청</v-btn>
        <v-layout row>
            <v-flex sm12>
                <v-card color="rgba(33,33,33,0.9)">
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
                            <v-spacer></v-spacer>
                            <v-card-title class="white--text pl-5 pt-5">
                                <v-layout wrap class="pl-5 pb-5">
                                    <v-chip color="deep-orange lighten-3" label small v-for="x in data.tags" :key="x">
                                        <span class="">
                                            {{ x }}
                                        </span>
                                    </v-chip>
                                </v-layout>
                            </v-card-title>
                        </v-layout>
                    </v-img>
                    <v-layout justify-center>
                        <v-flex xs10 lg8>
                            <v-card flat v-for="i in test.q" :key="i" class="my-5 px-2 pt-3" color="rgba(0,0,0,0.0)">
                                <v-card-title class="headline">{{i}}</v-card-title>
                                <v-card-text>
                                    <v-flex xs12>
                                        <v-text-field flat solo light></v-text-field>
                                    </v-flex>
                                </v-card-text>
                            </v-card>
                        </v-flex>
                    </v-layout>
                </v-card>
            </v-flex>
        </v-layout>
    </v-dialog>
</template>

<script>
    export default {
        name: 'Join',
        props: {
            data: Object
        },
        data: () => ({
            dialog:false,
            test:{
                q: ["너의 이름은?","느그 이름은?","키미노 나와?","아무튼 이름은?"]
            }
        }),
        methods: {
            loadEvent() {
                setTimeout(() => { this.drawer = true }, 1000);
            }
        },
        computed: {
        },
    } 
</script>

<style scoped>

</style>