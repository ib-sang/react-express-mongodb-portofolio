import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from "axios";

import { config }  from '../../config';
import authApi from './authApi';

const endpoint = authApi.apiService.getUser;

const auth = {}

const mapState = ({ user }) => ({
    currentUser: user.currentUser,
});

auth.signInWithEmailAndPassword = (email, password) => {

    const data = {email:email, password:password};
    

    const responses =  new Promise((resolve, reject) =>{
        axios({
            baseURL: config.apiServer.baseURL,
            url: endpoint.PATH_SEARCH,
            method: endpoint.PATH_METHOD,
            data,
            
        })
        .then(response =>{
            console.log(response);
            resolve(response)
        })
        .catch(error =>{
            console.log(error.response.status);
            console.log(error.response.data);
            reject(error.response.data)
        })
    })

    console.log(responses);
    return responses

}


auth.onAuthStateChanged = () =>{

    const { currentUser } = useSelector(mapState);

    const userAuth = new Promise((resolve, reject) =>{
        if(!currentUser){
            const id = '605e513fb970744a68fb7301'
            axios({
                baseURL: config.apiServer.baseURL,
                url: endpoint.PATH_SEARCH,
                method: endpoint.PATH_METHOD,
                id
            })
            .then(user =>{
                resolve(user)
            })
            .catch(err =>{
                console.log(err.response.status);
                console.log(err.response.data);
                reject(err.response.data)
            })  
        }
           
    })

    return userAuth
}

auth.createUserWithEmailAndPassword = (email, password) => {

}

auth.signOut = () => {

}

export default auth;