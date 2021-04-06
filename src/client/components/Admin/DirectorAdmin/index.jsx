import React from 'react';

import AsideAdmin from '../AsideAdmin';
import ContentAdmin from '../ContentAdmin';

const DirectorAdmin = () => {
    return (
        <div className='directory-main'>
            <div className='aside'>
                <AsideAdmin/>
            </div>
            <div className='content'>
                <ContentAdmin/>
            </div>    
        </div>
    )
}

export default DirectorAdmin
