<template>
    <v-content class="backColor">
        <v-layout justify-end>
            <v-flex class="pa-3 px-5 pt-5 display-1 boldColor" xs12 lg12>
                참여 가능한 대회
                <v-divider></v-divider>
            </v-flex>
        </v-layout>
        <v-layout justify-end>
            <v-flex xs12 lg9>
                <v-container>
                    <v-layout row wrap>
                        <v-flex xs12 sm4>
                            <CompetitionBox v-for="(x,i) in getDataA()" :key="x.name+i" :data="x" />
                        </v-flex>
                        <v-flex xs12 sm4>
                            <CompetitionBox v-for="(x,i) in getDataB()" :key="x.name+i" :data="x" />
                        </v-flex>
                        <v-flex xs12 sm4>
                            <CompetitionBox v-for="(x,i) in getDataC()" :key="x.name+i" :data="x" />
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-flex>
        </v-layout>
    </v-content>
</template>

<script>
    import CompetitionBox from '../components/CompetitionBox.vue'

    export default {
        name: 'Home',
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
        methods: {
            getDataA(){
                return this.getContestData.filter((e,i)=>{
                    return i%3 == 0;
                })
            },
            getDataB(){
                return this.getContestData.filter((e,i)=>{
                    return i%3 == 1;
                })
            },
            getDataC(){
                return this.getContestData.filter((e,i)=>{
                    return i%3 == 2;
                })
            }
        },
        computed: {
            getContestData() {
                if(this.$store.state.searchToggle)
                    return this.$store.state.searchData
                else
                    return this.$store.state.contestData
            }
        }
    } 
</script>