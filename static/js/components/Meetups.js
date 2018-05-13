import React from 'react'
import PropTypes from 'prop-types'
var moment = require('moment');


function HowToFind(props) {
  const finddata = props.how_to_find_us;
  if (finddata) {
    return <p><span className="glyphicon glyphicon-search"></span> <strong>How to find us:</strong> {props.how_to_find_us}</p>;
  }
}

function HowToPrice(props) {
  if (props.fee) {
    return <p><span className="glyphicon glyphicon-credit-card"></span> <strong>{props.fee.label[0].toUpperCase() + props.fee.label.slice(1)}:&nbsp;</strong>
     {props.fee.amount}&nbsp;{props.fee.currency}</p>;
  }
}

function HowToPlace(props) {
    if (!props.venue) {
        return <div></div>
    }
    var addarray = [props.venue.address_1];
    if (props.venue.address_2) {
        addarray.push(props.venue.address_2);
    }
    if (props.venue.address_3) {
        addarray.push(props.venue.address_3);
    }
    if (props.venue.city) {
        addarray.push(props.venue.city);
    }
    if (props.venue.state) {
        addarray.push(props.venue.state);
    }
    var addarrayout = addarray.join(", ");
    return <div><p><span className="glyphicon glyphicon-globe"></span> <strong>Place: <em>{props.venue.name}</em></strong></p>
    <p>{addarrayout}</p></div>;
}


function HowToTime(props) {
    var durationmin = props.duration / 60000;
    var localdate = moment(props.local_date, "YYYY-MM-DD");
    var localdateformat = localdate.format('dddd MMMM Do YYYY');
    var timebegin = moment(props.local_time, moment.HTML5_FMT.TIME);
    var timeend = moment(timebegin).add(durationmin, 'minutes');
    var timebeginformat = timebegin.format('LT');
    var timeendformat = timeend.format('LT');
    return <p><span className="glyphicon glyphicon-calendar"></span> <strong>Time:</strong>  {localdateformat} {timebeginformat} to {timeendformat}</p>;
}


const Meetups = ({meetups, groupname, apikey}) => (
  <ul className="list-group">
    {meetups.map((meetup, i) =>
      <li className="list-group-item" key={i}>
          <div className="panel-group" id={`accordion-${i}x`}>
          <div className="panel panel-primary">
          <div className="panel-heading">
            <h4 className="panel-title">
              <a className="accordion-toggle collapsed" data-toggle="collapse" data-parent={`#accordion-${i}x`} href={`#collapse-${i}x`} aria-expanded="false">
                {meetup.name}</a>
            </h4>
          </div>
          <div className="panel-collapse collapse" aria-expanded="false" id={`collapse-${i}x`}>
            <h2 className="caption text-center">{meetup.name}</h2>
            <div className="jumbotron panel-footer panel-info">
                 {HowToPrice(meetup)}
                 {HowToTime(meetup)}
                 {HowToPlace(meetup)}
                 {HowToFind(meetup)}
                 <p><a className="btn btn-primary" href={meetup.link}>Please book on the Meetup page for the event.</a></p>



            </div>
            <div className="panel-body" dangerouslySetInnerHTML={ {"__html": meetup.description }} />
          </div>
          </div>
          </div>


      </li>
    )}
  </ul>
)



Meetups.propTypes = {
  meetups: PropTypes.array.isRequired,
  groupname: PropTypes.string.isRequired,
  apikey: PropTypes.string.isRequired
}

export default Meetups

/*
<div class="panel-group" id="accordion">
<div class="panel panel-primary">
<div class="panel-heading">
  <h4 class="panel-title">
    <a class="accordion-toggle collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapse-1" aria-expanded="false">
      data-toggle="collapse" data-parent="#accordion" href="#collapse-1"
    </a>
  </h4>
</div>
<div class="panel-collapse collapse" id="collapse-1" aria-expanded="false" style="height: 0px;">
  <div class="panel-body">#collapse-1.collapse.in</div>
</div>
</div>
<div class="panel panel-primary">
<div class="panel-heading">
  <h4 class="panel-title">
    <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion" href="#collapse-2" aria-expanded="true">
      data-toggle="collapse" data-parent="#accordion" href="#collapse-2"
    </a>
  </h4>
</div>
<div class="panel-collapse collapse in" id="collapse-2" aria-expanded="true" style="">
  <div class="panel-body">#collapse-2.collapse</div>
</div>
</div>
</div> */
