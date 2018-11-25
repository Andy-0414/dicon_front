<template>
    <v-content>
        <v-layout justify-start align-center row wrap class="pa-2">
            <ManagementBox v-for="x in getContestData" :key="x.name" :data="x" />
            <v-flex d-flex xs12 sm3>
                <router-link to="/management/create">
                    <v-card class="pa-2 ma-3" ripple color="rgba(0,0,0,0.2)">
                        <v-responsive :aspect-ratio="1">
                            <v-layout justify-center align-center fill-height>
                                <v-icon large color="green">add_box</v-icon>
                            </v-layout>
                        </v-responsive>
                    </v-card>
                </router-link>
            </v-flex>
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
        created: function () {
            if(!this.$store.state.userData) this.$router.push("/")
            this.$store.commit('toggleMenu', false);
            this.$store.commit('menuLock', true);
            this.$store.dispatch('getUser')
        },
        components: {
            ManagementBox
        },
        computed: {
            getContestData() {
                return this.$store.state.contestData.filter((item, index, array) => {
                    if (this.$store.state.userData)
                        return (this.$store.state.userData.ownerContest.indexOf(item.id) != -1)
                    else
                        return []
                })
            }
        }
    } 
</script>