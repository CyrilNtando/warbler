import { apiCall } from "../../services/api";
import { addError } from "./errors";
import { LOAD_MESSAGE, REMOVE_MESSAGE } from "../actionTypes";

export const postNewMessage = text => {
  return (dispatch, getState) => {
    //distruct current user from get state
    let { currentUser } = getState();
    const id = currentUser.user.id;
    return apiCall("post", `/api/users/${id}/messages`, { text })
      .then(res => {
        dispatch(fetchMessages);
      })
      .catch(error => {
        addError(error);
      });
  };
};
//get messages from Api
export const fetchMessages = () => {
  return dispatch => {
    return apiCall("get", "/api/messages")
      .then(res => {
        dispatch(loadMessages(res));
      })
      .catch(err => {
        addError(err.message);
      });
  };
};

export const removeMessage = (user_id, message_id) => {
  return dispatch => {
    return apiCall("delete", `/api/users/${user_id}/messages/${message_id}`)
      .then(res => {
        dispatch(remove(message_id));
        dispatch(fetchMessages);
      })
      .catch(error => {
        addError(error.message);
      });
  };
};
export const remove = id => ({
  type: REMOVE_MESSAGE,
  id: id
});
export const loadMessages = messages => ({
  type: LOAD_MESSAGE,
  messages: messages
});
