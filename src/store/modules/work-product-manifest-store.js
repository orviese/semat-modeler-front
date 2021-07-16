import practiceApi from '../../api/practices-api';
const state = () => ({
    workProductManifest: {
        _id: '',
        lowerBound: '',
        upperBound: '',
        alpha: null,
        workProduct: null
    },
    workProductManifests: [],
    errorMessage: '',
    infoMessage: ''
});

const getters = {
    getWorkProductManifest(state) {
        return state.workProductManifest;
    },
    getAllWorkProductManifests(state) {
        return state.workProductManifests;
    },

}
const actions = {
    defaultWorkProduct({commit}) {
        commit('clearWorkProductManifest')
    },
    defaultWorkProductManifests({commit}) {
        commit('clearWorkProductManifests')
    },
    setSelectedWorkProduct({commit}, workProductManifest) {
        commit('setWorkProductManifest', workProductManifest);
    },
    fetchAllWorkProductManifests({commit}, practiceId) {
        practiceApi.fetchAllPracticeWorkProductManifests(practiceId)
            .then(response => {
                commit('setAllWorkProductManifests', response.data.workProductManifest);
            }).catch(error => {
                commit('setErrorMessage', error);
        })
    },
    createWorkProductManifest({commit, state}, practiceId) {
        practiceApi.addPracticeWorkProductManifest(practiceId, state.workProductManifest)
            .then(response => {
                commit('addWorkProductManifestToList',response.data);
                commit('clearWorkProductManifest');
            })
            .catch(error => {
                commit('setErrorMessage', error);
            });
    },
    deleteWorkProductManifest({commit}, workProductManifest) {
        practiceApi.removePracticeWorkProductManifest(workProductManifest.owner, workProductManifest._id)
            .then(response => {
                if (response.status === 200) {
                    commit('setAllWorkProductManifests', response.data.workProductManifests);
                }
            })
            .catch(error => {
                commit('setErrorMessage', error);
            });
    }
}
const mutations = {
    addWorkProductManifestToList(state, workProductManifest) {
        state.workProductManifests.push(workProductManifest);
    },
    setAllWorkProductManifests(state, workProductManifests) {
        state.workProductManifests = workProductManifests;
    },
    setWorkProductManifest(state, workProductManifest) {
        state.workProductManifest = workProductManifest;
    },
    clearWorkProductManifest(state) {
        state.workProductManifest = {
            _id: '',
            lowerBound: '',
            upperBound: '',
            alpha: null,
            workProduct: null
        }
    },
    clearWorkProductManifests(state) {
        state.workProductManifests = [];
    }

}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}