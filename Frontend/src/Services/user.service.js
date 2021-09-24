import { toastActions } from "../Store/toast";
import { loaderActions } from "../Store/loading";
import { userActions } from "../Store/user";

import axios from "axios";
const token = JSON.parse(localStorage.getItem('userToken')).token;
export const getUser = (id) => {
  let config = {
    headers: {
      'x-access-token': token
    }
  }

  return async (dispatch) => {
    const sendRequest = async () => {
      dispatch(loaderActions.showLoading(true));

      try {
        return await axios.get(`${process.env.REACT_APP_URL}user/${id}` , config);
      } catch (err) {
        return {
          error: true,
          response: err.response,
        };
      }
    };
    const result = await sendRequest();
    if (result.data) {
      dispatch(userActions.setUser({ user: result.data.data }));
    }
    await handleResponse(dispatch, result, null);
  };
};
 
export const updateUser = (user) => {  
  
  let fd = new FormData()
  Object.keys(user).map((e) => {
    if (user[e] !== undefined) {
      fd.append(e, user[e]);
    }
  });
  let config = {
    headers: {
      'x-access-token':token,
      'Content-Type': 'multipart/form-data',
    },
  }

  return async (dispatch) => {
    
    const sendRequest = async () => {
      dispatch(loaderActions.showLoading(true));

      try {
        return await axios.put(
          `${process.env.REACT_APP_URL}user/update-profile`,
          fd,
          config
        );
      } catch (err) {
        return {
          error: true,
          response: err.response,
        };
      }
    };
    const result = await sendRequest();
    if (result.data ) {
      dispatch(userActions.updateUser({ updatedUser: result.data.data }))
    }
    await handleResponse(dispatch, result, null);
  };
};


const handleResponse = (dispatch, result, url) => {
  if (result.error) {
    dispatch(loaderActions.showLoading(false));
    dispatch(
      toastActions.showNotification({
        message: result.response.data.message,
        status: "danger",
      })
    );
  } else {
    dispatch(
      toastActions.showNotification({
        message: result.data.message,
        status: "success",
      })
    );

    dispatch(loaderActions.showLoading(false));    
  }
};
 
 