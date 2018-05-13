import React from 'react'
import PropTypes from 'prop-types'

const Picker = ({ value, onChange, options }) => (
    <div className="form-group">
     <label for="sel1">Click on the Meetups that you wish to view:</label>
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
