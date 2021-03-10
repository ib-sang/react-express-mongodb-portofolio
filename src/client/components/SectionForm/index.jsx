import React from 'react'

const SectionForm = () => {
    return (
        <section className="section-form">
            <form action="" className="form-home">
                <div className="form-picture">
                    <img src="./img/ib-ml.png" alt="img form"/>
                </div>
                <div className="form-contact">
                    <h1 className="form-title">Say hi by filling the form out below.</h1>
                    <div className="form-group">
                        <label htmlFor="name" className="form-controle">My name is</label>
                        <input type="text" className="form-input" name="name" id="name"/>
                        <label htmlFor="email"> , my email address is </label>
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-input" name="email" id="email"/>
                        <label htmlFor="contact">, I am contacting you regarding </label>
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-input" name="contact" id="contact"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">I want to tell you that: </label>
                    </div>
                    <div className="form-group">
                        <textarea name="description" id="" cols="30" rows="10" id="description" className="form-textarea"></textarea>
                    </div>
                    <div className="form-group">
                        <button className="btn-form-home btn">Knock up my inbox</button>
                    </div>
                </div>
                
            </form>
        </section>
    )
}

export default SectionForm
