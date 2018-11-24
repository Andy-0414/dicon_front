<template>
    <v-toolbar app fixed clipped-left height="65" v-if="!this.$store.state.userData" color="orange darken-4" dark>
        <v-toolbar-side-icon large @click.stop="changeShowMenu()"></v-toolbar-side-icon>
        <v-toolbar-title class="headline">{{serviceName}}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-layout align-center justify-end row fill-height>
            <Login />
            <Register />
        </v-layout>
    </v-toolbar>
    <v-toolbar app fixed clipped-left height="65" v-else color="orange darken-4" dark>
        <v-toolbar-side-icon large @click.stop="changeShowMenu()"></v-toolbar-side-icon>
        <v-toolbar-title class="headline">{{serviceName}}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-layout align-center justify-end row fill-height style="min-width:450px">
            <v-btn flat color="white" class="subheading" href="/management">대회 관리</v-btn>
            <v-btn flat color="white" class="subheading" href="/my">내 참여 대회</v-btn>
            <v-btn flat color="white" class="subheading" href="/myinfo">계정관리</v-btn>
            <v-btn flat color="orange lighten-1" class="subheading" @click.native="logout">로그아웃</v-btn>
        </v-layout>
    </v-toolbar>
</template>

<script>
    import Login from './Login.vue'
    import Register from './Register.vue'

    import axios from 'axios';

    export default {
        name: 'topBar',
        data: () => ({
            serviceName: "서비스 이름",
        }),
        components: {
            Login,
            Register
        },
        methods: {
            changeShowMenu() {
                this.$store.commit('toggleMenu')
            },
            logout() {
                axios.post(this.$store.state.mainPath + "/auth/logout")
                    .then(() => {
                        this.$store.state.userData = null
                    })
                    .catch(() => {
                        this.$store.state.userData = null
                    })
            }
        }
    }
</script>

<style scoped>
</style>