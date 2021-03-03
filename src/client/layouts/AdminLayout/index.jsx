import React, { Fragment } from 'react';

// Footer
import AdminFooter from './../../components/Footers/AdminFooter';

// Header
import AdminHeader from './../../components/Headers/AdminHeader';

const AdminLayout = props =>{

    return (
        <Fragment>
            <AdminHeader/>
                <div className='main'>
                    { props.children }
                </div>
            <AdminFooter/>
        </Fragment>
        
        );

}

export default AdminLayout;