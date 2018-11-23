<template>
    <v-content>
        <ContestSetting :data="getContestDataId" />
    </v-content>
</template>

<script>
    import ContestSetting from '../components/ContestSetting.vue'

    export default {
        name: 'ManagementContest',
        props: {
            id: String
        },
        data: () => ({
            data: null
        }),
        created: function () {
            this.$store.commit('toggleMenu', false);
            this.$store.commit('menuLock', true);
        },
        components: {
            ContestSetting
        },
        computed: {
            getContestDataId() {
                return this.$store.state.contestData.find(x => x.id == this.id)
            }
        }
    } 
</script>