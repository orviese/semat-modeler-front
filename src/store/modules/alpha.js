//import areasOfConcern from "@/api/areas_of_concern";
//import router from "@/router";

const state = () => ({
    infoMessage: '',
    errorMessage: '',
    alphas: [],
    alpha: {
        _id: '',
        name: '',
        briefDescription: '',
        description: '',
        isKernel: null,
        areaOfConcern: ''
    },
    defaultAlpha: {
        _id: '',
        name: '',
        briefDescription: '',
        description: '',
        isKernel: null,
        areaOfConcern: ''
    }
});

const getters = {
    getAlpha(state) {
        return state.alpha;
    },
    getAlphas(state) {
        return state.alphas;
    }
}

const actions = {
    defaultAlpha({commit}) {
        commit('setDefault');
    }
}

const mutations = {
    setAlpha(state, payload) {
        state.alpha = payload;
    },
    setAlphas(state, payload) {
        state.alphas = payload;
    },
    setDefault(state) {
        state.alpha = state.defaultAlpha;
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}