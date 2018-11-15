<template>
    <v-content>
        <v-layout justify-end>
            <v-flex class="pa-3 px-5 pt-5 blue--text display-1" xs12 lg12>
                참여 가능한 대회
                <v-divider></v-divider>
            </v-flex>
        </v-layout>
        <v-layout justify-end>
            <v-flex xs12 lg9>
                <v-container>
                    <v-layout row wrap>
                        <CompetitionBox v-for="x in info" :key="x.name" :data="x" />
                    </v-layout>
                </v-container>
            </v-flex>
        </v-layout>
    </v-content>
</template>

<script>
    //import SearchBar from '../components/SearchBar.vue'
    import CompetitionBox from '../components/CompetitionBox.vue'

     export default {
        props: {
        },
        data: () => ({
            info: [{
                name: "선린톤",
                img: "http://sunr.in/static/media/desk.f86c603c.png",
                content: "선린 해커톤",
                tags: [
                    "태그1",
                    "태그2",
                    "태그3",
                    "태그4"
                ],
                isJoin: true,
                isApplicable: false
            },
            {
                name: "앱잼",
                img: "https://scontent-icn1-1.xx.fbcdn.net/v/t1.0-9/38476985_2135733006747577_7496676737254686720_n.png?_nc_cat=105&_nc_ht=scontent-icn1-1.xx&oh=d0bf137dfd856f682eb46d6a0d069137&oe=5C71F520",
                content: "해커톤",
                tags: [
                    "태그1"
                ],
                isJoin: false,
                isApplicable: true
            },
            {
                name: "바른톤",
                img: "https://cfile1.onoffmix.com/images/event/145572/s",
                content: "해커톤",
                tags: [
                    "태그1"
                ],
                isJoin: true,
                isApplicable: true
            },
            {
                name: "if 해커톤",
                img: "https://scontent-icn1-1.xx.fbcdn.net/v/t1.0-9/43296378_341495189743882_8082769748288339968_n.jpg?_nc_cat=110&_nc_ht=scontent-icn1-1.xx&oh=c6bfa85ea0be3bab087756e460e560b7&oe=5C3CE5C5",
                content: "해커톤",
                tags: [
                    "태그1"
                ],
                isJoin: false,
                isApplicable: true
            },
            {
                name: "T 해커톤",
                img: "https://developers.sktelecom.com/upload/opdc/daumeditor/20170615/daumEditerUserName_20170615190827.png",
                content: "해커톤",
                tags: [
                    "태그1"
                ],
                isJoin: false,
                isApplicable: true
            },
            {
                name: "SW융합 해커톤 대회",
                img: "https://cfile1.onoffmix.com/images/event/146873/s",
                content: "해커톤",
                tags: [
                    "태그1"
                ],
                isJoin: false,
                isApplicable: true
            },
            {
                name: "NUGU Play 개발 및 아이디어 공모전",
                img: "https://cfile1.onoffmix.com/images/event/156014/s",
                content: "공모전",
                tags: [
                    "태그1"
                ],
                isJoin: true,
                isApplicable: true
            },
            {
                name: "4차산업혁명 특별시 대전 ICT/SW 분야 빅데이터 공모전",
                img: "https://cfile1.onoffmix.com/images/event/155986/s",
                content: "공모전",
                tags: [
                    "태그1"
                ],
                isJoin: true,
                isApplicable: true
            },
            {
                name: "제 9회 KT&G 상상실현 콘테스트",
                img: "https://cfile1.onoffmix.com/images/event/155964/s",
                content: "공모전",
                tags: [
                    "태그1",
                    "태그2"
                ],
                isJoin: true,
                isApplicable: true
            }
            ]
        }),
        components: {
            CompetitionBox,
            //SearchBar
        }
    } 
</script>