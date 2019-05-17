import { LOAD_MESSAGE, REMOVE_MESSAGE } from "../actionTypes";

const Message = (state = [], action) => {
  switch (action.type) {
    case LOAD_MESSAGE:
      return [...action.messages];
    case REMOVE_MESSAGE:
      return state.filter(message => message._id !== action.id);
    default:
      return state;
  }
};

export default Message;
