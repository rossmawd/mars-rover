

const convertStringsArrayToIntegers = (arrayOfStrings) => {
  return arrayOfStrings.map(string => parseInt(string))
}

const numeralTest = (arrayOfStrings) => {
  let isNumber = RegExp(/^([0-9])*$/)
  return isNumber.test(arrayOfStrings.join(''))
}


export default { convertStringsArrayToIntegers, numeralTest }