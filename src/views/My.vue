<template>
    <v-content>
        <v-layout justify-end>
            <v-flex class="pa-3 px-5 pt-5 orange--text display-1" xs12 lg12>
                참여한 대회 목록
                <v-divider></v-divider>
            </v-flex>
        </v-layout>
        <v-layout justify-start>
            <v-flex xs12 lg12>
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
            CompetitionBox
        }
    } 
</script>