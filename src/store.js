import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        showMenu: true,
        mainPath: "http://58.145.101.15:3030",

        userData: null,
        contestData: []
    },
    mutations: {
        setUser(state, data) {
            state.userData = data
        },
        setContest(state, data) {
            state.contestData = data
        }
    },
    actions: {
        getUser({ commit }) {
            axios(this.state.mainPath + "/auth", {
                method: "get",
                withCredentials: true,
            })
                .then(data => {
                    commit('setUser',data.data)
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
        }
    }
})
