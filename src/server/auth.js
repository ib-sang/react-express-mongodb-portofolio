const {config} = require('./config')

const isLoggedIn = req => !!req.session.userId

const logIn = (req, user) =>{
    let token=req.cookies.auth;

    user.findByToken(token, (err, user) =>{
        if(err) return err
        if(user){
            return user
        }
    })
    console.log(token)
    req.session.userId = userID
    req.session.createdAt = Date.now()
}

const logOut = (req, res) =>{
    new Promise((resolve, reject) =>{
        res.session.destroy(err =>{
            if(err) reject(err)
            res.clearCookie(config.session.session_name)
            resolve()
        })
    })
}

const markAsVerified = async  user =>{
    user.verifiedAt = new Date()
    await user.save()
}

const resetPassword = async (user, password) =>{
    user.password = password
    await user.save()
}

module.exports = {
    logIn,
    logOut,
    isLoggedIn,
    markAsVerified,
    resetPassword
}