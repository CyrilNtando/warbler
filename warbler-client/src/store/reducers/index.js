import { combineReducers } from "redux";
import currentUser from "./currentUser";
import messages from "./messages";
import errors from "./errors";

const rootReducer = combineReducers({
  currentUser: currentUser,
  errors: errors,
  messages: messages
});

export default rootReducer;
