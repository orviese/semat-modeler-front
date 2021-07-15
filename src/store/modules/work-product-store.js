//import practiceApi from '../../api/practices-api';
const state = () => ({
    workProduct: {
        _id: '',
        name: '',
        description: ''
    },
    errorMessage: '',
    infoMessage: ''
});

const getters = {
    getWorkProduct(state) {
        return state.workProduct;
    }
}
const actions = {
    defaultWorkProduct({commit}) {
        commit('clearWorkProduct')
    },
    setSelectedWorkProduct({commit}, workProduct) {
        commit('setWorkProduct', workProduct);
    }
}
const mutations = {
    setWorkProduct(state, workProduct) {
        state.workProduct = workProduct;
    },
    clearWorkProduct(state) {
        state.workProduct = {
            _id: '',
            name: '',
            description: ''
        }
    }

}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}