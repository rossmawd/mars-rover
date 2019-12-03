import React from 'react';
import './App.css';

class App extends React.Component {
  state = {
    sizeOfPlateau: null,
    numberOfRovers: null,
    roversStartCoords: [],
    movementInstructions: ""
  }

  handleFormChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit = () => {
    console.log(this.inputVerification())
    if (this.inputVerification()) {

    } else {

      alert("invalid input")
    }
  }

  inputVerification = () => {
    return null
  }



  render() {
    return (
      <div className="App">
        <label for="coords" align="right">Coordinates of right hand corner of plateau: </label>
        <input
          type="text"
          id="coords"
          name="sizeOfPlateau"
          placeholder="e.g: 5,5"
          align="right"
          onChange={this.handleFormChange}
          value={this.state.sizeOfPlateau}
        >
        </input>

        <br />
        <label for="rovers" align="right">Number of Rovers: </label>
        <input
          type="text"
          id="rovers"
          name="numberOfRovers"
          align="right"
          placeholder="e.g: 2"
          onChange={this.handleFormChange}
          value={this.state.numberOfRovers}
        >
        </input>
        <br />
        <button onClick={this.handleSubmit}>Submit</button>
      </div >
    );
  }
}

export default App;
