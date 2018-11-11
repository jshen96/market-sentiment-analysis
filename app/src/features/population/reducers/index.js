import * as types from '../actions_types.js';
const initialState = {
    companies: {
      }
}

export default (state = initialState, action) => {
    switch (action.type) {
        case types.REFRESH_LIST:
            return {
                ...state,
                companies: action.payload.companies,
       
            }
        case types.RESET_LIST:
            return initialState;
        default:
            return state;

    }
}