import axios from "axios";
import store from '@/store';
import { API_HOST } from "@/config";

export class ApiService {
    public get authToken() {
        return store.getters.getAuthToken
    }

    get(url: string, params = {}): Promise<any> {
        let axiosParams = {
            baseURL: API_HOST,
            method: 'GET',
            url: url,
            headers: {},
            params: params
        }
        if (store.getters.getAuthToken) {
            axiosParams['headers'] = {
                Authorization: "Bearer " + store.getters.getAuthToken,
            }
        }
        return axios.create(axiosParams)
            .get(url)
            /*.catch((err) => {
                if (err.response) {
                    console.log(err.response);
                } else if (err.request) {
                    console.log(err.request);
                } else {
                    console.log(err.message);
                }
            })*/
    }

    post(url: string, params = {}, headers = {}): Promise<any> {
        let axiosParams = {
            baseURL: API_HOST,
            headers: headers,
        }
        if (store.getters.getAuthToken) {
            axiosParams['headers'] = {
                Authorization: "Bearer " + store.getters.getAuthToken,
            }
        }
        return axios.create(axiosParams)
            .post(url, params)
            /*.catch((err) => {
                if (err.response.status === 400) {
                    window.alert('Возникла непредвиденная ошибка')
                }
                if (err.response) {
                    console.log(err.response);
                } else if (err.request) {
                    console.log(err.request);
                } else {
                    console.log(err.message);
                }
            })*/
    }

    postFormData(url: string, formData = {}): Promise<any> {
        return axios.create({
            baseURL: API_HOST,
            method: 'POST',
            url: `/api/adv/campaign_files/`,
            headers: {
                Authorization: "Bearer " + store.getters.getAuthToken,
            },
            data: formData,
        })
        .post(url, formData)
            /*.catch((err) => {
                if (err.response.status === 400) {
                    window.alert('Возникла непредвиденная ошибка')
                }
                if (err.response) {
                    console.log(err.response);
                } else if (err.request) {
                    console.log(err.request);
                } else {
                    console.log(err.message);
                }
            })*/
    }

    put(url: string, params = {}): Promise<any> {
        return axios.create({
            baseURL: API_HOST,
            headers: {
                Authorization: 'Bearer ' + store.getters.getAuthToken,
            }
        })
            .put(url, params)
            /*.catch((err) => {
                if (err.response.status === 400) {
                    window.alert('Возникла непредвиденная ошибка')
                }
                if (err.response) {
                    console.log(err.response);
                } else if (err.request) {
                    console.log(err.request);
                } else {
                    console.log(err.message);
                }
            })*/
    }

    delete(url: string): Promise<any> {
        return axios.create({
            baseURL: API_HOST,
            headers: {
                Authorization: 'Bearer ' + store.getters.getAuthToken,
            }
        })
            .delete(url)
            /*.catch((err) => {
                if (err.response.status === 400) {
                    window.alert('Возникла непредвиденная ошибка')
                }
                if (err.response) {
                    console.log(err.response);
                } else if (err.request) {
                    console.log(err.request);
                } else {
                    console.log(err.message);
                }
            })*/
    }
}
