<template>
    <v-flex d-flex xs12 sm4>
            <v-card class="pa-2 ma-3" :color='(data.isJoin ? "grey darken-2" : "")'>
                <v-img :src="data.img" aspect-ratio="1"></v-img>
                <v-card-title primary-title>
                    <h3 class="headline">{{data.name}}</h3>
                </v-card-title>
                <v-card-text>
                    <div>
                        <div class="text-truncate">{{data.content}}</div>
                        <div class="grey--text">{{`${data.date.startDate} ~ ${data.date.endDate}`}} </div>
                        <div>
                            <v-chip label small v-for="x in data.tags" :key="x.text" :color="x.color+' lighten-3'">
                                {{ x.text }}
                            </v-chip>
                        </div>
                    </div>
                </v-card-text>
                <v-card-actions>
                    <v-layout align-end justify-end row fill-height>
                        <v-btn flat color="green" class="subheading">관리하기</v-btn>
                    </v-layout>
                </v-card-actions>
            </v-card>
    </v-flex>
</template>

<script>

    export default {
        name: 'ManagementBox',
        props: {
            data: Object
        },
        components: {

        },
    } 
</script>

<style scoped>
</style>