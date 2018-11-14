<template>
    <v-dialog v-model="dialog" persistent max-width="600px">
        <v-btn slot="activator" flat color="white" class="subheading">로그인</v-btn>
        <v-card>
            <v-card-title>
                <span class="headline pl-3 pt-3">로그인</span>
            </v-card-title>
            <v-card-text>
                <v-container grid-list-md @keyup.enter="login">
                    <v-flex xs12>
                        <v-text-field v-model="email" label="이메일" :rules="emailRules" required></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                        <v-text-field v-model="password" label="비밀번호" type="password" :rules="passwordRule" required></v-text-field>
                    </v-flex>
                    <v-alert :value="loginFail" color="error" icon="warning" transition="scale-transition" outline>
                        일치하지 않는 계정정보입니다.
                    </v-alert>
                    <v-alert :value="loginSucc" color="success" icon="check_circle" transition="scale-transition" outline>
                        로그인에 성공하였습니다.
                    </v-alert>
                </v-container>
            </v-card-text>
            <v-card-actions class="pb-3">
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" flat @click.native="dialog = false">취소</v-btn>
                <v-btn color="blue darken-1" flat @click.native="login" :loading="reqLoading">로그인</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    import axios from 'axios';

    export default {
        name: 'Login',
        data: () => ({
            dialog: false,
            reqLoading: false,

            loginFail: false,
            loginSucc: false,

            email: null,
            password: null,

            emailRules: [
                v => !!v || '필수로 입력해야 합니다.',
                v => /.+@.+/.test(v) || '이메일 형식에 맞지 않습니다.'
            ],
            passwordRule: [
                v => !!v || '필수로 입력해야 합니다.',
                v => (v && v.length >= 6) || '6자 이상의 비밀번호가 필요합니다.'
            ],
        }),
        methods: {
            login() {
                this.reqLoading = true;
                axios.post(this.$store.state.mainPath + "/auth/login",{
                    username : this.email,
                    password : this.password
                })
                    .then(data => {
                        this.loginFail = false
                        this.loginSucc = true

                        setTimeout(()=>{
                            this.reqLoading = false
                            this.loginFail = false
                            this.loginSucc = false

                            this.dialog = false;
                            this.$store.state.userData = data
                        },2000)
                    })
                    .catch(data => {
                        this.loginFail = true
                        this.reqLoading = false
                    })
            }
        },
        props: {
        }
    } 
</script>

<style scoped>

</style>