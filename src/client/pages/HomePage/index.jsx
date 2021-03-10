import React, { Fragment } from 'react'

// Components
import Banner from './../../components/Banner';
import Skill from './../../components/Skill';
import SectionForm from './../../components/SectionForm';
import SectionProject from './../../components/SectionProject';

const HomePage = () => {
    return (
        <Fragment>
            <Banner/>
            <Skill/>
            <SectionProject/>
            <SectionForm/>
        </Fragment>
    )
}

export default HomePage
