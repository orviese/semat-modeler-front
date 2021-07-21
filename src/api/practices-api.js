import axios from "axios";
import router from "@/router";

const client = axios.create({
    baseURL: process.env.VUE_APP_SEMAT_API_ENDPOINT,
    json: true,
    withCredentials: true
});

client.interceptors.response.use(
    (res) => {
        return res;
    },
    async (err) => {
        if (err.response.status === 401) {
            await router.push('/signin');
        } else {
            return Promise.reject(err);
        }
    }
);

export default {
    async execute(method, resource, data, headers){
        return client({
            method,
            url: resource,
            data,
            headers
        })
    },
    createPractice(practiceData){
        return this.execute('post', '/practices', practiceData, {});
    },
    updatePractice(practiceData){
        return this.execute('patch', '/practices', practiceData, {})
    },
    fetchAllPractices() {
        return this.execute('get', '/practices', null, {});
    },
    addAlphaPractice(practice, alpha) {
        return this.execute('post', `/practices/${practice}/owned-element/alpha/${alpha}`,
            null, {});
    },
    removeAlphaPractice(practice, alpha) {
        return this.execute('delete',
            `/practices/${practice}/owned-element/alpha/${alpha}`, null, {});
    },
    addPracticeWorkProduct(practice, workProduct) {
        return this.execute('post',
            `/practices/${practice}/work-product`, workProduct, {});
    },
    updatePracticeWorkProduct(workProduct) {
        return this.execute('put',
            `/practices/work-product`, workProduct, {});
    },
    fetchAllPracticeWorkProductManifests(practiceId) {
        return this.execute('get',
            `/practices/${practiceId}/work-product-manifest`, null, {});
    },
    addPracticeWorkProductManifest(practiceId, data) {
        return this.execute('post',
            `/practices/${practiceId}/work-product-manifest`, data, {});
    },
    removePracticeWorkProductManifest(practiceId, wpmId) {
        return this.execute('delete',
            `/practices/${practiceId}/work-product-manifest/${wpmId}`, null, {});
    },
    addActivitySpaceToPractice(practice, activitySpace) {
        return this.execute('post',
            `/practices/${practice}/owned-element/activity-space/${activitySpace}`,
            null, {});
    },
    removeActivitySpaceToPractice(practice, activitySpace) {
        return this.execute('delete',
            `/practices/${practice}/owned-element/activity-space/${activitySpace}`,
            null, {});
    },
    addActivityToPractice(practice, activityData) {
        return this.execute('post',
            `/practices/${practice}/activity`, activityData, {});
    },
    removeActivityToPractice(practice, activityData) {
        return this.execute('delete',
            `/practices/${practice}/activity/${activityData.activity}`, activityData, {});
    },
    addActivitySpacePatternToPractice(data) {
        return this.execute('post',
            `/practices/${data.practice}/pattern/activity-space`, data, {});
    },
    addAlphaPatternToPractice(data) {
        return this.execute('post',
            `/practices/${data.practice}/pattern/alpha`, data, {});
    },
    addWorkProductPatternToPractice(data) {
        return this.execute('post',
            `/practices/${data.practice}/pattern/work-product`, data, {});
    },
    fetchAllPracticePatterns(practice) {
        return this.execute('get',
            `/practices/${practice}/pattern`, null, {});
    }
    ,deletePracticePattern(patternId) {
        return this.execute('delete',
            `/practices/pattern/${patternId}`, null, {});
    }
}