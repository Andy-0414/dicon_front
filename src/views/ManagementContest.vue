<template>
    <v-content>
        <ContestSetting :data="getContestDataId" v-if="getContestDataId"/>
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
            if(this.getContestDataId === undefined) this.$router.push("/")
        },
        components: {
            ContestSetting
        },
        methods:{
        },
        computed: {
            getContestDataId() {
                return this.$store.state.contestData.find(x => x.id == this.id)
            }
        }
    } 
</script>