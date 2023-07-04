import { NOTES_CREATE_FAIL, NOTES_CREATE_REQUEST, NOTES_CREATE_SUCCESS, NOTES_DELETE_FAIL, NOTES_DELETE_REQUEST, NOTES_DELETE_SUCCESS, NOTES_LIST_FAIL, NOTES_LIST_REQUEST, NOTES_LIST_SUCCESS, NOTES_UPDATE_FAIL, NOTES_UPDATE_REQUEST, NOTES_UPDATE_SUCCESS } from "../constants/notesConstant";

export const  noteListReducer = (state = {}, action) => {
  switch(action.type) {
    case NOTES_LIST_REQUEST:
      return {loading:true};
    case NOTES_LIST_SUCCESS:
      return {loading:false, notes: action.payload };
    case NOTES_LIST_FAIL:
      return {loading:false, error: action.payload };
   
    default:
       return state;
  }
};

export const  noteListof10Reducer = (state = {}, action) => {
  switch(action.type) {
    case NOTES_LIST_REQUEST:
      return {loading:true};
    case NOTES_LIST_SUCCESS:
      return {loading:false, notes: action.payload };
    case NOTES_LIST_FAIL:
      return {loading:false, error: action.payload };
   
    default:
       return state;
  }
};

export const  noteCreateReducer = (state = {}, action) => {
  switch(action.type) {
    case NOTES_CREATE_REQUEST:
      return {loading:true};
    case NOTES_CREATE_SUCCESS:
      return {loading:false, sucess: true};
    case NOTES_CREATE_FAIL:
      return {loading:false, error: action.payload };
   
    default:
       return state;
  }
};

export const  noteUpdateReducer = (state = {}, action) => {
  switch(action.type) {
    case NOTES_UPDATE_REQUEST:
      return {loading:true};
    case NOTES_UPDATE_SUCCESS:
      return {loading:false, sucess: true};
    case NOTES_UPDATE_FAIL:
      return {loading:false, error: action.payload, sucess: false };
   
    default:
       return state;
  }
};


export const  noteDeleteReducer = (state = {}, action) => {
  switch(action.type) {
    case NOTES_DELETE_REQUEST:
      return {loading:true};
    case NOTES_DELETE_SUCCESS:
      return {loading:false, sucess: true};
    case NOTES_DELETE_FAIL:
      return {loading:false, error: action.payload, sucess: false };
   
    default:
       return state;
  }
};