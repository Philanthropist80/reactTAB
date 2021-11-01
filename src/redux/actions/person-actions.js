import defaultData from '../../redis/person/defaultData';
import  createConnection  from '../../redis/connection/connection';
import {
  GET_PERSONS_REQUEST,
  GET_PERSONS_SUCCESS,
  GET_PERSONS_FAIL,
  SET_PERSONS,
  FILTER_PERSONS,
  SET_DISPLAYED_PERSONS,
  SET_MODAL,
  DELETE_PERSON_REQUEST,
  DELETE_PERSON_SUCCESS,
  DELETE_PERSON_FAIL,
  DELETE_PERSON,
  ADD_PERSON_REQUEST,
  ADD_PERSON_SUCCESS,
  ADD_PERSON_FAIL,
  ADD_PERSON,
  SET_DATA
} from '../constants/person-constants'

//const base_url = 'https://taimoor-94a2c5.pipedrive.com/v1';
//const api_token = '9959f46241f9ad08e4d7760d4b4565fad7b68786';

const base_url = 'https://taimoor-006219.pipedrive.com/v1'
const api_token = '283668278bfc5c1ccc2dac25aca3314b9a2abd59'

export function setModal(isShow) {
  return {
    type: SET_MODAL,
    payload: isShow
  }
}

function setPersons(data) {
console.log('setPersons ', data)

  let persons = {}
  persons.data = data.data

  persons.data.forEach((element, ind) => {
    if (ind === 3) {
      element.imgsrc = ''
    } else {
      element.imgsrc = 'https://picsum.photos/id/' + ind * 7 + '/200/200'
    }
  })

  persons.additional_data = data.additional_data

  return {
    type: SET_PERSONS,
    payload: persons
  }
}

export function getPersons(start, limit) {
  return (dispatch, getState) => {
    dispatch({
      type: GET_PERSONS_REQUEST
    })

    if (
      getState().personPage.persons.additional_data.pagination !== undefined
    ) {
      if (
        getState().personPage.persons.additional_data.pagination
          .more_items_in_collection === false
      ) {
        dispatch({
          type: GET_PERSONS_FAIL,
          payload: 'No More Records'
        })
        return
      }
      start = getState().personPage.persons.additional_data.pagination
        .next_start
    } else start = 0

    return fetchGET(
      //base_url + '/persons?start=' + start + '&limit=' + limit + '&api_token=' + api_token
    ).then(response => {
        
      if (response.ok) {
            return response.data
        }
        

        //throw new Error(`${response.status}: ${response.statusText}`)
                                      


      
      })
      .then(data => {
        dispatch({
          type: GET_PERSONS_SUCCESS
        })
        
        dispatch(setPersons(data))
        dispatch(filterPersons())
      })
      .catch(error => {
          


       dispatch({
          type: GET_PERSONS_FAIL,
          payload: error.message
        })
      })
  }
}

function fetchGET(){
return new Promise((resolve, reject)=>{
  try{
    var client = createConnection().then((client)=> {return client;});
    var data = {};
    client.hget('defaultData', 'defaultData', async (err, jobs) => {
      if (err) throw err;

      if (jobs) {
        data = {
            data: JSON.parse(jobs),
            additional_data: ''
        }
          
      }
      else {
     /*     const jobs = await axios.get(`https://jobs.github.com/positions.json?search=${searchTerm}`);
          client.setex(searchTerm, 600, JSON.stringify(jobs.data));
          res.status(200).send({
              jobs: jobs.data,
              message: "cache miss"
          });*/

          defaultData();


      }
  });

      resolve({ok:200, data:data});

  } catch(err){
    try{
      var jsonObj = ([
        {id:1,  initials: 'Mr.',name: 'Taimoor',phone: '234234',email: 'tab@tab.com',organization: 'qwewqe',assistant: 'qwe',group: 'qwe',location: 'ISB',imgsrc: ''},
        {id:2, initials: 'Mr.',name: 'Taimoor Adil',phone: '544332',email: 'tabadil@tab.com',organization: 'qwewqe',assistant: 'qwe',group: 'qwe',location: 'ISB',imgsrc: ''},
        {id:3, initials: 'Mr.',name: 'John Trivolta',phone: '5544',email: 'adil@tab.com',organization: 'qwewqe',assistant: 'qwe',group: 'qwe',location: 'ISB',imgsrc: ''},
        {id:4, initials: 'Mr.',name: 'Alex Bradman',phone: '234234',email: 'tab@tab.com',organization: 'qwewqe',assistant: 'qwe',group: 'qwe',location: 'ISB',imgsrc: ''},
        {id:5, initials: 'Mrs.',name: 'Julia Smith',phone: '544332',email: 'tabadil@tab.com',organization: 'qwewqe',assistant: 'qwe',group: 'qwe',location: 'ISB',imgsrc: ''},
        {id:6, initials: 'Miss',name: 'Alia Rasheed',phone: '5544',email: 'alia.rasheed@tab.com',organization: 'qwewqe',assistant: 'qwe',group: 'qwe',location: 'ISB',imgsrc: ''},
        {id:7, initials: 'Miss',name: 'Sumera Akbar',phone: '234234',email: 'tab@tab.com',organization: 'qwewqe',assistant: 'qwe',group: 'qwe',location: 'ISB',imgsrc: ''},
        {id:8, initials: 'Mr.',name: 'David Boon',phone: '544332',email: 'david.boon@tab.com',organization: 'qwewqe',assistant: 'qwe',group: 'qwe',location: 'ISB',imgsrc: ''},
        {id:9, initials: 'Mr.',name: 'Adil Taimoor',phone: '5544',email: 'adil.tab@tab.com',organization: 'qwewqe',assistant: 'qwe',group: 'qwe',location: 'ISB',imgsrc: ''},
    ]);
    data = {
      data: jsonObj,
      additional_data: ''
    }
    

    resolve({ok:200, data:data});
    }catch(err){
      reject({ok:404, data:[], error:"Error: " + err});
    }
      
  }    
  
      
        }) 

}


