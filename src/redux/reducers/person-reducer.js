import {
  GET_PERSONS_REQUEST,
  GET_PERSONS_SUCCESS,
  GET_PERSONS_FAIL,
  DELETE_PERSON_REQUEST,
  DELETE_PERSON_SUCCESS,
  DELETE_PERSON_FAIL,
  DELETE_PERSON,
  ADD_PERSON_REQUEST,
  ADD_PERSON_SUCCESS,
  ADD_PERSON_FAIL,
  SET_PERSONS,
  FILTER_PERSONS,
  SET_DISPLAYED_PERSONS,
  SET_MODAL,
  SET_DATA
} from '../constants/person-constants'

const initialState = {
  showModal: false,
  isFetched: false,
  isDeleted: false,
  isAdded: false,
  error: null,
  persons: {
    data:[],
    additional_data:{
      pagination: {
        more_items_in_collection : true,
        next_start: 0
      }
    }
  },
  displayedPersons: []
}

export default function(state = initialState, action) {
  switch (action.type) {
    
    case GET_PERSONS_REQUEST:
      return {
        ...state,
        isFetched: true
      }

    case GET_PERSONS_SUCCESS:
      return {
        ...state,
        isFetched: false
      }

    case GET_PERSONS_FAIL:
      return {
        ...state,
        isFetched: false,
        error: action.payload
      }

    case DELETE_PERSON_REQUEST:
      return {
        ...state,
        isDeleted: true
      }

    case DELETE_PERSON_SUCCESS:
      return {
        ...state,
        isDeleted: false
      }

    case DELETE_PERSON_FAIL:
      return {
        ...state,
        isDeleted: false,
        error: action.payload
      }

      case DELETE_PERSON:
      return {
        ...state,
        persons: {
          ...state.persons,
          data: action.payload
        }
      }

   case ADD_PERSON_REQUEST:
      return {
        ...state,
        isAdded: true
      }

    case ADD_PERSON_SUCCESS:
      return {
        ...state,
        isAdded: false
      }

    case ADD_PERSON_FAIL:
      return {
        ...state,
        isAdded: false,
        error: action.payload
      }


    case SET_PERSONS:
    return {
      ...state,
      persons: {
        data: [
          ...state.persons.data,
          ...action.payload.data
        ],
        additional_data:action.payload.additional_data
      }
    }

  
    case SET_DATA:
    return {
      ...state,
      persons: {
        ...state.persons,
        data: action.payload
      }
    }
  


  case SET_DISPLAYED_PERSONS:
      return {
        ...state,
        displayedPersons: action.payload
      }

    case FILTER_PERSONS:
      return {
        ...state,
        displayedPersons: action.payload
      }

  case SET_MODAL:
      return {
        ...state,
        showModal: action.payload
      }


    default:
      return state
  }
}
