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
        <v-layout align-center justify-end row fill-height style="min-width:300px">
            <router-link to="/management"><v-btn flat color="white" class="subheading">대회 관리</v-btn></router-link>
            <router-link to="/my"><v-btn flat color="white" class="subheading">내 참여 대회</v-btn></router-link>
            <router-link to="/myinfo"><v-btn flat color="white" class="subheading">계정관리</v-btn></router-link>
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
                this.$store.state.showMenu = !this.$store.state.showMenu
            },
            logout() {
                axios.post(this.$store.state.mainPath + "/auth/logout")
                    .then(() => {
                        this.$store.state.userData = null
                    })
                    .catch(() => {

                    })
            }
        }
    }
</script>

<style scoped>
    a{
        text-decoration: none;
    }
</style>