import practiceService from "@/api/practices";
import router from "@/router";

const state = () => ({
    practices: [],
    practice: {
        id: '',
        name: '',
        objective: '',
        tags: [],
        resources: [],
        properties: [],
        measures: [],
        entry: [],
        result: [],
        ownedElements: {
            alphas: []
        }
    },
    defaultPractice: {
        _id: '',
        name: '',
        objective: '',
        tags: [],
        resources: [],
        properties: [],
        measures: [],
        entry: [],
        result: []
    },
    errorMessage: '',
    infoMessage: ''
});

const getters = {
    getPractice(state) {
        return state.practice;
    },
    getPractices(state) {
        return state.practices;
    },
    getErrorMessage(state) {
        return state.errorMessage;
    },
    getInfoMessage(state) {
        return state.infoMessage;
    }
}

const actions = {
    async create({commit, rootState}, practice) {
        try {
            console.log('trying to create a practice...', practice);
            let practiceCreated = await practiceService.createPractice(practice);
            console.log(practiceCreated.data);
            commit('setPractice', practiceCreated.data);
            commit('setInfoMessage', 'Practice created.');
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
            commit('setInfoMessage', 'Practice updated.');
        } catch (e) {
            commit('setErrorMessage', 'problems when updating practice...');
        }
    },
    async fetchAvailablePractices({commit}) {
        try {
            let practices = await practiceService.fetchAllPractices();
            commit('setPractices', practices.data.practices);
        } catch (e) {
            commit('setErrorMessage', 'problems getting available practices...');
        }
    },
    async setPracticeToEdit({commit}, data) {
        commit('setPracticeToEdit', data);
        commit('setInfoMessage', 'Edit selected practice.')
    },

    defaultPractice({commit}) {
        commit('setPractice');
    },

    addAlphaPractice({commit, state}, newAlpha) {
        let payload = {
            practiceId: state.practice._id,
            alpha: newAlpha
        }
        practiceService.addAlphaPractice(payload)
            .then(response => {
                console.log(response.data.alphas);
                commit('setOwnedAlphas', response.data.alphas);
            })
            .catch(err => {
                console.error(err)
            });

    },
    async removeAlphaFromPractice({commit}, data) {
        console.log(data.practice, data.alpha);
        practiceService.removeAlphaPractice(data.practice, data.alpha)
            .then(response => {
                commit('setOwnedAlphas', response.data.alphas);
            })
            .catch(err => {
                console.error(err);
            });
    }
}


const mutations = {
    clearErrorMessage(state) {
        state.errorMessage = '';
    },
    setInfoMessage(state, payload) {
        state.infoMessage = payload;
        state.errorMessage = '';
    },
    setErrorMessage(state, payload) {
        state.errorMessage = payload;
        state.infoMessage = '';
    },
    setPractices(state, payload) {
        state.practices = payload;
    },

    setPractice(state) {
        console.log('updating practice store')
        state.practice = {
            id: '',
            name: '',
            objective: '',
            tags: [],
            resources: [],
            properties: [],
            measures: [],
            entry: [],
            result: [],
            ownedElements: {
                alphas: []
            }
        }
    },
    setPracticeToEdit(state, payload) {
        console.log('updating practice to edit')
        state.practice = payload;
    },
    setOwnedAlphas(state, payload) {
        state.practice.ownedElements.alphas = payload;
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}