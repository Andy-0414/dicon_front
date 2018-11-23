<template>
    <v-content>
        <v-layout justify-start row wrap class="pa-5">
            <ManagementBox v-for="x in getContestData" :key="x.name" :data="x"/>
        </v-layout>
    </v-content>
</template>

<script>
    import ManagementBox from '../components/ManagementBox.vue'
    export default {
        name: 'Management',
        props: {
        },
        data: () => ({

        }),
        components: {
            ManagementBox
        },
        computed: {
            getContestData() {
                return this.$store.state.contestData
            }
        }
    } 
</script>