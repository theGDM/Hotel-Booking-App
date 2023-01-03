import { useReducer, createContext, useEffect } from "react";

const INITIAL_STATE = {
    user: JSON.parse(localStorage.getItem("user")) || null,
    loading: false,
    error: null
}

export const AuthContext = createContext(INITIAL_STATE);

//reducer
const AuthReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN_START":
            return {
                user: null,
                loading: true,
                error: null
            };
        case "LOGIN_SUCCESS":
            return {
                user: action.payload,
                loading: false, //as we are ending our fetching process
                error: null
            };
        case "LOGIN_FAILURE":
            return {
                user: null,
                loading: false, //as we are ending our fetching process
                error: action.payload
            };
        case "LOGOUT":
            return {
                user: null,
                loading: false, //as we are ending our fetching process
                error: null
            };
        default:
            return state;
    }
}

//lets use this reducer in our context
export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(state.user));
    }, [state.user]); //this time the dependency on the user
    return (
        <AuthContext.Provider value={{ user: state.user, loading: state.loading, error: state.error, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}

//in this case we gonna need it in home page, in list page, and in Hotel page, basically we need it everywhere, so we can just wrap our entire application
//with that