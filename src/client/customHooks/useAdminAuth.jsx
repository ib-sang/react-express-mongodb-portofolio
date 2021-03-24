import React, { useEffect } from 'react';
import { useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import { checkUserAdmin } from './../Utils';

const mapState = ({ user }) => ({
    currentUser: user.currentUser
})

const useAdminAuth = () => {

    const { currentUser } = useSelector(mapState);
    const history = useHistory();
    console.log(currentUser);

    useEffect(() => {
        if(!checkUserAdmin(currentUser)){
            history.push('/signin')
        }
    }, [currentUser])

    return currentUser;
    
}
export default useAdminAuth
