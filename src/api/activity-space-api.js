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
    async execute(method, resource, data, headers) {
        return client({
            method,
            url: resource,
            data,
            headers
        })
    },
    createActivitySpace(data) {
        return this.execute('post', '/activity-spaces', data, {});
    },
    updateActivitySpace(data) {
        return this.execute('put', '/activity-spaces', data, {})
    },
    fetchAllActivitySpaces() {
        return this.execute('get', '/activity-spaces', null, {});
    },
    fetchPracticeActivitySpaces(id) {
        return this.execute('get', `/activity-spaces/practice/${id}`, null, {});
    },
    fetchAllKernelActivitySpaces() {
        return this.execute('get', '/activity-spaces/kernel-activity-spaces', null, {});
    },
    removeActivitySpace(id) {
        return this.execute('delete', `/activity-spaces/${id}`, null, {});
    }
}