import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from "vuex-persistedstate";
import account from './modules/account';
import practice from './modules/practice';
import areaOfConcern from './modules/area-of-concern';
import alpha from './modules/alpha';
//import * as Cookies from 'js-cookie'
import SecureLS from "secure-ls";
const ls = new SecureLS({
    encodingType: 'aes',
    isCompression: false
});

Vue.use(Vuex);

export default function (){
    const Store = new Vuex.Store({
        modules: {
            account,
            practice,
            areaOfConcern,
            alpha
        },
        plugins: [createPersistedState({
            //paths: ['account', 'practice'],
            key: 'state',
            storage: {
                getItem: (key) => ls.get(key),
                setItem: (key, value) => ls.set(key, value),
                removeItem: (key) => ls.remove(key),
            },
            /*
            storage: {
                getItem: (key) => Cookies.get(key),
                setItem: (key, value) => Cookies.set(key, value),
                removeItem: (key) => Cookies.remove(key),
            },*/
        })]
    });
    return Store
}