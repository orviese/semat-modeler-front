import activitySpaceApi from '@/api/activity-space-api';

const state = () => ({
    infoMessage: '',
    errorMessage: '',
    activitySpaces: [],
    activitySpace: {
        _id: '',
        name: '',
        briefDescription: '',
        description: '',
        isKernel: null,
        areaOfConcern: null,
        owner: '',
    },
    activitySpaceToEdit: {
        _id: '',
        name: '',
        briefDescription: '',
        description: '',
        isKernel: null,
        areaOfConcern: null,
        owner: '',
    }
});

const getters = {
    getActivitySpaces(state) {
        return state.activitySpaces;
    },
    getActivitySpace(state) {
        return state.activitySpace;
    }
}
const actions = {
    defaultActivitySpace({commit}) {
        commit('defaultActivitySpace')
    },
    updateActivitySpace({commit, dispatch}, data) {
        activitySpaceApi.updateActivitySpace(data)
            .then(() => {
                commit('defaultActivitySpace');
                dispatch('fetchAllActivitySpaces');
            })
            .catch(err => {
                console.error(err.response.data.errors[0])
            })
    },
    createActivitySpace({commit, dispatch}, data) {
        activitySpaceApi.createActivitySpace(data)
            .then(() => {
                commit('defaultActivitySpace');
                dispatch('fetchAllActivitySpaces');
            })
            .catch(err => {
                console.error(err.response.data.errors[0])
            })
    },
    async fetchAllActivitySpaces({commit}) {
        activitySpaceApi.fetchAllActivitySpaces()
            .then(response => {
                commit('setActivitySpaces', response.data.activitySpaces);
            })
            .catch(err => {
                console.error(err.response.data.errors[0])
            });
    },
    setSelectedActivitySpace({commit}, data) {
        commit('setActivitySpace', data)
    }
}
const mutations = {
    defaultActivitySpace(state) {
        state.activitySpace = {
            _id: '',
            name: '',
            briefDescription: '',
            description: '',
            isKernel: null,
            areaOfConcern: null,
            owner: ''
        }
    },
    setActivitySpaces(state, payload) {
        state.activitySpaces = payload;
    },
    setActivitySpace(state, payload) {
        state.activitySpace = payload;
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