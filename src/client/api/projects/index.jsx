import axios from "axios";

import { config }  from '../../config';
import projectApi from './projectApi';

const endpoint = projectApi.apiService.projects;

const project = {}



project.findAll = () => {
    

    const responses =  new Promise((resolve, reject) =>{
        axios({
            baseURL: config.apiServer.baseURL,
            url: endpoint.PATH_SEARCH,
            method: endpoint.PATH_METHOD            
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

project.findById = (id) =>{
    const responses =  new Promise((resolve, reject) =>{
        axios({
            baseURL: config.apiServer.baseURL,
            url: endpoint.PATH_SEARCH+'/'+id,
            method: endpoint.PATH_METHOD            
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



export default project;