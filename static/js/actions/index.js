import fetchJsonp from 'fetch-jsonp'
export const REQUEST_MEETUPS = 'REQUEST_MEETUPS'
export const RECEIVE_MEETUPS = 'RECEIVE_MEETUPS'
export const SELECT_TIMEDIR = 'SELECT_TIMEDIR'
export const INVALIDATE_TIMEDIR = 'INVALIDATE_TIMEDIR'


export const selectTimedir = timedir => ({
  type: SELECT_TIMEDIR,
  timedir
})

export const invalidateTimedir = timedir => ({
  type: INVALIDATE_TIMEDIR,
  timedir
})

export const requestMeetups = timedir => ({
  type: REQUEST_MEETUPS,
  timedir
})

export const receiveMeetups = (timedir, json) => ({
  type: RECEIVE_MEETUPS,
  timedir,
  meetups: json.data.map(child => child),
  receivedAt: Date.now()
})

const fetchMeetups = (timedir, groupname, apikey) => dispatch => {
  dispatch(requestMeetups(timedir))
  return fetchJsonp(`https://api.meetup.com/${groupname}/events?&sign=true&photo-host=public&page=20&status=${timedir}&key=${apikey}&desc=true`, { method: 'GET',
               mode: 'cors'})
    .then(response => response.json())
    .then(json => dispatch(receiveMeetups(timedir, json)))
    .catch(function(err) {
    console.log('Fetch Error :-S', err);
  })
}


const shouldFetchMeetups = (state, timedir) => {
  const meetups = state.meetupsByTimedir[timedir]
  if (!meetups) {
    console.log("Waiting");
    return true
  }
  if (meetups.isFetching) {
    console.log("Fetching");
    return false
  }
  console.log("Other");
  return meetups.didInvalidate
}

export const fetchMeetupsIfNeeded = (timedir, groupname, apikey) => (dispatch, getState) => {
  if (shouldFetchMeetups(getState(), timedir)) {
    return dispatch(fetchMeetups(timedir, groupname, apikey))
  }
}
