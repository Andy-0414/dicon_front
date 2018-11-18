<template>
    <v-flex d-flex xs12 sm4>
        <v-hover>
            <v-card class="pa-2 ma-3" slot-scope="{ hover }" :color='(data.isJoin ? "grey darken-2" : "")'>
                <v-img :src="data.img" aspect-ratio="1">
                    <v-expand-transition>
                        <div v-if="(hover && data.isApplicable)" class="d-flex transition-fast-in-fast-out green darken-3 title v-card--reveal white--text"
                            style="height: 30px">
                            신청가능
                        </div>
                        <div v-if="(hover && !data.isApplicable)" class="d-flex transition-fast-in-fast-out red darken-3 title v-card--reveal white--text"
                            style="height: 30px;">
                            신청불가
                        </div>
                    </v-expand-transition>
                </v-img>
                <v-card-title primary-title>
                    <h3 class="headline">{{data.name}}</h3>
                </v-card-title>
                <v-card-text>
                    <div>
                        <div class="text-truncate">{{data.content}}</div>
                        <div class="grey--text">기간</div>
                        <div>
                            <v-chip color="deep-orange lighten-3" label small v-for="x in data.tags" :key="x">
                                <span class="">
                                    {{ x }}
                                </span>
                            </v-chip>
                        </div>
                    </div>
                </v-card-text>
                <v-card-actions>
                    <v-layout align-end justify-end row fill-height>
                        <v-btn flat color="green" class="subheading" v-if="data.isJoin">신청완료</v-btn>
                        <Join :data="data" v-else/>
                    </v-layout>
                </v-card-actions>
            </v-card>
        </v-hover>
    </v-flex>
</template>

<script>
    import Join from './Join.vue'

    export default {
        name: 'CompetitionBox',
        props: {
            data: Object
        },
        components: {
            Join
        },
    } 
</script>

<style scoped>
    .v-card--reveal {
        align-items: center;
        bottom: 0;
        justify-content: center;
        opacity: .5;
        position: absolute;
        width: 100%;
    }
</style>