import practiceValidationService from "@/api/practices-validation-api";

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
            workProducts: [],
            activitySpaces: [],
            activityAssociations: [],
            activities: []
        }
    },
    errorMessage: '',
    infoMessage: '',
    criteria: []
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
    },
    getAllValidationCriteria(state) {
        return state.criteria;
    }
}

const actions = {
    async create({commit}, criterion) {
        try {
            let criterionCreated = await practiceValidationService.createPracticeValidationCriterion(criterion);
            commit('addCriterionToList', criterionCreated.data);
            commit('setInfoMessage', 'Practice validation criterion created.');
        } catch (error) {
            if (error.response !== null) {
                console.log(error.response.data.errors);
                commit('setErrorMessage', error.response.data.errors[0]);
            }
        }
    },
    fetchAllPracticeValidationCriteria({commit}, practiceId) {
        practiceValidationService.getAllPracticeValidationCriteria(practiceId)
            .then(response => {
                commit('setPracticeValidationCriteria', response.data);
            })
            .catch(error => {
                console.error(error);
            });
    },
    async removePracticeValidationCriterion({dispatch, state}, data) {
        practiceValidationService.deletePracticeValidationCriterion(data)
            .then(() => {
                dispatch('fetchAllPracticeValidationCriteria', state.practice._id);
            })
            .catch(error => {
                console.error(error);
            });
    },
    async fetchAvailablePractices({commit}) {
        try {
            let practices = await practiceValidationService.fetchAllPractices();
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
    setPracticeValidationCriteria(state, payload) {
        state.criteria = payload;
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
                workProducts: [],
                activitySpaces: [],
                activityAssociations: [],
                activities: []
            }
        }
    },
    setPracticeToEdit(state, payload) {
        console.log('updating practice to edit')
        state.practice = payload;
    },
    refreshPractice(state, payload) {
        state.practice = payload;
    },
    addCriterionToList(state, payload) {
        state.criteria.push(payload);
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}