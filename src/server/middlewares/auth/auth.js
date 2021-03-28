const {isLoggedIn} =require('./../../auth')

const guest = (req, res, next) =>{

    if(isLoggedIn(req)){
        return res.status(401).json({
            message: 'You are already logged in'
        })
    }
}

const auth = (req, res, next)=>{

    if(!isLoggedIn(req)){
        return res.status(401).json({
            message: 'You must be logged in'
        })
    }
}

const catchAsync = ()=>{}

module.exports = {
    auth,
    guest
};