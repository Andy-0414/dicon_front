<template>
    <v-content>
        <v-layout justify-end>
            <v-flex class="pa-3 px-5 pt-5 orange--text display-1" xs12 lg12>
                참여 가능한 대회
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
    //import SearchBar from '../components/SearchBar.vue'
    import CompetitionBox from '../components/CompetitionBox.vue'

    export default {
        props: {
        },
        data: () => ({

        }),
        components: {
            CompetitionBox,
            //SearchBar
        },
        computed: {
            getContestData() {
                return this.$store.state.contestData
            }
        }
    } 
</script>