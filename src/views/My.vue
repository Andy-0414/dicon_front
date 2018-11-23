<template>
    <v-content>
        <v-layout justify-end>
            <v-flex class="pa-3 px-5 pt-5 orange--text display-1" xs12 lg12>
                참여한 대회
                <v-divider></v-divider>
            </v-flex>
        </v-layout>
        <v-layout justify-end>
            <v-flex xs12 lg9>
                <v-container>
                    <v-layout row wrap>
                        <CompetitionBox v-for="x in getContestData" :key="x.name" :data="x" />
                    </v-layout>
                </v-container>
            </v-flex>
        </v-layout>
    </v-content>
</template>

<script>
    import CompetitionBox from '../components/CompetitionBox.vue'

     export default {
        name: 'My',
        props: {
        },
        data: () => ({

        }),
        created: function (){
            this.$store.commit('toggleMenu',true);
            this.$store.commit('menuLock',false);
        },
        components: {
            CompetitionBox,
        },
        computed: {
            getContestData() {
                return this.$store.state.contestData.filter((item, index, array) =>{
                    return item.isJoin
                })
            }
        }
    } 
</script>