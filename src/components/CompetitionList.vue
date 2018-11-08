<template>
    <v-content>
        <v-layout justify-end>
            <v-flex xs12 lg11>
                <v-layout wrap align-start justify-start row fill-height  class="pa-3">
                    <CompetitionBox name="대회이름" content="대회내용" />
                    <CompetitionBox name="대회이름" content="대회내용" />
                    <CompetitionBox name="대회이름" content="대회내용" />
                    <CompetitionBox name="대회이름" content="대회내용" />
                    <CompetitionBox name="대회이름" content="대회내용" />
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
        components: {
            CompetitionBox
        }
    } 
</script>

<style scoped>

</style>