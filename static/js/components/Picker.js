import React from 'react'
import PropTypes from 'prop-types'

const Picker = ({ value, onChange, options }) => (
    <div className="form-group">
     <label for="sel1">Select from the drop down
     control to list <em>upcoming</em> events or <em>past</em> events.
     Click on an heading to view information about it.
     From there, a link leads to the Meetup page for the event, from
     which you can book to attend.</label>
    <select className="form-control" onChange={e => onChange(e.target.value)}
            value={value} id="sel1">
      {options.map(option =>
        <option value={option} key={option}>
          {option.charAt(0).toUpperCase() + option.slice(1)}
        </option>)
      }
    </select>
  </div>
)

Picker.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.string.isRequired
  ).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}

export default Picker
