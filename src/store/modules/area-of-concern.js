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
    async addAreaOfConcern({dispatch, commit}, data) {
        areasOfConcern.createAreaOfConcern(data)
            .then(() => {
                commit('setInfoMessage');
                dispatch('fetchAllAreasOfConcern');
            })
            .catch(e => {
                if (e.response.status !== 401) {
                    commit('setErrorMessage', e.response.data.errors[0])
                }
            });
    },
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
        areasOfConcern.removeAreasOfConcern(aocId)
            .then(response => {
                console.log(response.status);
                dispatch('fetchAllAreasOfConcern');
                commit('setInfoMessage', 'Area of concern deleted.')
            })
            .catch(e => {
                if (e.response.status !== 401) {
                    console.log(e.response.data.errors[0]);
                }
            });
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
        state.areasOfConcern = payload;
    },
    setSelectedAreaOfConcern(state, payload) {
        state.areaOfConcern = payload;
    },
    setDefaultAreaOfConcern(state) {
        state.areaOfConcern = {
            _id: '',
            name: '',
            description: '',
            colorConvention: ''
        };
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