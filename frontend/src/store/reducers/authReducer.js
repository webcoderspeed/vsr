const initState = {
    authError: null
}

const authReducer = (state = initState, action) => {
    switch(action.type){
        case 'LOGIN_ERROR': 
        console.error('LOGIN_ERROR')
        return {
            ...state,
            authError: 'LOGIN FAILED'
        }
        case 'LOGIN_SUCCESS':
            console.log('LOGIN SUCCESS')
            return {
                ...state,
                authError: null
            }
        case 'SIGNOUT_SUCCESS':
            console.log('SIGNOUT_SUCCESS')
            return state
        case 'SIGNUP_SUCCESS':
            console.log('SIGNUP_SUCCESS')
            return {
                ...state,
                authError: null
            }
        case 'SIGNUP_FAILED':
            console.log('SIGNUP_FAILED')
            return{ 
                authError: action.err.message
            }

        default:
            return state
    }
}

export default authReducer