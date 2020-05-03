const initialState = {
    isAuthenticated: false,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SUCCESS':
            return {
                ...initialState,
                isAuthenticated: true
            }
        default:
            return state;

    }
}

export default authReducer;