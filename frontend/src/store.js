import {createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools} from 'redux-devtools-extension';
import { userLoginReducer, userRegisterReducer, userUpdateReducer } from './reducers/userReducers';
import { noteCreateReducer, noteDeleteReducer, noteListof10Reducer, noteListReducer, noteUpdateReducer } from './reducers/notesReducer';

const reducer = combineReducers({
 userLogin : userLoginReducer,
 userRegister : userRegisterReducer,
 noteList : noteListReducer,
 noteCreate: noteCreateReducer,
 noteUpdate: noteUpdateReducer,
 noteDelete: noteDeleteReducer,
 userUpdate: userUpdateReducer,
 noteListof10: noteListof10Reducer,
});

 const userInfoFromLocalStorage = localStorage.getItem("userInfo")
   ? JSON.parse(localStorage.getItem("userInfo"))
   : null;
const initialState = {
  userLogin : {userInfo: userInfoFromLocalStorage},
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
 composeWithDevTools( applyMiddleware(...middleware))
);

export default store;