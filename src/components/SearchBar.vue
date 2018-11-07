<template>
    <div>
        <v-navigation-drawer
            clipped
            fixed
            v-model="drawer"
            app
        >
        <v-layout row wrap>
            <v-flex xs12 sm6 md10>
                <v-select
                :items="items"
                label="참여대상"
                ></v-select>
            </v-flex>
            <v-flex xs12 sm6 md10>
                <v-select
                :items="items"
                label="신청가능"
                ></v-select>
            </v-flex>
            <v-date-picker :landscape="false" :reactive="false" type="month"></v-date-picker>
        </v-layout>
        </v-navigation-drawer>
        <v-toolbar app fixed clipped-left>
            <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
            <v-toolbar-title>서비스 이름</v-toolbar-title>
        </v-toolbar>
    </div>
</template>

<script>
    export default {
        name: 'SearchBar',
        data: ()=>({
            drawer: true,
            items: ['data1','data2','data3']
        }),
        props: {
        }
    }
</script>

<style scoped>
</style>