export function deletePerson(index) {
  return (dispatch, getState) => {
    dispatch({
      type: DELETE_PERSON_REQUEST
    })

    const id = getState().personPage.persons.data[index].id
    const data = getState().personPage.persons.data;
    return fetchDELETE(id, data, dispatch
      //base_url + '/persons/' + id + '?api_token=' + api_token, {
      //method: 'DELETE'
      //}
    )
      .then(response => {
        console.log(response)
        if (response.ok) {
          return response
        }

        throw new Error(`${response.status}: ${response.statusText}`)
      })
      .then(data => {
        dispatch({
          type: DELETE_PERSON_SUCCESS
        })

        const filteredDeletedIndex = getState().personPage.persons.data.filter(
          person => {
            return person.id !== id
          }
        )

        dispatch(setPersonsAfterDelete(filteredDeletedIndex))
        dispatch(filterPersons())
      })
      .catch(error => {
        dispatch({
          type: DELETE_PERSON_FAIL,
          payload: error.message
        })
      })
  }
}

function fetchDELETE(id, data, dispatch){
  return new Promise((resolve, reject)=>{
    try{
      console.log("Before Filter", data);     
        data = data.filter(item => item.id != id);
        console.log("After Filter", data);
        dispatch({
          type: SET_DATA,
          payload: data
        })
     


        resolve({ok:200, data:data});
  
    } catch(err){
      
        reject({ok:404, data:[], error:"Error: " + err});
       
    }    
    
  }) 
}

export function addPerson(person) {
    
  return (dispatch, getState) => {
    
  
  /*  
    dispatch({
      type: ADD_PERSON_REQUEST
    })

    return fetch(base_url + '/persons/?api_token=' + api_token, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(person)
    })*/
    return fetchADD(person,getState, dispatch) .then(response => {
        console.log(response)
        if (response.ok) {
          return response
        }

        throw new Error(`${response.status}: ${response.statusText}`)
      })
      .then(data => {
        dispatch({
          type: ADD_PERSON_SUCCESS
        })

        dispatch(filterPersons())
      })
      .catch(error => {
        dispatch({
          type: ADD_PERSON_FAIL,
          payload: error.message
        })
      })
  }
}

function fetchADD(item,getState,dispatch){
  return new Promise((resolve, reject)=>{
    try{
      const data = getState().personPage.persons.data;
      console.log("Before Filter", item);    
      item.id = data.length + 1; 
        data.push(item);
        console.log("After Filter", data);
        dispatch({
          type: SET_DATA,
          payload: data
        })
     


        resolve({ok:200, data:data});
  
    } catch(err){
        reject({ok:404, data:[], error:"Error: " + err});
      }
        
    
  }) 
}

export function filterPersons(searchString = '') {
  return (dispatch, getState) => {
    console.log(getState().personPage.persons.data)
    const displayedPersons = getState().personPage.persons.data.filter(
      person => {
        //return person.name.toLowerCase().includes(searchString.toLowerCase()) // For Contains Filter
        return person.name.toLowerCase().startsWith(searchString.toLowerCase()) // For StartsWith Filter
      }
    )

    dispatch({
      type: FILTER_PERSONS,
      payload: displayedPersons
    })
  }
}

function setPersonsAfterDelete(data) {
  return {
    type: DELETE_PERSON,
    payload: data
  }
}

export function setDisplayedPersons(data) {
  return {
    type: SET_DISPLAYED_PERSONS,
    payload: data
  }
}
