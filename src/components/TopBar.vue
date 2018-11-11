<template>
        <v-toolbar app fixed clipped-left height="65" v-if="!isLogin">
            <v-toolbar-side-icon large @click.stop="changeShowMenu()"></v-toolbar-side-icon>
            <v-toolbar-title class="headline">{{serviceName}}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-layout row align-center style="max-width: 220px">
                <Login />
                <Register />
            </v-layout>
        </v-toolbar>
        <v-toolbar app fixed clipped-left height="65" v-else>
            <v-toolbar-side-icon large @click.stop="changeShowMenu()"></v-toolbar-side-icon>
            <v-toolbar-title class="headline">{{serviceName}}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-layout row align-center style="max-width: 350px">
                <v-btn flat color="white" class="subheading">내 참여 대회</v-btn>
                <v-btn flat color="white" class="subheading">계정관리</v-btn>
                <v-btn flat color="orange" class="subheading">로그아웃</v-btn>
            </v-layout>
        </v-toolbar>
</template>

<script>
    export default {
        name: 'topBar',
        data: () => ({
            isLogin: true,
            serviceName: "서비스 이름",
        }),
        methods: {
            changeShowMenu(){
                this.$store.state.showMenu = !this.$store.state.showMenu
            }
        }
    }
</script>

<style scoped>
</style>