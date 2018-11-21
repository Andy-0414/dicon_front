import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      showMenu:true,
      mainPath:"http://58.145.101.15:3030",

      userData:null,
      contestData: [
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
                      "data": "이름"
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
          },
          {
              "id": 2,
              "name": "바른톤",
              "img": "https://cfile1.onoffmix.com/images/event/145572/s",
              "content": "해커톤",
              "date": {
                  "startDate": "2019-1-5",
                  "endDate": "2019-1-6"
              },
              "tags": [
                  {
                      "color": "green",
                      "tag": "외부"
                  },
                  {
                      "color": "red",
                      "tag": "초등"
                  },
                  {
                      "color": "red",
                      "tag": "중등"
                  },
                  {
                      "color": "red",
                      "tag": "고등"
                  },
                  {
                      "color": "red",
                      "tag": "대학"
                  },
                  {
                      "color": "orange",
                      "tag": "해커톤"
                  },
                  {
                      "color": "orange",
                      "tag": "외부대회"
                  }
              ],
              "isJoin": false,
              "isApplicable": true,
              "link": "https://www.onoffmix.com/event/145572",
          }
      ]
  },
  mutations: {

  },
  actions: {

  }
})
