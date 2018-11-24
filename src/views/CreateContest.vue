<template>
    <v-content>
        <ContestSetting :data="dataForm" isCreated />
    </v-content>
</template>

<script>
    import ContestSetting from '../components/ContestSetting.vue'

    export default {
        name: 'CreateContest',
        props: {
            id: String
        },
        data: () => ({
            dataForm: {
                "name": "",
                "img": "noneImage.png",
                "content": "",
                "date": {
                    "startDate": "",
                    "endDate": ""
                },
                "tags": [],
                "isApplicable": true,
                "link": null,
                "question": []
            }
        }),
        created: function () {
            if(!this.$store.state.userData) this.$router.push("/")
            this.$store.commit('toggleMenu', false);
            this.$store.commit('menuLock', true);
        },
        components: {
            ContestSetting
        },
        computed: {

        }
    } 
</script>