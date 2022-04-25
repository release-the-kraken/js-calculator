const calculateArrayOfNums = (array) => {
    let result = 0;
    while (array.indexOf("*") !== -1) {
      let num1 = array[array.indexOf("*") - 1];
      let num2 = array[array.indexOf("*") + 1];
      result = num1 * num2; 
      array.splice(array.indexOf("*") - 1, 3, result);
    }
    while (array.indexOf("/") !== -1) {
      let num1 = array[array.indexOf("/") - 1];
      let num2 = array[array.indexOf("/") + 1];
      result = num1 / num2;
      result = result.toString().slice(0, 12); 
      array.splice(array.indexOf("/") - 1, 3, result);
    }
    while (array.indexOf("+") != -1) {
      let num1 = array[array.indexOf("+") - 1];
      let num2 = array[array.indexOf("+") + 1];
      result = num1 + num2;
      array.splice(array.indexOf("+") - 1, 3, result);
    }
    while (array.indexOf("-") !== -1) {
      let num1 = array[array.indexOf("-") - 1];
      let num2 = array[array.indexOf("-") + 1];
      result = num1 - num2;
      array.splice(array.indexOf("-") - 1, 3, result);
    }
    return result;
  }
  export {calculateArrayOfNums};