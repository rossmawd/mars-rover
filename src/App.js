import React from 'react';
import './App.css';

class App extends React.Component {
  state = {
    upperRightXcoord: null,
    upperRightYcoord: null,
    numberOfRovers: null,
    roversStartCoords: null,
    movementInstructions: "",
    testInput: ""
  }

  handleFormChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit = () => {

    if (this.inputVerification()) {
      console.log("you entered correctly")
    } else {
      console.log("doing nothing")

    }
  }

  inputVerification = () => {
    let { upperRightXcoord, upperRightYcoord, numberOfRovers } = this.state
    let isNumber = RegExp(/^([0-9])*$/)

    if (isNumber.test(upperRightXcoord + upperRightYcoord + numberOfRovers)) {
      return true
    } else {
      console.log(upperRightXcoord)
      alert(`Please make sure you only enter numerals!`)
      return false
    }
  }



  render() {
    return (
      <div className="App">
        <label for="Xcoord" align="right">X Coordinnate of upper right hand corner of plateau: </label>
        <input
          type="text"
          id="Xcoord"
          name="upperRightXcoord"
          placeholder="e.g: 5"
          align="right"
          onChange={this.handleFormChange}
          value={this.state.upperRightXcoord}
        >
        </input>
        <br />
        <label for="Ycoord" align="right">Y Coordinnate of upper right hand corner of plateau: </label>
        <input
          type="text"
          id="Ycoord"
          name="upperRightYcoord"
          placeholder="e.g: 5"
          align="right"
          onChange={this.handleFormChange}
          value={this.state.upperRightYcoord}
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
