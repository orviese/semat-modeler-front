import practiceService from "@/api/practices";
import router from "@/router";

const state = () => ({
    practice: {
        id: '',
        name: '',
        objective: ''
    },
    errorMessage: ''
});

const getters = {
    getPractice(state) {
        return state.practice;
    },
    getErrorMessage(state) {
        return state.errorMessage;
    }
}

const actions = {
    async create({commit, rootState}, practice) {
        try {
            console.log('trying to create a practice...', practice);
            let practiceCreated = await practiceService.createPractice(practice);
            console.log(practiceCreated.data);
            commit('setPractice', practiceCreated.data);
            commit('clearErrorMessage');
        } catch (e) {
            if (e.response !== null) {
                if (e.response.status === 401) {
                    rootState.account.isLogged = false;
                    await router.push('/signin')
                } else {
                    console.log(e.response.data.errors);
                    commit('setErrorMessage', e.response.data.errors[0]);
                }
            } else {
                commit('setErrorMessage', 'problems when creating practice...')
            }
        }
    },
    async updatePractice({commit}, data) {
        try {
            let practiceUpdated = await practiceService.updatePractice(data);
            //console.log(practiceUpdated.data)
            commit('setPractice', practiceUpdated.data);
        } catch (e) {
            commit('setErrorMessage', 'problems when updating practice...');
        }
    }
}


const mutations = {
    clearErrorMessage(state) {
        state.errorMessage = '';
    },
    setErrorMessage(state, payload) {
        state.errorMessage = payload;
    },
    setPractice(state, payload) {
        console.log('updating practice store', payload)
        console.log(payload._id)
        console.log(payload.name)
        console.log(payload.objective)
        state.practice.id = payload._id;
        state.practice.name = payload.name;
        state.practice.objective = payload.objective;
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}