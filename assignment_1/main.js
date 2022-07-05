
const math_module = require('./math.js')
const realLine_module = require('readline')
const readline = realLine_module.createInterface({
  input: process.stdin,
  output: process.stdout,
});

readline.question(`If want to call the function using file input 1 \n and if using command line input 2\n`, choice => {
  if (choice == 1) {
    console.log(math_module.add(1,2,3,4,5))
    console.log(math_module.multiply(1,2,3,4,5))
    console.log(math_module.subtract(10,5))
    console.log(math_module.divide(10,5))
    console.log(math_module.square(3))

  } else {
    readline.question(`Enter the below for specific operation :- \n For add input 1 \n For multiply input 2 \n For subtract input 3 \n For divide input 4 \n For Squaare input 5\n
    \n`,choice => {
      switch (choice) {
        case '1':
          readline.question(`Enter the number to add using a space delimeter\n`,number_space_seperated_string => {
            let array = number_space_seperated_string.split(' ')
            // console.log(array)
            console.log(math_module.add(parseInt(array[0]),parseInt(array[1])))
          })
          break;
          readline.close();

        case '2':
          readline.question(`Enter the number to multiply using a space delimeter\n`,number_space_seperated_string => {
            let array = number_space_seperated_string.split(' ')
            // console.log(array)
            console.log(math_module.multiply(parseInt(array[0]),parseInt(array[1])))
          })
          break;
          readline.close();
        case '3':
          readline.question(`Enter the number to subtract using a space delimeter\n`,number_space_seperated_string => {
            let array = number_space_seperated_string.split(' ')
            // console.log(array)
            console.log(math_module.subtract(parseInt(array[0]),parseInt(array[1])))
          })
          break;
          readline.close();
        case '4':
          readline.question(`Enter the number to divide using a space delimeter\n`,number_space_seperated_string => {
            let array = number_space_seperated_string.split(' ')
            // console.log(array)
            console.log(math_module.divide(parseInt(array[0]),parseInt(array[1])))
          })
          break;
          readline.close();
        case '5':
          readline.question(`Enter the number to square using a space delimeter\n`,number_space_seperated_string => {
            let array = number_space_seperated_string.split(' ')
            // console.log(array)
            console.log(math_module.square(parseInt(array[0])))
          })
          break;
          readline.close();
        default:
          console.log(`Sorry, Please enter a valid input.`);
      }
    // readline.close();

    })
    
  }

  // readline.close();
});






