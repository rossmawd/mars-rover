import React from 'react';
import './App.css';
import API from './API.js'

class App extends React.Component {
  state = {
    upperRightCoords: null,
    roversPositions: null,
    roversInstructions: null,
    formattedOutput: null,
    input: null
  }

  handleFormChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleInputSubmit = () => {
    if (this.state.input) {
      let inputArray = this.state.input.split('\n')
      inputArray = inputArray.filter(line => line !== "")
      this.processInputs(inputArray)
      this.setState({ formatOutput: null })
    }
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

  // checks the first input line is 2 integers seperated by a space
  // and saves them into the upperRightCoords state as an array
  validateAndProcessFirstLine = (upperRightCoords) => {
    if ((upperRightCoords.length === 2) && (API.numeralTest(upperRightCoords))) {
      this.setState({
        upperRightCoords: API.convertStringsArrayToIntegers(upperRightCoords)
      },
        () => {
          console.log("the upper Right Co-ords: ", this.state.upperRightCoords)
        }
      )
    } else {
      alert("The first input line is incorrect (upper Right Co-ords)")
      return false
    }
  }

  //splits up the rovers starting point and instructions into arrays
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
    return indexedRoverData
  }

  //saves roverPositions & roverIntructions into seperate state key/value pairs
  saveRoverDataToState = (roverData) => {
    let [roversPositions, roversInstructions] = [[], []]

    roverData.forEach((rover, index) => {
      // Validate rover coordinates
      if (rover[0].length !== 3) {
        alert(`invalid coordinates for Rover ${index}`)
      } else {
        //create new array, roversPositions, soley for all coordinates
        roversPositions.push([])
        roversPositions[index].push(
          parseInt(rover[0][0]), parseInt(rover[0][1]), rover[0][2]
        )
        roversInstructions.push(rover[1])
      }
    }
    )
    this.setState({
      roversPositions: roversPositions,
      roversInstructions: roversInstructions
    },
      () => this.calculateRoverEndpoints()
    )
  }

  //with the help of driveRover, calculates the final positions of each rover
  //and saves them into the roversPositions state
  calculateRoverEndpoints = () => {
    let roversInstructions = [...this.state.roversInstructions]
    let roversPositions = [...this.state.roversPositions]
    console.log("calculating endpoint:")

    roversInstructions.forEach((instructionSet, index) => {
      let newPosition = this.driveRover(instructionSet, index)
      roversPositions[index] = newPosition
    })
    this.setState(
      { roversPositions: roversPositions },
      () => this.formatOutput(roversPositions)
    )
  }

  driveRover = (instructions, roverIndex) => {
    let roverPosition = [...this.state.roversPositions[roverIndex]]

    let plateauSize = [...this.state.upperRightCoords]
    instructions.forEach(move => {
      if (move === "L" || move === "R") {
        roverPosition[2] = API.turnRover(move, roverPosition)
      } else if (move === "M") {
        roverPosition = API.moveRover(roverPosition[2], roverPosition, plateauSize, roverIndex)
      }
    })
    return roverPosition
  }

  //changes the output into a string (as required)
  formatOutput = (roversPositions) => {
    let formattedOutput = ""

    if (roversPositions) {
      formattedOutput = roversPositions.map(roverPosition =>
        roverPosition.join(" ")
      )
      formattedOutput = formattedOutput.join("\n")
      console.log(formattedOutput)
    }
    this.setState({ formattedOutput: formattedOutput })
  }


  render() {
    let formattedOutput = this.state.formattedOutput
    let sampleInput = "5 5\n1 2 N\nLMLMLMLMM \n3 3 E\nMMRMMRMRRM"

    return (
      <div className="App">
        <label for="sample">Given Sample Input: </label>
        <textarea id="sample" value={sampleInput} rows="6"></textarea>
        <br></br>
        <label for="input" >Please Enter Test input: </label>
        <textarea
          type="text"
          rows="6"
          id="input"
          name="input"
          placeholder="e.g: 5"

          onChange={this.handleFormChange}
          value={this.state.input}
        >
        </textarea>
        <br />

        <button onClick={this.handleInputSubmit}>Submit</button>
        <br></br>
        <span> --- </span>

        {this.state.formattedOutput ? <div>
          {/* <p><b>Results:  </b> {outputString}</p> */}
          <label for="results">Output:  </label>
          <textarea id="results">{formattedOutput}</textarea>
        </div> : null}

      </div >
    );
  }
}

export default App;

