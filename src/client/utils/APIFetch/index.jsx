/**
 * API Fetch Utility
 *
 * This utility is used for API requests for the application. It handles responses and sets
 * error objects as well. API requests can be made on component update, or through an
 * explicit request with the fetchResults function.
 */

 // Dependencies
 import React, { useEffect, useState } from "react";
 import axios from "axios";
 import { isEmpty, reject } from "lodash";

 // config
import { config, links } from '../../config';

/**
 * API Fetch Utility
 *
 * A clean utility for making calls to different API endpoints across the application.
 * It can be used to retrieve results or errors from attempting API requests.
 *
 * @TODO cleanup per page & current page
 *
 * @param {String} locale The current locale / language for the user.
 * @param {String} BASEURL Base url for API requests.
 * @param {String} PATH_SEARCH API path to request.
 * @param {String} PATH_METHOD Method for API requests (ex get, post, put, delete).
 * @param {String} PATH_QUERY Query to be sent along with the the API request.
 * @param {Number} PATH_PERPAGE Limit the number of results per page.
 * @param {Object} formData Form data to be sent with the API request.
 * @param {Object} initialData Initial data for the calling component.
 */
const APIFetch = ({ 
    locale,
    BASEURL,
    PATH_SEARCH,
    PATH_METHOD,
    PATH_QUERY = "",
    PATH_PERPAGE = "",
    formData = null,
    initialData = null }) =>{
     
    // Setup initial state
    const [isLoading, setIsLoading] = useState(false);
    const [results, setResults] = useState(initialData);
    const [hasError, setError] = useState(null);
    const [query, setQuery] = useState(PATH_QUERY);
    const [perPage, setPerPage] = useState(PATH_PERPAGE);

    // Array of methods that require input data.
    const postMethods = ["post", "put"];

    const headers = {};

    /**
     * Set API request result
     *
     * Set the result to the response object from the API request.
     *
     * @param {Object} result Result object from the API request.
     */
    const setAPIResults = result =>{
        // Set the result state to the result object.
        setResults(result);
        // Set the loading state to false.
        setIsLoading(false);
    }

    /**
     * Fetch results from the API
     *
     * Function performs the request to the provided API. Can be called manually,
     * but it is also called when state changes in useEffect which can be used to
     * load data when the page first loads.
     *
     * @param {Object} formData Form data to be sent with the API request.
     * @param {Number} searchPerPage Limit the number of results per page.
     * @param {Number} page Current page for the request.
    */
   const fetchResults = (formData, searchPerPage = 0, page = 0) => {

        // Set the error state to null.
        setError(null);
        // Set loading to true.
        setIsLoading(true);


        return new Promise((resolve, reject) =>{
            axios({
                url: `${ BASEURL }${ PATH_SEARCH }`,
                method: PATH_METHOD,
                data: formData,
                headers
            })
            .then(result =>{
                console.log(result);
                // Make a function call to set the result from the API request.
                setAPIResults(result);
                // Set loading to false.
                setIsLoading(false);
                // Return from the promise with the result from the API request.
                resolve(result);
            })
            .catch(error =>{
                console.log(error);
            })
        })
   }

    useEffect(() => {

        fetchResults(perPage, formData)
            .catch(() => null);
        
        
    }, [])

   // Return the useful data and functions from the API Fetch utility.
   return [{ query, isLoading, results, hasError }];
}

// Export the API Fetch utility.
export default APIFetch;