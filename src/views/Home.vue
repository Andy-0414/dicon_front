<template>
    <v-content>
        <v-layout justify-end>
            <v-flex class="pa-3 px-5 pt-5 orange--text display-1" xs12 lg12>
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
            info: [
                {
                    "id": 1,
                    "name": "선린톤",
                    "img": "http://sunr.in/static/media/desk.f86c603c.png",
                    "content": "선린 해커톤",
                    "date": {
                        "startDate": "2018-7-20",
                        "endDate": "2018-11-21"
                    },
                    "tags": [
                        {
                            "color": "red",
                            "tag": "고등"
                        },
                        {
                            "color": "orange",
                            "tag": "해커톤"
                        },
                        {
                            "color": "orange",
                            "tag": "교내대회"
                        }
                    ],
                    "isJoin": false,
                    "isApplicable": false,
                    "link": null,
                    "question": [
                        {
                            "type": "text",
                            "label": "당신의 이름은?",
                            "data": null
                        },
                        {
                            "type": "text",
                            "label": "당신의 이메일은?",
                            "data": null
                        },
                        {
                            "type": "select",
                            "label": "당신의 학년은?",
                            "data": [
                                "1학년",
                                "2학년",
                                "3학년"
                            ]
                        },
                        {
                            "type": "checkbox",
                            "label": "좋아하는 음식은?",
                            "data": [
                                "피자",
                                "치킨",
                                "고기"
                            ]
                        },
                        {
                            "type": "switch",
                            "label": "동의합니까?"
                        }
                    ]
                }
            ]
        }),
        components: {
            CompetitionBox,
            //SearchBar
        }
    } 
</script>