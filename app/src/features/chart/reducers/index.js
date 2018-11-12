import * as types from '../actions_types.js';
const initialState = {
    articles: [{
     
        content: 'test test test tes t'
      },{
       
        content: 'test testfasdfa test tes t'
      },{
       
        content: 'test test sdstest tes t'
      },{
       
        content: 'test test test tes t'
      }],
    trends: {
        labels: ["one", "two", "three","one", "two", "three"],
        name: "date",
        data: [4,15, -8,15,30, 9]
    },
    stock: {
            labels: ["one", "two", "three","one", "two", "three"],
            name: "Economy",
            data : [10,5, -7,20,30, 18]
    }
    ,
    name: "",
    id: ""
}

export default (state = initialState, action) => {
    switch (action.type) {
        case types.POPULATE_CHART:
        //stock: action.payload.stock,
            return {
                ...state,
                articles: action.payload.articles,
                trends: action.payload.trends,
                
                name: action.payload.name,
                id: action.payload.id
            }
        case types.RESET_CHART:
            return initialState;
        default:
            return state;

    }
}