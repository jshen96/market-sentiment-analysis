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

export const resetPopulation = ()=> {
    return {
      type: types.RESET_LIST,
      payload: {
        companies: []
      }
  
    };
  }

export const populateData = () => {
  return (dispatch) => {
      console.log("Populate data called")
    return axios.get(`${API_URL}/getList`)
      .then(response => {
        dispatch(initializeSystem(0,response))
        console.log("Fetch success: populate")
      })
      .catch(error => {
        //FIXME: do smth with error
        console.log("Lobby: Axios failed with error ", error)
        dispatch(initializeSystem(-1, error.response))
        //NotificationService.notifyError(error)
      })
  }
}

export const initializeSystem = (status, data) => {
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
  console.log("Initialize system")
  console.log(data.data)
  return {
    type: types.REFRESH_LIST,
    status: status,
    payload: {
      companies: data.data,
    }
  }
}