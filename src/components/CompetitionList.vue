<template>
    <v-content>
        <v-layout justify-end>
            <v-flex class="pa-4 pt-5 blue--text headline" xs12 lg11>
                참여 가능한 대회
                <v-divider></v-divider>
            </v-flex>
        </v-layout>
        <v-layout justify-end>
            <v-flex xs12 lg11>
                <v-layout wrap align-start justify-start row fill-height  class="pa-3">
                    <CompetitionBox v-for="x in info" :key="x" :data="x"/>
                </v-layout>
            </v-flex>
        </v-layout>
    </v-content>
</template>

<script>
    import CompetitionBox from './CompetitionBox.vue'
    export default {
        name: 'CompetitionList',
        props: {
        },
        data: ()=>({
            info:[
                {
                    name:"선린톤",
                    img:"http://sunr.in/static/media/desk.f86c603c.png",
                    content:"선린 해커톤"
                },
                {
                    name:"앱잼",
                    img:"https://scontent-icn1-1.xx.fbcdn.net/v/t1.0-9/38476985_2135733006747577_7496676737254686720_n.png?_nc_cat=105&_nc_ht=scontent-icn1-1.xx&oh=d0bf137dfd856f682eb46d6a0d069137&oe=5C71F520",
                    content:"해커톤"
                },
                {
                    name:"선린톤",
                    img:"http://sunr.in/static/media/desk.f86c603c.png",
                    content:"선린 해커톤"
                },
                {
                    name:"앱잼",
                    img:"https://scontent-icn1-1.xx.fbcdn.net/v/t1.0-9/38476985_2135733006747577_7496676737254686720_n.png?_nc_cat=105&_nc_ht=scontent-icn1-1.xx&oh=d0bf137dfd856f682eb46d6a0d069137&oe=5C71F520",
                    content:"해커톤"
                },
                {
                    name:"선린톤",
                    img:"http://sunr.in/static/media/desk.f86c603c.png",
                    content:"선린 해커톤"
                },
                {
                    name:"앱잼",
                    img:"https://scontent-icn1-1.xx.fbcdn.net/v/t1.0-9/38476985_2135733006747577_7496676737254686720_n.png?_nc_cat=105&_nc_ht=scontent-icn1-1.xx&oh=d0bf137dfd856f682eb46d6a0d069137&oe=5C71F520",
                    content:"해커톤"
                }
            ]
        }),
        components: {
            CompetitionBox
        }
    } 
</script>

<style scoped>

</style>