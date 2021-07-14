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
        console.log(err);
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
    createAlpha(data) {
        return this.execute('post', '/alphas', data, {});
    },
    updateAlpha(data) {
        return this.execute('put', '/alphas', data, {})
    },
    fetchAllAlpha() {
        return this.execute('get', '/alphas', null, {});
    },
    fetchPracticeAlphas(id) {
        return this.execute('get', `/alphas/practice/${id}`, null, {});
    },
    fetchAllKernelAlpha() {
        return this.execute('get', '/alphas/kernel-alphas', null, {});
    },
    removeAlpha(id) {
        return this.execute('delete', `/alphas/${id}`, null, {});
    }
}