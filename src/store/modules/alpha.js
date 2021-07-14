import alpha from "@/api/alphas";

const state = () => ({
    infoMessage: '',
    errorMessage: '',
    alphas: [],
    practiceAlphas: [],
    alpha: {
        _id: '',
        name: '',
        briefDescription: '',
        description: '',
        isKernel: null,
        areaOfConcern: null,
        owner: '',
        superAlpha: null
    },
    defaultAlpha: {
        _id: '',
        name: '',
        briefDescription: '',
        description: '',
        isKernel: null,
        areaOfConcern: '',
        owner: '',
        superAlpha: null
    }
});

const getters = {
    getAlpha(state) {
        return state.alpha;
    },
    getAlphas(state) {
        return state.alphas;
    },
    getSelectedAOC(state) {
        return state.areaOfConcern;
    },
    getPracticeAlphas(state) {
        return state.practiceAlphas;
    }
}

const actions = {
    async defaultAlpha({commit}, data) {
        commit('setDefault', data);
    },
    async createAlpha({commit, dispatch}, data) {
        alpha.createAlpha(data)
            .then(() => {
                commit('setInfoMessage', 'Alpha created');
                dispatch('fetchAllAlphas');
                dispatch('fetchAllPracticeAlphas', data.owner);
            }).catch(e => {
                commit('setErrorMessage', e.response.data.errors[0])
            }
        );
    },
    async updateAlpha({commit, dispatch}, data) {
        alpha.updateAlpha(data)
            .then(() => {
                commit('setInfoMessage', 'Alpha Updated');
                dispatch('fetchAllAlphas');
            }).catch(e => {
                commit('setErrorMessage', e.response.data.errors[0])
            }
        );
    },
    async fetchAllAlphas({commit}) {
        try {
            let alphas = await alpha.fetchAllAlpha();
            commit('setAlphas', alphas.data.alphas);
        } catch (e) {
            commit('setErrorMessage', 'Problems getting all alphas')
        }
    },
    async fetchAllPracticeAlphas({commit}, data) {
        try {
            let alphas = await alpha.fetchPracticeAlphas(data);
            commit('setPracticeAlphas', alphas.data.alphas);
        } catch (e) {
            commit('setErrorMessage', 'Problems getting all alphas')
        }
    },
    setSelectedAlpha({commit}, data) {
        commit('setAlpha', data);
    },
    setAlphaOwner({commit}, data) {
        commit('setOwner', data)
    }
}

const mutations = {
    setAlpha(state, payload) {
        state.alpha = payload;
    },
    setAlphas(state, payload) {
        state.alphas = payload;
    },
    setPracticeAlphas(state, payload) {
        state.practiceAlphas = payload;
    },
    setDefault(state, payload) {
        state.alpha = {
            _id: '',
            name: '',
            briefDescription: '',
            description: '',
            isKernel: payload ? null : true,
            areaOfConcern: null,
            owner: '',
            superAlpha: null
        }
    },
    setAOC(state, payload) {
        state.areaOfConcern = payload;
    },
    setInfoMessage(state, payload) {
        state.infoMessage = payload;
        state.errorMessage = '';
    },
    setErrorMessage(state, payload) {
        state.errorMessage = payload;
        state.infoMessage = '';
    },
    setOwner(state, payload) {
        state.alpha.owner = payload;
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}