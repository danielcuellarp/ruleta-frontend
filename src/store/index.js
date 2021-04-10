import Vue from 'vue';
import Vuex from 'vuex';
import router from '../router';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        userLogged: null,
        isPlaying: false
    },
    mutations: {
        setUserLogged(state, data) {
            state.userLogged = data;
        },
        setPlaying(state, data) {
            state.isPlaying = data;
        }
    },
    actions: {
        saveUserLogged({ commit }, data) {
            commit('setUserLogged', data);
            localStorage.setItem("auth", JSON.stringify(data));
        },
        getUserLogged({ commit }) {
            let data = localStorage.getItem("auth");

            if (data) {
                commit('setUserLogged', JSON.parse(data));
                router.push({ path: '/ruleta' });
            } else {
                router.push({ path: '/' });
            }
        },
        logout({ commit }) {
            commit('setUserLogged', null);
            localStorage.removeItem("auth");
            router.push({ path: '/' });
        },
        setPlaying({ commit }, data) {
            commit('setPlaying', data);
        }
    },
    getters: {
        userLogged: state => {
            return state.userLogged;
        }
    }
});