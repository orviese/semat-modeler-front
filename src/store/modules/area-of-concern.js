import areasOfConcern from "@/api/areas_of_concern";
//import router from "@/router";

const state = () => ({
    infoMessage: '',
    errorMessage: '',
    areasOfConcern: [],
    areaOfConcern: {
        _id: '',
        name: '',
        description: '',
        colorConvention: ''
    },
    defaultAreaOfConcern: {
        _id: '',
        name: '',
        description: '',
        colorConvention: ''
    }
});

const getters = {
    getAllAreasOfConcern(state) {
        return state.areasOfConcern;
    },
    getSelectedAreaOfConcern(state) {
        return state.areaOfConcern;
    }
}
const actions = {
    async fetchAllAreasOfConcern({commit}) {
        try {
            let areasOfConcerns = await areasOfConcern.fetchAllAreasOfConcern();
            commit('setAreasOfConcern', areasOfConcerns.data.areasOfConcern);
        } catch (e) {
            commit('setErrorMessage', 'problems getting available practices...');
        }
    },
    async setSelectedAreaOfConcern({commit}, data) {
        commit('setSelectedAreaOfConcern', data)
    },
    async setDefaultAreaOfConcern({commit}) {
        commit('setDefaultAreaOfConcern');
    },
    async deleteAreaOfConcern({dispatch, commit}, aocId) {
        try {
            let response = await areasOfConcern.removeAreasOfConcern(aocId);
            console.log(response.status);
            dispatch('fetchAllAreasOfConcern');
            commit('setInfoMessage', 'Area of concern deleted.')
        } catch (e) {
            console.log(e);
        }
    },
    async updateAreaOfConcern({dispatch, commit}, data) {
        try {
            await areasOfConcern.updateAreaOfConcern(data);
            dispatch('fetchAllAreasOfConcern');
            commit('setInfoMessage', 'Area of concern updated.');
            commit('setDefaultAreaOfConcern');
        } catch (e) {
            console.log(e);
        }
    },

}
const mutations = {
    setAreasOfConcern(state, payload) {
        console.log('setting areas of concern')
        state.areasOfConcern = payload;
    },
    setSelectedAreaOfConcern(state, payload) {
        state.areaOfConcern = payload;
    },
    setDefaultAreaOfConcern(state) {
        state.areaOfConcern = state.defaultAreaOfConcern;
    },
    setInfoMessage(state, payload) {
        state.infoMessage = payload;
        state.errorMessage = '';
    },
    setErrorMessage(state, payload) {
        state.errorMessage = payload;
        state.infoMessage = '';
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}