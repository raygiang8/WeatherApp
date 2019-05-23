import React from 'react';

const SearchResults = (props) => {
  if (props.searchResults === null) {
    return (<div className="hidden"></div>);
  }

  let locationOptions = props.searchResults.map((location, index) =>
    <div 
        className={props.currentSelection===index ? 'selected' : ''} 
        onClick={()=>{props.locChange(index, location.lat, location.lon, location.display_name)}}
        key={index} >
      {location.display_name}
    </div>
  );

  return (
    <fieldset>
      <legend>Possible Locations</legend>
      {locationOptions}
    </fieldset>
  );
}

export default SearchResults;