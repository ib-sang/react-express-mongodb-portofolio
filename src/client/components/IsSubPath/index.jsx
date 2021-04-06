import React from 'react';
import { useLocation } from 'react-router-dom';

const IsSubPath = ({subpath}) => {

    const {pathname} = useLocation();

    const isSubPath = (subpath) =>{
        return pathname.indexOf(subpath) !==-1
    }

    return isSubPath
}

export default IsSubPath
