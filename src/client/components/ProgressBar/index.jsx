import React, { useState, useRef, useLayoutEffect } from 'react'

const ProgressBar = () => {

    const [width, setWidth] = useState(0);
    const widthTitle = useRef();

    useLayoutEffect(() =>{
        if(widthTitle.current){
            setWidth(widthTitle.current.offsetWidth)
        }
    }, [])

    const widthLevel = "calc(55% - "+ width+'px)';

    return (
        <div className="progresses">
            <div className="progress-infos">
                <h3 className="progress-title" ref={widthTitle}>Web/Mobile Development</h3>
                <span className="progress-number" style={{left: widthLevel }}>60%</span>
            </div>
            <div className="progress">
                <div className="progress-bar" style={{width:'60%' }}></div>
            </div>
        </div>
        
    )
}

export default ProgressBar
