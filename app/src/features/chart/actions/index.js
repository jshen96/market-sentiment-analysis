import * as types from '../actions_types.js';
import axios from 'axios';
import {API_URL} from '../../../config';
import {updateNotification} from '../../../NotificationService';
export const receivedMessage = (msg)=> {
  return {
    type: types.RECEIVED_UPDATE,
    payload: {
      sender: msg.sender,
      request: msg.request,
      content: msg.content
    }

  };
}

export const resetChart = (msg)=> {
    return {
      type: types.RESET_CHART,
      payload: {
        articles: [],
        trends: {},
        stock: {},
        name: "",
        id: ""
      }
  
    };
  }

export const populateChart = (company_id) => {
  return (dispatch) => {
    return axios.post(`${API_URL}/company`,{"company_id": company_id.toString()})
      .then(response => {
        dispatch(initializeChart(0,response))

      })
      .catch(error => {
        //FIXME: do smth with error
        console.log("Lobby: Axios failed with error ", error)
        dispatch(initializeChart(-1, error.response))
        //NotificationService.notifyError(error)
      })
  }
}

export const initializeChart = (status, data) => {
  console.log("Lobby: Initialized has called")
  if (status != 0) {
    let error = ""
    if (data == null) {
     // error = err.SERVER_DISCONNECTED
    } else {
      error = data.data.error
    }
    //NotificationService.notifyError(error)
    return {
      type: types.ERROR,
      status: status,
    }
  }

  return {
    type: types.POPULATE_CHART,
    status: status,
    payload: {
      articles: data.data.result.articles,
      trends: data.data.result.trends,
      stock: data.data.result.stock,
      id: data.data.result.id,
      name: data.data.result.name
    }
  }
}