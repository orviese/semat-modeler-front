import practiceService from "@/api/practices-api";
import router from "@/router";

const state = () => ({
    practices: [],
    practice: {
        _id: '',
        name: '',
        objective: '',
        tags: [],
        resources: [],
        properties: [],
        measures: [],
        entry: [],
        result: [],
        ownedElements: {
            alphas: [],
            workProducts: []
        }
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
            commit('refreshPractice', practiceCreated.data);
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
            commit('refreshPractice', practiceUpdated.data);
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
        commit('setDefaultPractice');
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
        practiceService.removeAlphaPractice(data.practice, data.alpha)
            .then(response => {
                commit('setOwnedAlphas', response.data.alphas);
            })
            .catch(err => {
                console.error(err);
            });
    },
    async addWorkProduct({commit, state}, data) {
        practiceService.addPracticeWorkProduct(state.practice._id, data)
            .then((response) => {
                commit('refreshPractice', response.data)
            })
            .catch(err => {
                console.error(err);
            })
    },
    async updateWorkProduct({commit}, workProduct) {
        practiceService.updatePracticeWorkProduct(workProduct)
            .then(() => {
                commit('setInfoMessage', 'work product updated');
            }).catch(error => {
            console.error(error);
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

    setDefaultPractice(state) {
        console.log('updating practice store')
        state.practice = {
            _id: '',
            name: '',
            objective: '',
            tags: [],
            resources: [],
            properties: [],
            measures: [],
            entry: [],
            result: [],
            ownedElements: {
                alphas: [],
                workProducts: []
            }
        }
    },
    setPracticeToEdit(state, payload) {
        console.log('updating practice to edit')
        state.practice = payload;
    },
    setOwnedAlphas(state, payload) {
        state.practice.ownedElements.alphas = payload;
    },
    refreshPractice(state, payload) {
        state.practice =  payload;
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}