import competencyApi from '@/api/competencies-api';

const state = () => ({
    infoMessage: '',
    errorMessage: '',
    competencies: [],
    competency: {
        _id: '',
        name: '',
        briefDescription: '',
        description: '',
        isKernel: true,
        areaOfConcern: null,
        owner: '',
    }
});

const getters = {
    getCompetencies(state) {
        return state.competencies;
    },
    getCompetency(state) {
        return state.competency;
    }
}
const actions = {
    defaultCompetency({commit}) {
        commit('defaultCompetency')
    },
    updateCompetency({commit, dispatch}, data) {
        competencyApi.updateCompetency(data)
            .then(() => {
                commit('defaultCompetency');
                dispatch('fetchAllCompetencies');
            })
            .catch(err => {
                if (err.response.status !== 401) {
                    console.error(err.response.data.errors[0]);
                }
            })
    },
    createCompetency({commit, dispatch}, data) {
        competencyApi.createCompetency(data)
            .then(() => {
                commit('defaultCompetency');
                dispatch('fetchAllCompetencies');
            })
            .catch(err => {
                if (err.response.status !== 401) {
                    console.error(err.response.data.errors[0]);
                }
            })
    },
    async fetchAllCompetencies({commit}) {
        competencyApi.fetchAllCompetencies()
            .then(response => {
                commit('setCompetencies', response.data.competencies);
            })
            .catch(err => {
                if (err.response.status !== 401) {
                    console.error(err.response.data.errors[0])
                }
            });
    },
    setSelectedCompetency({commit}, data) {
        commit('setCompetency', data)
    }
}
const mutations = {
    defaultCompetency(state) {
        state.competency = {
            _id: '',
            name: '',
            briefDescription: '',
            description: '',
            isKernel: true,
            areaOfConcern: null,
            owner: ''
        }
    },
    setCompetencies(state, payload) {
        state.competencies = payload;
    },
    setCompetency(state, payload) {
        state.competency = payload;
    },
    setInfoMessage(state, payload) {
        state.infoMessage = payload;
        state.errorMessage = '';
    },
    setErrorMessage(state, payload) {
        state.errorMessage = payload;
        state.infoMessage = '';
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}