export const checkUserAdmin = currentUser =>{
    if(!currentUser || Array.isArray(currentUser.useRoles)) return false
    const {useRoles} = currentUser;
    
    if(useRoles.includes('admin')) return true

    return false
}