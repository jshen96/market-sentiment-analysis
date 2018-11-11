import * as types from '../actions_types.js';
const initialState = {
    companies: {
        "nodes": [
          {"name": "me", "level": 0, "group": 0 },
          {"name": "iOS", "level": 1, "group": 1 },
          {"name": "C", "level": 1, "group": 2 },
          {"name": "React", "level": 1, "group": 3 },
          {"name": "Swift", "level": 2, "group": 1 },
          {"name": "Obj-C", "level": 2, "group": 1 },
          {"name": "React-Native", "level": 2, "group": 3 },
          {"name": "Python", "level": 1, "group": 4 },
          {"name": "C++", "level": 2, "group": 2 },
          {"name": "ML", "level": 1, "group": 3 },
          {"name": "GO", "level": 1, "group": 2},
          {"name": "node.js", "level": 2, "group": 1},
          {"name": "SQL", "level": 1, "group": 1}
        ],
        "links": [
          { "target": 1, "source": 0 },
          { "target": 2, "source": 0 },
          { "target": 3, "source": 0 },
          { "target": 4, "source": 1 },
          { "target": 5, "source": 1 },
          { "target": 6, "source": 3 },
          { "target": 7, "source": 0 },
          { "target": 8, "source": 2 },
          { "target": 9, "source": 0 },
          { "target": 10, "source": 0 },
          { "target": 11, "source": 10 },
          { "target": 12, "source": 0 }
        ]
      }
}

export default (state = initialState, action) => {
    switch (action.type) {
        case types.REFRESH_LIST:
            return {
                ...state,
                companies: action.payload,
       
            }
        case types.RESET_LIST:
            return initialState;
        default:
            return state;

    }
}