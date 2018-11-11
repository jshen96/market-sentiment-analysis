import { combineReducers } from "redux";
import popReducer from "../../features/population/reducers";
import chartReducer from "../../features/chart/reducers";

export const rootReducer = combineReducers({
    population: popReducer,
    chart: chartReducer,
   
});