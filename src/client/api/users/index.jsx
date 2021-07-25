import axios from "axios";

import { config }  from '../../config';
import userApi from './usersApi';

const endpoint = userApi.apiService.getUsers;

import auth from './../auth'


const user = {}


user.getCurrentUser = () => {

    const responses =  auth.onAuthStateChanged()
    return responses

}

user.findAll = () =>{
    console.log(userApi);
    const responses =  new Promise((resolve, reject) =>{
        axios({
            baseURL: config.apiServer.baseURL,
            url: endpoint.PATH_SEARCH,
            method: endpoint.PATH_METHOD,            
        })
        .then(response =>{
            console.log(response);
            resolve(response)
        })
        .catch(error =>{
            reject(error.response.data)
        })
    })

    console.log(responses);
    return responses
}

export default user;