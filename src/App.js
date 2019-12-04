import React from 'react';
import './App.css';
import API from './API.js'

class App extends React.Component {
  state = {
    upperRightCoords: null,
    numberOfRovers: null,
    roversCoords: null,
    roverIntructions: null,
    plateauArray: []
  }

  handleFormChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleInputSubmit = () => {
    let inputArray = this.state.upperRightXcoord.split('\n')
    inputArray = inputArray.filter(line => line !== "")
    if (this.processInputs(inputArray)) {
      console.log("Inputs Sucessfully Processed!")
      // this.calculateRoverEndpoint()
    }
  }

  calculateRoverEndpoint = (coords, instructions) => {
    console.log("calculating endpoint:")
    console.log(coords, instructions)
  }

  processInputs = (inputs) => {
    if (inputs.length % 2 === 0) {
      alert("Even number of Input lines detected, please check format guidelines!")
      return false
    } else {
      console.log(inputs)
      let upperRightCoords = inputs.shift().split(' ')
      this.validateAndProcessFirstLine(upperRightCoords)

      let roverData = this.splitRoverData(inputs)

      this.saveRoverDataToState(roverData)
      return roverData
    }
  }

  saveRoverDataToState = (roverData) => {
    let [roversCoords, roversIntructions] = [[], []]

    roverData.forEach((rover, index) => {
      // Validate rover coordinates
      if (rover[0].length !== 3) {
        alert(`invalid coordinates for Rover ${index}`)
      } else {
        //create new array, roversCoords, soley for all coordinates
        roversCoords.push([])
        roversCoords[index].push(
          parseInt(rover[0][0]), parseInt(rover[0][1]), rover[0][2]
        )
        roversIntructions.push(rover[1])
      }
    }
    )
    this.setState({
      roversCoords: roversCoords,
      roversIntructions: roversIntructions
    },
      () => this.calculateRoverEndpoint(this.state.roversCoords, this.state.roversIntructions)
    )
  }

  createPlateau = () => {
    let plateau = []
    let columns = this.state.upperRightCoords[1]
    let rows = this.state.upperRightCoords[0]
    for (let i = 0; i < columns; i++) {
      plateau[i] = []
      for (let j = 0; j < rows; j++) {
        plateau[i][j] = 0
      }
    }
    this.setState({ plateauArray: plateau })
    console.log("here is the plateau", plateau)
  }

  splitRoverData = (inputs) => {
    let indexedRoverData = []
    //put each rover's data into its own array inside an array
    let i = 0
    let j = 0
    do {
      indexedRoverData[j] = [inputs[i], inputs[i + 1]]
      i = i + 2
      j++
    } while (i !== (inputs.length))
    //put each character string into its own array element
    indexedRoverData = indexedRoverData.map(roverArray => {
      return roverArray.map(string => string.replace(/ /g, '').split(''))
    })
    console.log("the indexed rover data is", indexedRoverData)
    // final array form: [ [[1,2,N],[L,M,R,M]] , [[2,3,S],[L,M,L,M]] ]
    console.log("Number of rovers", indexedRoverData.length)
    return indexedRoverData
  }

  // checks the first input line is 2 integers seperated by a space
  // and saves them into the upperRightCoords state as an array
  validateAndProcessFirstLine = (upperRightCoords) => {
    // let upperRightCoords = inputs.shift().split(' ')

    if ((upperRightCoords.length === 2) && (API.numeralTest(upperRightCoords))) {
      this.setState({
        upperRightCoords: API.convertStringsArrayToIntegers(upperRightCoords)
      },
        () => {
          this.createPlateau()
          console.log("the upper Right Co-ords: ", this.state.upperRightCoords)
        })
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
