import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        showMenu: true,
        menuLock: false,
        mainPath: "",

        tagList: [],
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
        setTagList(state, data) {
            state.tagList = data
        },
        setURL(state, data){
            console.log(data)
            state.mainPath = data
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
        getTagList({ commit }) {
            axios.get(this.state.mainPath + "/contest/getTags")
                .then(data => {
                    commit('setTagList', data.data)
                })
        },
    }
})
