
//-----------------BUTTONS OBJECT--------------------------------------------- 
const keyValues = 
  {numbers: [
    {id: "one",
    value: 1},
    {id: "two",
    value: 2},
    {id: "three",
    value: 3},
    {id: "four",
    value: 4},
    {id: "five",
    value: 5},
    {id: "six",
    value: 6},
    {id: "seven",
    value: 7},
    {id: "eight",
    value: 8},
    {id: "nine",
    value: 9},
    {id: "zero",
    value: 0}
  ],
   operators: [     
     {id: "add",
    value: "+"},
     {id: "subtract",
    value: "-"},
     {id: "multiply",
    value: "*"},
     {id: "divide",
    value: "/"},
   ],
   equals:{id: "equals",
         value: "="},
   decimal:{id: "decimal",
         value: "."},
   clear:{id: "clear",
         value: "C"}  
  }
//--------CALCULATE FUNCION------------------------------------
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
//----------CREATE ELEMENTS----------------------------
function createEl(type, content, attachTo){
  var elem = document.createElement(type);
    attachTo.appendChild(elem);
    elem.innerHTML = content;
}
const keyboardNums = document.getElementById("keyboard-numbers");
const keyboardOps = document.getElementById("keyboard-operators");

keyValues.numbers.map(keyObj =>{
  createEl("div",
          `<div class="buttons number-buttons" id=${keyObj.id} value=${keyObj.value}>${keyObj.value}</div>`,
          keyboardNums);
})
keyValues.operators.map(keyObj =>{
  createEl("div",
          `<div class="buttons number-buttons" id=${keyObj.id} value=${keyObj.value}>${keyObj.value}</div>`,
          keyboardOps);
})
createEl("div",
        `<div class="buttons" id=${keyValues.decimal.id} value=${keyValues.decimal.value}>${keyValues.decimal.value}</div>`,
        keyboardNums);
createEl("div",
        `<div class="buttons" id=${keyValues.equals.id} value=${keyValues.equals.value}>${keyValues.equals.value}</div>`,
        keyboardNums);
createEl("div",
        `<div class="buttons" id=${keyValues.clear.id} value=${keyValues.clear.value}>${keyValues.clear.value}</div>`,
        keyboardNums);
//------------CALCULATOR LOGIC---------------------
const id = (id) => document.getElementById(id);
const classes = (className) => document.getElementsByClassName(className);

const mainDisplay = id("main-display"),
      auxDisplay = id("aux-display");
const buttons = classes("buttons");

let resultArray =[],
    currentValue = "",
    valuesString = "",
    currentResult = 0,
    isInputCalculated = false,
    wasOperatorUsed = false;
mainDisplay.innerText = currentResult;
auxDisplay.innerText = currentResult;
//----------------HANDLECLICK FUNCTION---------
const handleClick = (e) => {
  let currentInput = e.target.innerText;
  const numPattern = /[0-9.]/,
        operatorPattern = "+-*/";
 
  if(currentInput.match(numPattern)){   
    if(!isInputCalculated){
      if(currentInput == "." && currentValue.includes(".")){
        currentValue;
      }else if(currentValue.length < 12){
      currentValue += currentInput;
    }
      mainDisplay.innerHTML = currentValue;
      if((resultArray.join('') + currentValue).length < 32){
      auxDisplay.innerText = resultArray.join('') + currentValue;
      }
      wasOperatorUsed = false;
    }
  }
  if(operatorPattern.includes(currentInput) && !wasOperatorUsed){
    if(!isInputCalculated){
         if(!currentValue.includes(".")){
           resultArray.push(Number.parseInt(currentValue));
         }else{
           resultArray.push(Number.parseFloat(currentValue));
         }      
      }
      resultArray.push(currentInput);
      valuesString += currentValue;    
      currentValue = "";
      let lastNumberValue = resultArray[resultArray.length - 2];
      mainDisplay.innerText = lastNumberValue;
      auxDisplay.innerText = resultArray.join('');
      isInputCalculated = false;
      wasOperatorUsed = true;
  }
  if(currentInput === "=" && !wasOperatorUsed){
    if(!isInputCalculated){
      if(!currentValue.includes(".")){
        resultArray.push(Number.parseInt(currentValue));
      }else{      
        resultArray.push(Number.parseFloat(currentValue));
      }    
      currentResult = calculateArrayOfNums(resultArray);
      if(currentResult.toString().length > 12){
        currentResult = currentResult.toPrecision(6);
      }else{
        currentResult = currentResult.toString().slice(0, 12); 
      }
      mainDisplay.innerText = currentResult;
      auxDisplay.innerText = currentResult;
      }
    isInputCalculated = true;
    wasOperatorUsed = false;
  }
  if(currentInput === "C"){
    resultArray = [];
    valuesString = "";
    currentValue = "";
    currentResult = 0;    
    mainDisplay.innerText = currentResult;
    auxDisplay.innerText = currentResult;   
    isInputCalculated = false;
    wasOperatorUsed = false;
  }
}
Array.prototype.slice.call(buttons).forEach(button => {  
  button.addEventListener('click', handleClick);
});

//expected 3 + 5 x 6 - 2 / 4 = 32,5