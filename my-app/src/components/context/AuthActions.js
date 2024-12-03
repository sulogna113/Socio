export const LoginStart = (userCredentials) =>({
    type:"LOGIN_START",
});
export const LoginSuccess = (user) =>({
    type:"LOGIN_SUCCESS",
    paylod:user,
});
export const LoginFailure = () =>({
    type:"LOGIN_FAILURE",
    // paylod:error
})
export const Folow = (userId) =>({
    type: "FOLLOW",
    paylod: userId,
})
export const Unfollow = (userId) =>({
    type: "UNFOLLOW",
    paylod: userId,
})
// export const Delete = (userId) =>({
//     type: "DELETE",
//     paylod: userId,
// })