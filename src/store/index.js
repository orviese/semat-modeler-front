import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from "vuex-persistedstate";
import account from './modules/account'

Vue.use(Vuex);

export default function (){
    const Store = new Vuex.Store({
        modules: {
            account
        },
        plugins: [createPersistedState()]
    });

    return Store
}