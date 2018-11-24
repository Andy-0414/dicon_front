<template>
    <v-content>
        <v-layout justify-start row wrap class="pa-2">
            <ManagementBox v-for="x in getContestData" :key="x.name" :data="x"/>
            <v-layout justify-center align-center>
                <v-btn large fab flat color="green" href="/management/create"><v-icon large>add_box</v-icon></v-btn>
            </v-layout>
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
        created: function(){
            this.$store.commit('toggleMenu', false);
            this.$store.commit('menuLock', true);
            //if(!this.$store.state.userData) this.$router.push("/")
        },
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