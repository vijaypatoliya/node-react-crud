import { toastActions } from "../Store/toast";
import { loaderActions } from "../Store/loading";
import { authActions } from "../Store/auth";
import axios from "axios";
export const loginUser = (user) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      dispatch(loaderActions.showLoading(true));

      try {
        return await axios.post(`${process.env.REACT_APP_URL}user/login`, user);
      } catch (err) {
        return {
          error: true,
          response: err.response,
        };
      }
    };
    const result = await sendRequest();
    await handleResponse(dispatch , result , null)

    if(result.data && result.data.data.token){
     
      localStorage.setItem('userToken' , JSON.stringify({
        token:result.data.data.token , id:result.data.data['_id']
    }))
      dispatch(authActions.login({ isAuthenticated: true, user: result.data.user }))
    }
  };
};

export const registerUser = (user) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      dispatch(loaderActions.showLoading(true));

      try {
        return await axios.post(`${process.env.REACT_APP_URL}user/registration`, user);
      } catch (err) {
        return {
          error: true,
          response: err.response,
        };
      }
    };
    const result = await sendRequest();
    dispatch(authActions.signUp(false))
    if(result.data) {      
      dispatch(authActions.signUp(true))
    }
    await handleResponse(dispatch , result , null)
  };
};

const handleResponse = (dispatch , result , url ) => {
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
}
 

export const logout = () => {
  return async (dispatch) => {
    localStorage.removeItem("userToken");
  dispatch(authActions.logout(false))
  };
};
 
 