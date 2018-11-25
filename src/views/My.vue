<template>
    <v-content class="backColor">
        <v-layout justify-end>
            <v-flex class="pa-3 px-5 pt-5 display-1 boldColor" xs12 lg12>
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
        created: function () {
            if (!this.$store.state.userData) this.$router.push("/")
            this.$store.commit('toggleMenu', true);
            this.$store.commit('menuLock', false);
        },
        components: {
            CompetitionBox,
        },
        computed: {
            getContestData() {
                if (this.$store.state.searchToggle) {
                    return this.$store.state.searchData.filter((item, index, array) => {
                        return item.isJoin
                    })
                }
                else {
                    return this.$store.state.contestData.filter((item, index, array) => {
                        return item.isJoin
                    })
                }
            }
        }
    } 
</script>