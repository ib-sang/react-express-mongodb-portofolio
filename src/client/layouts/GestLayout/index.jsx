import React, { Fragment } from 'react';

// Footer
import GestFooter from './../../components/Footers/GestFooter';

// Header
import GestHeader from './../../components/Headers/GestHeader';

const GestLayout = props => {
    return (
        <Fragment>
            <GestHeader/>
                <div className='main'>
                    { props.children }
                </div>
            <GestFooter/>
        </Fragment>
    )
}

export default GestLayout
