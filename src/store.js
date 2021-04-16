import Vue from "vue";
import Vuex from "vuex";
import todo from './modules/todo';
 
Vue.use(Vuex);
 
export default new Vuex.Store({
    state: {
        isLoading:false,
        isLogin: false,
        token:null,
        user:null,
    },
    mutations: {
        resetState (state) {
            state.isLoading=false;
            state.isLogin=false;
            state.token=null;
            state.user=null;
        }
    },
    actions: {
        clearState ({ commit }) {
            commit('resetState');
        },
    },
    modules: {
        todo,
    }
});