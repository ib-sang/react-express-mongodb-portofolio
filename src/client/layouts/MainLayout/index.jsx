import React, {Fragment} from 'react'

// Footer
import UserFooter from './../../components/Footers/UserFooter';

// Header
import UserHeader from './../../components/Headers/UserHeader';

const MainLayout = props => {

    return (
        <Fragment>
            <UserHeader/>
                <div className="main">
                    { props.children }
                </div>
            <UserFooter/>
        </Fragment>
    )
}

export default MainLayout
