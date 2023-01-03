import { useReducer, createContext } from "react";

const INITIAL_STATE = {
    city: undefined,
    dates: [],
    options: {
        adult: undefined,
        children: undefined,
        room: undefined
    },
}

export const SearchContext = createContext(INITIAL_STATE);

//reducer
const SearchReducer = (state, action) => {
    switch (action.type) {
        case "NEW_SEARCH":
            return action.payload;
        case "RESET_SEARCH":
            return INITIAL_STATE;
        default:
            return state;
    }
}

//lets use this reducer in our context
export const SearchContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(SearchReducer, INITIAL_STATE);

    return (
        <SearchContext.Provider value={{ city: state.city, dates: state.dates, options: state.options, dispatch }}>
            {children}
        </SearchContext.Provider>
    )
}

//in this case we gonna need it in home page, in list page, and in Hotel page, basically we need it everywhere, so we can just wrap our entire application
//with that