import React from 'react';

// components

import ProgressBar from './../ProgressBar';

const Skill = () => {
    return (
        <div className="skill">
            <div className="skill-des">
                <h1 className="skill-title">The skills required during my studies</h1>
                <p className="skill-para">
                    Computer enthusiast , in general new technologies, this allowed me to know 
                    several programming languages and   finally to know how to create web and
                    mobile applications.
                </p>
                <p>
                    Computer enthusiast , in general new technologies, this allowed me to know 
                    several programming languages and   finally to know how to create web and
                    mobile applications.
                </p>
            </div>
            <div className="skill-level">
                <div className="skill-mov">
                    <div className="skill-wrap">
                        <h1 className="skill-level-title">My skills</h1>
                        <ProgressBar/>
                        <ProgressBar/>
                        <ProgressBar/>
                    </div>
                    
                </div>
                
            </div>
        </div>
    )
}

export default Skill
