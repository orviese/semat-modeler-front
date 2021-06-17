import accountService from "@/api/account";
import router from "@/router";

const state = ()=>({
    account: {
        id: '',
        name: '',
        email: '',
        password: '',
        newPassword: '',
        status: ''
    },
    accountDefault: {
        id: '',
        name: '',
        email: '',
        password: '',
        newPassword: '',
        status: ''
    },
    errorMessage: '',
    isLogged: false
});

const getters = {
    getAccount(state){
        return state.account;
    },
    isLogged(state){
        return state.isLogged;
    },
    getErrorMessage(state){
        return state.errorMessage;
    }
}

const actions = {
    async register({commit}, account){
        try {
            console.log('trying to create an account...')
            await accountService.register(account);
            //console.log(data);
            commit('clearErrorMessage');
            await router.push('/signin');
        }catch (e){
            if (e.response !== null){
                console.log(e.response.data.errors);
                commit('setErrorMessage', e.response.data.errors[0]);
            }else {
                commit('setErrorMessage', 'problems when registering...')
            }
        }
    },
    async signIn({commit}, data){
        try {
            console.log(`trying to sign in... ${data.email}`);
            let response = await accountService.signIn(data);
            commit('setAccount', response.data);
            commit('setLoggedIn', true);
            commit('clearErrorMessage');
            //console.log(response.headers);
            //console.log(response.data);
            await router.push('/dashboard');
        }catch (e) {
            if (e.response !== null){
                commit('setErrorMessage', e.response.data.errors[0]);
            }else {
                commit('setErrorMessage', 'problems when registering...');
            }
        }
    },
    async updateProfile({commit}, data){
        try {
            let accountUpdated = await accountService.updateProfile(data);
            commit('setAccount', accountUpdated.data);
            await router.push('/dashboard');
        }catch (e) {
            commit('setErrorMessage', 'problems when updating profile...');
        }

    },
    async signOut({commit}){
        await accountService.signOut();
        commit('setLoggedIn', false);
        //commit('clearState', rootState);
        await router.push('/signin');

    }
}


const mutations = {
    clearErrorMessage(state){
        state.errorMessage = '';
    },
    setErrorMessage(state, payload){
        state.errorMessage = payload;
    },
    setAccount(state, payload) {
        state.account = payload;
    },
    setLoggedIn(state, payload){
        state.isLogged = payload;
        if (!payload){
            this.replaceState({
                account: {
                    account: state.accountDefault,
                    isLogged: false
                },
                practice: {
                    practice: {
                        id: '',
                        name: '',
                        objective: ''
                    }
                }
            });
        }
    },

}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}