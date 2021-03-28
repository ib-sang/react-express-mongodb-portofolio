import auth from './../auth'


const user = {}


user.getCurrentUser = () => {

    const responses =  auth.onAuthStateChanged()
    return responses

}

export default user;