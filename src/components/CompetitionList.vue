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
    import CompetitionBox from './CompetitionBox.vue'
    export default {
        name: 'CompetitionList',
        props: {
        },
        data: () => ({
            info: [
                {
                    name: "전생했더니 슬라임이었던 건에 대하여",
                    img: "http://mblogthumb1.phinf.naver.net/MjAxODA2MDlfMjI4/MDAxNTI4NDcyODU5NDQ3.dyf12tALNNcSrtbytw7LSxQ9z0d1Vk1zV7GrGlyB9Zog.qTesKG0jy3CNnHdaiMGv-F_RGhSNMy2FsCs66tjh0Wog.JPEG.bakemono1/a9b220bc0e.jpg?type=w800",
                    content: "이세계 환생물",
                    tegs: ["이세계", "환생", "슬라임", "중세"],
                    isJoin: true,
                    isApplicable: false
                },
                {
                    name: "청춘 돼지는 바니걸 선배의 꿈을 꾸지 않는다",
                    img: "https://s3.namuwikiusercontent.com/s/35448ebce5d4dc15740eb581ee3cd4cdc79bf872c27007b0548cf7fcadf25f445030c0e88c723a8a8ca1426b958f47c788183d2512c784bb57d4235c050466d67a9c98945c3c2eecb8d29926170ff361b8b2326f5a7527c75608213a7aa49daf",
                    content: "연애물",
                    tegs: ["일상", "연애"],
                    isJoin: false,
                    isApplicable: true
                },
                {
                    name: "벨제붑 아가씨의 뜻대로",
                    img: "https://t1.daumcdn.net/cfile/tistory/990BE3395B40282139",
                    content: "일상 치유물",
                    tegs: ["일상", "치유", "악마"],
                    isJoin: false,
                    isApplicable: true
                },
                {
                    name: "좀비 랜드 사가",
                    img: "https://s3.namuwikiusercontent.com/s/fbde0dd1328793e54b98c00e210a979c0410c59f0d9b55a0089e228a50fd9d7c36e08cf326d893c400e32c10f8720a74552c98521a93c3cf228e5e8d5fa98006f0e6c08c6eddae1a161b8719fa5a17a61e57ebca5a83fd4d744355ac0e9aada8",
                    content: "일상 좀비 아이돌믈?",
                    tegs: ["일상", "개그", "좀비", "아이돌"],
                    isJoin: false,
                    isApplicable: true
                },
                {
                    name: "어떤 마술의 금서목록 3기",
                    img: "https://laftelimage.blob.core.windows.net/items/thumbs/large/f118f182-1e5c-4882-98e4-4fe7edd491e1.jpg",
                    content: "초능력 전투물",
                    tegs: ["마법", "능력", "전투", "먼치킨"],
                    isJoin: false,
                    isApplicable: true
                }
            ]
        }),
        components: {
            CompetitionBox
        }
    } 
</script>

<style scoped>

</style>