<template>
    <v-dialog v-model="dialog" persistent max-width="600px">
        <v-btn slot="activator" flat color="" class="subheading">{{this.user}}</v-btn>
        <v-card>
            <v-card-title>
                <span class="headline pl-3 pt-3 nameColor font-weight-bold">계정 관리</span>
            </v-card-title>
            <v-card-text>
                <v-form ref="form" v-model="valid" lazy-validation>
                    <v-container grid-list-md @keyup.enter="register">
                        <v-flex xs12>
                            <v-text-field prepend-icon="person" v-model="email" label="이메일 *" :rules="emailRules" required></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                            <v-text-field counter="24" prepend-icon="lock" v-model="password" label="비밀번호 *" type="password" :rules="passwordRule" loading
                                required>
                                <v-progress-linear
                                    slot="progress"
                                    :value="progress"
                                    :color="color"
                                    height="5"
                                ></v-progress-linear>
                                </v-text-field>
                        </v-flex>
                        <v-flex xs12>
                            <v-text-field v-model="phoneNumber" label="전화번호" :mask="phoneNumberMask" required></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                            <v-text-field v-model="school" label="학교" required></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                            <v-text-field v-model="age" mask="###" label="나이" suffix="살" required></v-text-field>
                        </v-flex>
                        <v-switch v-model="isAcceptance" :label="`이메일 수신 동의 여부`" color="rgb(92,49,143)"></v-switch>
                        <v-alert :value="regFail" color="error" icon="warning" transition="scale-transition">
                            {{errMsg}}
                        </v-alert>
                        <v-alert :value="regSucc" color="success" icon="check_circle" transition="scale-transition">
                            회원가입에 성공하였습니다.
                        </v-alert>
                    </v-container>
                </v-form>
            </v-card-text>
            <v-card-actions class="pb-3">
                <v-spacer></v-spacer>
                <v-btn color="red accent-4" flat @click.native="dialog = false">취소</v-btn>
                <v-btn :disabled="!valid" color="deep-purple darken-4" flat @click.native="register" :loading="reqLoading">회원가입</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    import axios from 'axios';

    export default {
        name: 'Register',
        data: () => ({
            dialog: false,
            valid: true,
            reqLoading: false,

            regFail:false,
            errMsg:"",
            regSucc:false,

            email: "",
            password: "",
            phoneNumber: null,
            school: null,
            age: null,
            isAcceptance: false,

            emailRules: [
                v => !!v || '필수로 입력해야 합니다.',
                v => /.+@.+/.test(v) || '이메일 형식에 맞지 않습니다.'
            ],
            passwordRule: [
                v => !!v || '필수로 입력해야 합니다.',
                v => (v && v.length >= 6) || '6자 이상의 비밀번호가 필요합니다.',
                v => (v && v.length <= 24) || '24자 이하의 비밀번호가 필요합니다.'
            ],
            phoneNumberMask: "###-####-####"
        }),
        methods: {
            register() {
                if (this.$refs.form.validate()) {
                    this.reqLoading = true;
                    axios.post(this.$store.state.mainPath + "/auth/register", {
                        email: this.email,
                        password: this.password,
                        phoneNumber: this.phoneNumber,
                        school: this.school,
                        age: this.age,
                        isAcceptance : this.isAcceptance
                    })
                        .then(data => {
                            this.regFail = false
                            this.regSucc = true;
                            setTimeout(() => {
                                this.valid = true
                                this.reqLoading = false
                                this.regFail = false
                                this.regSucc = false
                                
                                this.dialog = false;
                            }, 2000)
                        })
                        .catch(data => {
                            this.errMsg = data.response.data.message
                            this.regFail = true
                            this.reqLoading = false
                        })
                }
            }
        },
        computed: {
            progress () {
                return (this.password.length > 24 ? 0 :Math.min(100, this.password.length * 5))
            },
            color () {
                return (this.password.length > 24 ? "error" : ['error', 'warning', 'success','success'][Math.floor(this.progress / 30)])
            }
            
        },
        props: {
            user: String,
        }
    } 
</script>

<style scoped>

</style>