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
        <v-layout align-center justify-end row fill-height>
            <v-avatar size="40" color="grey lighten-4" class="ma-2"><v-img :src="getMainPath+'/noneImage.png'" aspect-ratio="1" /></v-avatar>
            <div class="subheading">{{this.$store.state.userData.email}}</div>
            <v-menu offset-y>
                <v-btn slot="activator" dark icon large>
                    <v-icon>more_vert</v-icon>
                </v-btn>
                <v-card style="max-width:150px;">
                    <v-layout align-center justify-end row wrap fill-height>
                        <v-flex xs12>
                            <router-link to="/management">
                                <v-btn flat color="white" class="subheading" block>대회 관리</v-btn>
                            </router-link>
                        </v-flex>
                        <v-flex xs12>
                            <router-link to="/my">
                                <v-btn flat color="white" class="subheading" block>내 참여 대회</v-btn>
                            </router-link>
                        </v-flex>
                        <v-flex xs12>
                            <router-link to="/myinfo">
                                <v-btn flat color="white" class="subheading" block>계정관리</v-btn>
                            </router-link>
                        </v-flex>
                        <v-flex xs12>
                            <v-btn flat color="orange lighten-1" class="subheading" @click.native="logout" block>로그아웃</v-btn>
                        </v-flex>
                    </v-layout>
                </v-card>
            </v-menu>
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
            serviceName: "Cont_out",
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
                        this.$store.dispatch('getContest')
                        this.$store.state.userData = null
                        this.$router.push("/")
                    })
                    .catch(() => {
                        this.$store.dispatch('getContest')
                        this.$store.state.userData = null
                        this.$router.push("/")
                    })
            }
        },
        computed: {
            getMainPath() {
                return this.$store.state.mainPath
            }
        }
    }
</script>

<style scoped>
</style>