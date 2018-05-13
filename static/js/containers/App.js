import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { selectTimedir, fetchMeetupsIfNeeded, invalidateTimedir } from '../actions'
import Meetups from '../components/Meetups'
import Picker from '../components/Picker'

class App extends Component {

  componentDidMount() {
    const { dispatch, selectedTimedir, groupname, apikey } = this.props
    dispatch(fetchMeetupsIfNeeded(selectedTimedir, groupname, apikey))
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedTimedir !== this.props.selectedTimedir) {
      const { dispatch, selectedTimedir, groupname, apikey } = nextProps
      dispatch(fetchMeetupsIfNeeded(selectedTimedir, groupname, apikey))
    }
  }

  handleChange = nextTimedir => {
    this.props.dispatch(selectTimedir(nextTimedir))
  }

  handleRefreshClick = e => {
    e.preventDefault()

    const { dispatch, selectedTimedir, groupname, apikey } = this.props
    dispatch(invalidateTimedir(selectedTimedir))
    dispatch(fetchMeetupsIfNeeded(selectedTimedir, groupname, apikey))
  }

  static propTypes = {
    selectedTimedir: PropTypes.string.isRequired,
    meetups: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number,
    dispatch: PropTypes.func.isRequired,
    selectedMeetup: PropTypes.optionalObject,
    groupname: PropTypes.string.isRequired,
    apikey: PropTypes.string.isRequired
  }


  render() {
    const { selectedTimedir, meetups, isFetching, lastUpdated, groupname, apikey } = this.props
    const isEmpty = meetups.length === 0
    return (
      <div><p>
      <Picker value={selectedTimedir}
              onChange={this.handleChange}
              options={[ 'upcoming', 'past' ]} />
        </p>
        <p>
          {lastUpdated &&
            <span>
              Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
              {' '}
            </span>
          }
          {!isFetching &&
            <button className="btn btn-default" onClick={this.handleRefreshClick}>
              Refresh
            </button>
          }
        </p>
        {isEmpty
          ? (isFetching ? <h2>Loading...</h2> : <h2>Empty.</h2>)
          : <div style={{ opacity: isFetching ? 0.5 : 1 }}>
              <Meetups meetups={meetups} groupname={groupname} apikey={apikey} />
            </div>
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { selectedTimedir, meetupsByTimedir } = state
  const {
    isFetching,
    lastUpdated,
    items: meetups
  } = meetupsByTimedir[selectedTimedir] || {
    isFetching: true,
    items: []
  }

  return {
    selectedTimedir,
    meetups,
    isFetching,
    lastUpdated
  }
}

export default connect(mapStateToProps)(App)
