import React from 'react'
import Icon from "./../../Icon";

const Topbar = () => {
    return (
        <div className="topbar">
            <div className="topbar-item">
                <Icon name="map-google"/> Yirimadjo
            </div>
            <div className="topbar-item topbar-wrap">
                <div>
                    <Icon name="money-bag"/> sibrahima250@gmail.com
                </div>
                <div>
                    <Icon name="phone"/> +223 91 92 32 37
                </div>
            </div>
        </div>
    )
}

export default Topbar
