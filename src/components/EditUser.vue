<template>
    <v-dialog v-model="dialog" persistent max-width="600px">
        <v-btn slot="activator" flat color="" class="subheading">{{this.user}}</v-btn>
        <v-card>
            <v-card-title>
                <span class="headline pl-3 pt-3 nameColor font-weight-bold">계정 관리</span>
            </v-card-title>
            <v-card-text>
                <v-form ref="form" v-model="valid" lazy-validation>
                    <v-container grid-list-md @keyup.enter="save">
                        <v-flex xs12 class="mb-3">
                            <span class="title pl-2 nameColor font-weight-bold">
                                <v-avatar size="60" color="grey lighten-4" class="ma-2"><v-img :src="getMainPath+'/noneImage.png'" aspect-ratio="1" /></v-avatar>
                                {{this.$store.state.userData.email}}
                            </span>
                        </v-flex>
                        <v-flex xs12>
                            <v-text-field v-model="phoneNumber" label="전화번호" :mask="phoneNumberMask" persistent-hint :hint="this.$store.state.userData.phoneNumber != phoneNumber ? '변경됨':''" required></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                            <v-text-field v-model="school" label="학교" persistent-hint :hint="this.$store.state.userData.school != school ? '변경됨':''" required></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                            <v-text-field v-model="age" mask="###" label="나이" suffix="살" persistent-hint :hint="this.$store.state.userData.age != age ? '변경됨':''" required></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                            <v-text-field v-model="cPassword" type="password" prepend-icon="lock" label="현재 비밀번호" color="success" required></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                            <transition name="fade">
                            <v-text-field class="smooth" v-if="cPassword.length >= 6" counter="24" prepend-icon="lock" v-model="nPassword" label="새 비밀번호" type="password" :rules="passwordRule" loading
                                required>
                                <v-progress-linear
                                    slot="progress"
                                    :value="progress"
                                    :color="color"
                                    height="5"
                                ></v-progress-linear>
                                </v-text-field>
                            </transition>
                        </v-flex>
                        <v-switch v-model="isAcceptance" :label="`이메일 수신 동의 여부`" persistent-hint :hint="this.$store.state.userData.isAcceptance != isAcceptance ? '변경됨':''" color="rgb(92,49,143)"></v-switch>
                        <v-alert :value="regFail" color="error" icon="warning" transition="scale-transition">
                            {{errMsg}}
                        </v-alert>
                        <v-alert :value="regSucc" color="success" icon="check_circle" transition="scale-transition">
                            계정 정보를 수정하였습니다.
                        </v-alert>
                    </v-container>
                </v-form>
            </v-card-text>
            <v-card-actions class="pb-3">
                <v-spacer></v-spacer>
                <v-btn color="red accent-4" flat @click.native="close">닫기</v-btn>
                <v-btn :disabled="!valid" color="deep-purple darken-4" @click.native="save" flat>저장</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    import axios from 'axios';

    export default {
        name: 'EditUser',
        data: () => ({
            dialog: false,
            valid: true,
            reqLoading: false,

            regFail:false,
            errMsg:"",
            regSucc:false,

            phoneNumber:"",
            school:"",
            age:"",
            isAcceptance:false,

            cPassword:"",
            nPassword:"",

            passwordRule: [
                v => !!v || '필수로 입력해야 합니다.',
                v => (v && v.length >= 6) || '6자 이상의 비밀번호가 필요합니다.',
                v => (v && v.length <= 24) || '24자 이하의 비밀번호가 필요합니다.'
            ],
            phoneNumberMask: "###-####-####"
        }),
        created:function(){
            this.phoneNumber = this.$store.state.userData.phoneNumber
            this.school = this.$store.state.userData.school
            this.age = this.$store.state.userData.age
            this.isAcceptance = this.$store.state.userData.isAcceptance
        },
        methods: {
            save() {
                if (this.$refs.form.validate()) {
                    this.reqLoading = true;
                    axios.post(this.$store.state.mainPath + "/auth/update", {
                        phoneNumber: this.phoneNumber,
                        school: this.school,
                        age: this.age,
                        isAcceptance : this.isAcceptance,
                        cPassword : this.cPassword,
                        nPassword : this.nPassword,
                    })
                        .then(data => {
                            this.$store.state.userData = data.data

                            this.cPassword = ""
                            this.nPassword = ""

                            this.regFail = false
                            this.regSucc = true;
                            setTimeout(() => {
                                this.reqLoading = false
                                this.regFail = false
                                this.regSucc = false
                            }, 2000)
                        })
                        .catch(data => {
                            this.errMsg = data.response.data.message
                            this.regFail = true
                            this.reqLoading = false
                        })
                }
            },
            close(){
                this.dialog = false
                this.cPassword = ""
                this.nPassword = ""
            }
        },
        computed: {
            getMainPath() {
                return this.$store.state.mainPath
            },
            progress () {
                return (this.nPassword.length > 24 ? 0 :Math.min(100, this.nPassword.length * 5))
            },
            color () {
                return (this.nPassword.length > 24 ? "error" : ['error', 'warning', 'success','success'][Math.floor(this.progress / 30)])
            }
            
        },
        props: {
            user: String,
        }
    } 
</script>

<style scoped>
.smooth{
    transition: 1s;
    height: 70px;
}
.fade-enter /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
    height: 0;
}
.fade-leave-to{
    opacity: 0;
    height: 0;
}
</style>