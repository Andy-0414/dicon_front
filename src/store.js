import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        showMenu: true,
        menuLock: false,
        mainPath: "http://localhost:3030/",

        tagList: [
            {
                "color": "green",
                "text": "교내대회"
            },
            {
                "color": "green",
                "text": "외부대회"
            },
            {
                "color": "red",
                "text": "초등"
            },
            {
                "color": "red",
                "text": "중등"
            },
            {
                "color": "red",
                "text": "고등"
            },
            {
                "color": "red",
                "text": "대학"
            },
            {
                "color": "orange",
                "text": "해커톤"
            },
        ],
        userData: null,
        contestData: [],
        searchToggle: false,
        searchData: []
    },
    mutations: {
        setUser(state, data) {
            state.userData = data
        },
        setContest(state, data) {
            state.contestData = data
        },
        toggleMenu(state, data) {
            if (data)
                state.showMenu = data;
            else if(!state.menuLock)
                state.showMenu = !state.showMenu
        },
        menuLock(state, data) {
            state.menuLock = data;
        }
    },
    actions: {
        getUser({ commit }) {
            axios(this.state.mainPath + "/auth", {
                method: "get",
                withCredentials: true,
            })
                .then(data => {
                    commit('setUser', data.data)
                })
                .catch(err => {
                    commit('setUser', null)
                })
        },
        getContest({ commit }) {
            axios.get(this.state.mainPath + "/contest/getContestData")
                .then(data => {
                    commit('setContest', data.data)
                })
        },
    }
})
