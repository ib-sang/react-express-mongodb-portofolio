import React from 'react';
import { Children } from 'react';

import AsideAdmin from '../AsideAdmin';
import ContentAdmin from '../ContentAdmin';

const DirectorAdmin = ({children}) => {
    return (
        <div className='directory-main'>
            <div className='aside'>
                <AsideAdmin/>
            </div>
            <div className='content'>
                <ContentAdmin>
                    {children && children}
                </ContentAdmin>
            </div>    
        </div>
    )
}

export default DirectorAdmin
