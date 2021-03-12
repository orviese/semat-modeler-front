import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from "vuex-persistedstate";
import account from './modules/account'
import * as Cookies from 'js-cookie'

Vue.use(Vuex);

export default function (){
    const Store = new Vuex.Store({
        modules: {
            account
        },
        plugins: [createPersistedState({
            key: 'x-data',
            storage: {
                getItem: (key) => Cookies.get(key),
                setItem: (key, value) =>
                    Cookies.set(key, value),
                removeItem: (key) => Cookies.remove(key),
            },
        })]
    });

    return Store
}