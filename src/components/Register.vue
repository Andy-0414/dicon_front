<template>
    <v-dialog v-model="dialog" persistent max-width="600px">
        <v-btn slot="activator" flat color="orange darken-1" class="">회원가입</v-btn>
        <v-card>
          <v-card-title>
            <span class="headline pl-3 pt-3">회원가입</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
                <v-flex xs12>
                  <v-text-field label="이메일" required></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field label="비밀번호" type="password" required></v-text-field>
                </v-flex>
            </v-container>
          </v-card-text>
          <v-card-actions class="pb-3">
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click.native="dialog = false">취소</v-btn>
            <v-btn color="orange darken-1" flat @click.native="dialog = false">회원가입</v-btn>
          </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        name: 'Register',
        data: ()=>({
            dialog:false
        }),
        props: {
        }
    } 
</script>

<style scoped>

</style>