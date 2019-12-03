import React from 'react';
import './App.css';
import API from './API.js'

class App extends React.Component {
  state = {
    upperRightCoords: null,
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

  handleInputSubmit = () => {
    let inputArray = this.state.upperRightXcoord.split('\n')
    inputArray = inputArray.filter(line => line !== "")
    if (this.splitInputs(inputArray)) {
      console.log("Inputs Sucessfully Processed!")
    }
  }

  splitInputs = (inputs) => {
    if (inputs.length % 2 === 0) {
      alert("Even number of Input lines detected, please check format guidelines!")
      return false
    }
    console.log(inputs)
    this.validateAndProcessFirstLine(inputs)

  }

  validateAndProcessFirstLine = (inputs) => {
    let upperRightCoords = inputs.shift().split(' ')

    if ((upperRightCoords.length === 2) && (API.numeralTest(upperRightCoords))) {
      this.setState({
        upperRightCoords: API.convertStringsArrayToIntegers(upperRightCoords)
      },
        () => console.log("the upper Right Co-ords: ", this.state.upperRightCoords))
    } else {
      console.log("The first input line is incorrect (upper Right Co-ords)")
      return false
    }
  }


  render() {
    return (
      <div className="App">
        <label for="Xcoord" align="right">Enter Test input: </label>
        <textarea
          type="text"
          id="Xcoord"
          name="upperRightXcoord"
          placeholder="e.g: 5"
          align="right"
          onChange={this.handleFormChange}
          value={this.state.upperRightXcoord}
        >
        </textarea>
        <br />
        {/* <label for="Ycoord" align="right">Y Coordinnate of upper right hand corner of plateau: </label>
        <input
          type="text"
          id="Ycoord"
          name="upperRightYcoord"
          placeholder="e.g: 5"
          align="right"
          onChange={this.handleFormChange}
          value={this.state.upperRightYcoord}
        >
        </input> */}

        <br />
        {/* <label for="rovers" align="right">Number of Rovers: </label>
        <input
          type="text"
          id="rovers"
          name="numberOfRovers"
          align="right"
          placeholder="e.g: 2"
          onChange={this.handleFormChange}
          value={this.state.numberOfRovers}
        >
        </input> */}
        <br />
        <button onClick={this.handleInputSubmit}>Submit</button>
      </div >
    );
  }
}

export default App;
