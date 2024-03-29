import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from "vuex-persistedstate";
import account from './modules/account';
import practice from './modules/practice-store';
import areaOfConcern from './modules/area-of-concern';
import alpha from './modules/alpha';
import activitySpace from './modules/activity-space-store';
import competency from './modules/competency-store';
import workProduct from './modules/work-product-store';
import workProductManifest from './modules/work-product-manifest-store';
import validatePractice from './modules/practice-validation-store';
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
            alpha,
            activitySpace,
            competency,
            workProduct,
            workProductManifest,
            validatePractice
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