import React, { Component } from 'react';

class LocationSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      location: ''
    }
  }

  inputChanged = (e) => {
    this.setState({
      location: e.target.value
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.changeLoc(this.state.location);
    e.currentTarget.reset();
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" 
          value={this.state.location}
          onChange={this.inputChanged}
        />
        <input
          type="submit"
          value="Change Location"
        />
      </form>
    );
  }
}

export default LocationSearch;