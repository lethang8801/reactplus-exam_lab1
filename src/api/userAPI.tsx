import React from 'react'
import { IUserItem } from "../components/interface";
import { axiosClient } from "./axiosClient";

const userAPI = {
    getAll() {
        const url = `/users`;
        return axiosClient.get(url);
    },
    addUser(itemUser: IUserItem) {
        const url = `/users`;
        axiosClient.post(url, itemUser)
    },
    deleteUser(id: string) {
        const url = `/users/${id}`;
        axiosClient.delete(url)
    },
    updateUser(id: string, itemUser: IUserItem) {
        const url = `/users/${id}`;
        axiosClient.put(url, itemUser)
    },
}

export default userAPI

