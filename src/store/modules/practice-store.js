import practiceService from "@/api/practices-api";
import router from "@/router";

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
    patterns: [{
        owner: '',
        name: '',
        target: '',
        areaOfConcern: '',
        associationName: '',
        activitySpaceElement: '',
        workProductElements: [],
        alphaElement: ''
    }]
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
    getOwnedAlphas(state) {
        //console.log(state.practice.ownedElements.alphas);
        return state.practice.ownedElements.alphas.sort((a, b) => {
            if (a.areaOfConcern !== undefined && b.areaOfConcern !== undefined) {
                if (a.areaOfConcern.order > b.areaOfConcern.order) {
                    return 1;
                } else if (a.areaOfConcern.order > b.areaOfConcern.order) {
                    return -1;
                } else {
                    return 0;
                }
            } else {
                return 0;
            }
        })
    },
    getAllPracticePatterns(state) {
        return state.patterns;
    }
}

const actions = {
    async create({commit, rootState}, practice) {
        try {
            console.log('trying to create a practice...', practice);
            let practiceCreated = await practiceService.createPractice(practice);
            commit('refreshPractice', practiceCreated.data);
            commit('setInfoMessage', 'Practice created.');
        } catch (e) {
            if (e.response !== null) {
                if (e.response.status === 401) {
                    rootState.account.isLogged = false;
                    await router.push('/signin')
                } else {
                    console.log(e.response.data.errors);
                    commit('setErrorMessage', e.response.data.errors[0]);
                }
            } else {
                commit('setErrorMessage', 'problems when creating practice...')
            }
        }
    },
    async updatePractice({commit}, data) {
        try {
            let practiceUpdated = await practiceService.updatePractice(data);
            commit('refreshPractice', practiceUpdated.data);
            commit('setInfoMessage', 'Practice updated.');
        } catch (e) {
            commit('setErrorMessage', 'problems when updating practice...');
        }
    },
    async fetchAvailablePractices({commit}) {
        try {
            let practices = await practiceService.fetchAllPractices();
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
    addAlphaPractice({commit, state}, alphaId) {
        practiceService.addAlphaPractice(state.practice._id, alphaId)
            .then(response => {
                commit('setOwnedAlphas', response.data.alphas);
            })
            .catch(err => {
                console.error(err)
            });
    },
    async removeAlphaFromPractice({commit}, data) {
        practiceService.removeAlphaPractice(data.practice, data.alpha)
            .then(response => {
                commit('setOwnedAlphas', response.data.alphas);
            })
            .catch(err => {
                console.error(err);
            });
    },
    async addWorkProduct({commit, state}, data) {
        practiceService.addPracticeWorkProduct(state.practice._id, data)
            .then((response) => {
                commit('refreshPractice', response.data)
            })
            .catch(err => {
                console.error(err);
            })
    },
    async updateWorkProduct({commit}, workProduct) {
        practiceService.updatePracticeWorkProduct(workProduct)
            .then(() => {
                commit('setInfoMessage', 'work product updated');
            }).catch(error => {
            console.error(error);
        });
    },
    async addActivitySpace({commit}, data) {
        practiceService.addActivitySpaceToPractice(data.practice, data.activitySpace)
            .then(response => {
                commit('refreshPracticeActivitySpaces', response.data.activitySpaces)
            })
            .catch(error => {
                console.error(error);
            })
    },
    async removeActivitySpace({commit}, data) {
        practiceService.removeActivitySpaceToPractice(data.practice, data.activitySpace)
            .then(response => {
                commit('refreshPracticeActivitySpaces', response.data.activitySpaces)
            })
            .catch(error => {
                console.error(error);
            });
    },
    async addPracticeActivity({commit}, data) {
        practiceService.addActivityToPractice(data.practice, data)
            .then(response => {
                commit('refreshPractice', response.data)
            })
            .catch(error => {
                console.error(error);
            })
    },
    async removePracticeActivity({commit}, data) {
        practiceService.removeActivityToPractice(data.practice, data)
            .then(response => {
                commit('refreshPracticeActivities', response.data.activities)
                commit('refreshPracticeActivityAssociations', response.data.activityAssociations)
            })
            .catch(error => {
                console.error(error);
            })
    },
    async addActivitySpacePattern({commit}, data) {
        practiceService.addActivitySpacePatternToPractice(data)
            .then(response => {
                commit('setInfoMessage', 'Added as pattern');
                commit('addPracticePattern', response.data);
            })
            .catch(error => {
                console.error(error);
            })
    },
    async addAlphaPattern({commit}, data) {
        practiceService.addAlphaPatternToPractice(data)
            .then(response => {
                commit('setInfoMessage', 'Added alpha pattern');
                commit('addPracticePattern', response.data);
            })
            .catch(error => {
                console.error(error);
            })
    },
    async addWorkProductPattern({commit}, data) {
        practiceService.addWorkProductPatternToPractice(data)
            .then(response => {
                commit('setInfoMessage', 'Added workProduct pattern');
                commit('addPracticePattern', response.data);
            })
            .catch(error => {
                console.error(error);
            })
    },
    async fetchAllPracticePatterns({commit, state}) {
        if (state.practice._id !== '') {
            practiceService.fetchAllPracticePatterns(state.practice._id)
                .then (response => {
                    commit('refreshPracticePatterns', response.data);
                }).catch(error => {
                console.error(error);
            });
        }
    },
    clearPracticePatterns({commit}) {
        commit('clearPatterns');
    },
    async removePattern({dispatch}, patternId) {
        practiceService.deletePracticePattern(patternId)
            .then(() => {
                dispatch('fetchAllPracticePatterns');
            }).catch(error => {
            console.error(error);
        });
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

        state.patterns = [{
            owner: '',
            name: '',
            target: '',
            areaOfConcern: '',
            associationName: '',
            activitySpaceElement: '',
            workProductElements: [],
            alphaElement: ''
        }];
    },
    setPracticeToEdit(state, payload) {
        console.log('updating practice to edit')
        state.practice = payload;
    },
    setOwnedAlphas(state, payload) {
        state.practice.ownedElements.alphas = payload;
    },
    refreshPractice(state, payload) {
        state.practice = payload;
    },
    refreshPracticeActivitySpaces(state, payload) {
        state.practice.ownedElements.activitySpaces = payload;
    },
    refreshPracticeActivities(state, payload) {
        state.practice.ownedElements.activities = payload;
    },
    refreshPracticeActivityAssociations(state, payload) {
        state.practice.ownedElements.activityAssociations = payload;
    },
    refreshPracticePatterns(state, payload) {
        state.patterns = payload;
    },
    addPracticePattern(state, payload) {
        state.patterns.push(payload);
    },
    clearPatterns(state) {
        state.patterns = [{
            owner: '',
            name: '',
            target: '',
            areaOfConcern: '',
            associationName: '',
            activitySpaceElement: '',
            workProductElements: [],
            alphaElement: ''
        }];
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}