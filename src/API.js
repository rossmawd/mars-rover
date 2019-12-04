

const convertStringsArrayToIntegers = (arrayOfStrings) => {
  return arrayOfStrings.map(string => parseInt(string))
}

const numeralTest = (arrayOfStrings) => {
  let isNumber = RegExp(/^([0-9])*$/)
  return isNumber.test(arrayOfStrings.join(''))
}

const turnRover = (direction, roverPosition) => {
  console.log("the rover position", roverPosition)
  let roverOrientation = roverPosition[2]
  let compass = []
  switch (roverOrientation) {
    case "N":
      compass = ["N", "E", "S", "W"]
      break;
    case "E":
      compass = ["E", "S", "W", "N"]
      break;
    case "S":
      compass = ["S", "W", "N", "E"]
      break;
    case "W":
      compass = ["W", "N", "E", "S"]
      break;
    default:
      compass = null
  }

  if (direction === "L") {
    //remove last elemnt of array and add it onto the start
    compass.unshift(compass.pop())
    return compass[0]
  } else if (direction === "R") {
    compass.push(compass.shift())
    return compass[0]
  }
}

const moveRover = (currentDirection, roverPosition, plateauSize, roverIndex) => {
  // console.log("HERE", currentDirection, roverPosition)
  //have to test rover will not drive off the board
  if (currentDirection === "N" && !(roverPosition[1] >= plateauSize[1])) {
    console.log("moving Up!")
    roverPosition[1]++
    return roverPosition
  } else if (currentDirection === "E" && !(roverPosition[0] >= plateauSize[0])) {
    console.log("moving East")
    roverPosition[0]++
    return roverPosition
  } else if (currentDirection === "S" && !(roverPosition[1] <= 0)) {
    console.log("moving South")
    roverPosition[1]--
    return roverPosition
  } else if (currentDirection === "W" && !(roverPosition[0] <= 0)) {
    console.log("moving west")
    roverPosition[0]--
    return roverPosition
  } else {
    console.log(`Rover ${roverIndex} failed to move ${currentDirection}`)
    return roverPosition
  }

}


export default {
  convertStringsArrayToIntegers,
  numeralTest,
  turnRover,
  moveRover
}