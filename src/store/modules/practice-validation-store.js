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
    criteria: [],
    publicValidations: [],
    publicPracticeToValidate: {}
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
    },
    getAllPublicValidation(state) {
        return state.publicValidations;
    },
    getPublicPracticeToValidate(state) {
        return state.publicPracticeToValidate;
    }
}

const actions = {
    async newPracticeValidationCriterion({commit}, criterion) {
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
    async fetchAllPracticeValidationCriteria({commit}, practiceId) {
        console.log('getting all validation criteria')
        try {
            let response = await practiceValidationService.getAllPracticeValidationCriteria(practiceId);
            commit('setPracticeValidationCriteria', response.data);
        } catch (error) {
            console.error(error);
        }
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
    async fetchAllAvailablePractices({commit}) {
        try {
            let practices = await practiceValidationService.getAllAvailablePractices();
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
    /*
    async savePracticeValidationResult({commit, dispatch, state}, data) {
        practiceValidationService.createPracticeValidationResult(data)
            .then(response => {
                console.log(response.data);
                commit('setInfoMessage', 'Validation result saved');
                dispatch('fetchAllValidationCriteriaSummary', state.practice._id);
            })
            .catch(error => {
                console.error(error);
            });
    },*/
    /*
    async fetchAllValidationCriteriaSummary({commit}, practice) {
        console.log('getting summaries')
        practiceValidationService.getAllPracticeValidationCriteriaSummary(practice)
            .then(response => {
            commit('refreshPracticeValidationSummary', response.data);
        })
            .catch(error => {
                console.error(error);
            });
    },*/
    /*
    async removeValidationsFromCriterion({dispatch, state}, criterion) {
        practiceValidationService.deleteValidationsFromCriterion(criterion)
            .then(() => {
                dispatch('fetchAllValidationCriteriaSummary', state.practice._id);
            })
            .catch(error => {
                console.error(error);
            });
    },*/
    async clearPracticeValidationConfigData({commit}) {
        commit('setDefaultPractice');
        commit('setPracticeValidationCriteria', []);
    },
    async createPublicPracticeValidation({commit, state}, data) {
        practiceValidationService.createNewPublicPracticeValidation(state.practice._id, data)
            .then(response => {
                commit('addPublicValidation', response.data);
                commit('setInfoMessage', 'Public Validation Practice created')
            })
            .catch(error => {
                console.error(error);
            });
    },
    async removePublicPracticeValidationRequest({commit, dispatch}, validationRequestId) {
        practiceValidationService.deletePracticeValidationRequest(validationRequestId)
            .then(() => {
                dispatch('fetchAllPublicPracticeValidationRequests');
                commit('setInfoMessage', 'Validation Request removed')
            })
            .catch(error => {
                console.error(error)
                commit('setErrorMessage', 'Problems removing validation request')
            });
    },
    async fetchAllPublicPracticeValidationRequests({commit, state}) {
        try {
            let result = await practiceValidationService.getAllPublicPracticeValidationRequests(state.practice._id);
            commit('refreshPublicValidations', result.data);
        } catch (error) {
            console.error(error);
        }
    },
    async getPracticeValidationRequestReport({commit}, practiceId) {
        practiceValidationService.getPublicPracticeValidationReport(practiceId)
            .then((response) => {
                let fileURL = window.URL.createObjectURL(new Blob([response.data]));
                let fileLink = document.createElement('a');
                fileLink.href = fileURL;
                fileLink.setAttribute('download', 'report.txt');
                document.body.appendChild(fileLink);
                fileLink.click();
                commit('setInfoMessage', 'Information downloaded')
            })
            .catch(error => {
                if (error.response.status !== 404 && error.response.status !== 401) {
                    commit('setErrorMessage', error.response.data.errors[0])
                } else {
                    commit('setErrorMessage', error)
                }
            })
    },
    defaultPublicPracticeToValidate({commit}) {
        commit('setPublicPracticeToValidate', {});
    },
    async findPublicPracticeValidationById({commit}, validationId) {
        try {
            const response = await practiceValidationService.getPublicPracticeValidation(validationId);
            commit('setPublicPracticeToValidate', response.data)
            commit('setInfoMessage', 'Information fetched')
        } catch (error) {
            console.error(error);
            commit('setPublicPracticeToValidate', {});
            commit('setErrorMessage', error.response.data.errors[0])
        }
    },
    async savePublicPracticeValidationRequest({commit}, data) {
        practiceValidationService.saveAndClosePublicPracticeValidation(data.validationId, data)
            .then(response => {
                console.log('then')
                commit('setPublicPracticeToValidate', response.data)
            }).catch(error => {
            if (error.response.status !== 404) {
                commit('setErrorMessage', error.response.data.errors[0])
            } else {
                commit('setErrorMessage', error)
            }
        })
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
    },
    addPublicValidation(state, payload) {
        state.publicValidations.push(payload);
    },
    refreshPublicValidations(state, payload) {
        if (payload === '')
            payload = []
        state.publicValidations = payload
    },
    setPublicPracticeToValidate(state, payload) {
        state.publicPracticeToValidate = payload;
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}