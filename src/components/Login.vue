<template>
    <v-dialog v-model="dialog" persistent max-width="600px">
        <v-btn slot="activator" flat color="white" class="subheading">로그인</v-btn>
        <v-card>
            <v-card-title>
                <span class="headline pl-3 pt-3">로그인</span>
            </v-card-title>
            <v-card-text>
                <v-form ref="form" v-model="valid" lazy-validation>
                    <v-container grid-list-md @keyup.enter="login">
                        <v-flex xs12>
                            <v-text-field prepend-icon="person" v-model="email" label="이메일" :rules="emailRules" name="email" required></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                            <v-text-field prepend-icon="lock" v-model="password" label="비밀번호" type="password" :rules="passwordRule" name="password"
                                required></v-text-field>
                        </v-flex>
                        <v-alert :value="loginFail" color="error" icon="warning" transition="scale-transition" outline>
                            로그인에 실패하였습니다.
                        </v-alert>
                        <v-alert :value="loginSucc" color="success" icon="check_circle" transition="scale-transition"
                            outline>
                            로그인에 성공하였습니다.
                        </v-alert>
                    </v-container>
                </v-form>
            </v-card-text>
            <v-card-actions class="pb-3">
                <v-spacer></v-spacer>
                <v-btn color="red darken-1" flat @click.native="dialog = false">취소</v-btn>
                <v-btn :disabled="!valid" color="orange darken-1" flat @click.native="login" :loading="reqLoading">로그인</v-btn>
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
            valid: true,
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
                if (this.$refs.form.validate()) {
                    this.reqLoading = true;
                    axios.post(this.$store.state.mainPath + "/auth/login", {
                        username: this.email,
                        password: this.password
                    })
                        .then(data => {
                            this.loginFail = false
                            this.loginSucc = true

                            setTimeout(() => {
                                this.$store.state.userData = data.data
                                this.$store.dispatch('getContest')
                                
                                this.reqLoading = false
                                this.loginFail = false
                                this.loginSucc = false

                                this.dialog = false;

                            }, 2000)
                        })
                        .catch(data => {
                            this.loginFail = true
                            this.reqLoading = false
                        })
                }
            },
        },
        props: {
        }
    } 
</script>

<style scoped>

</style>