let check_type_return_true_if_int = (x) => {
    if (typeof (x) === `number`) {
        return true
    }
    return false
}

let add = (...args) => {
    let sum = 0
    try {
        for (let index = 0; index < args.length; index++) {
            if (check_type_return_true_if_int(args[index])) {
                sum = sum + args[index]
            }
            else {
                throw TypeError
            }
        }
        return sum
    } catch (TypeError) {
        console.log(`Please provide a integer input as parameter`)
    }
}

let multiply = (...args) => {
    let sum = 1
    try {
        for (let index = 0; index < args.length; index++) {
            if (check_type_return_true_if_int(args[index])) {
                sum = sum * args[index]
            }
            else {
                throw TypeError
            }
        }
        return sum
    } catch (TypeError) {
        console.log(`Please provide a integer input as parameter`)
    }
}

let subtract = (a,b) => {
    try {
        if (check_type_return_true_if_int(a) && check_type_return_true_if_int(b)) {
            return(a-b)
        }
        else {
            throw TypeError
        }
    } catch (TypeError) {
        console.log(`Please provide a integer input as parameter`)
    }
}

let divide = (a,b) => {
    try {
        if (check_type_return_true_if_int(a) && check_type_return_true_if_int(b)) {
            return(a/b)
        }
        else {
            throw TypeError
        }
    } catch (TypeError) {
        console.log(`Please provide a integer input as parameter`)
    }
}

let square = (x) => {
    try {
        if (check_type_return_true_if_int(x)) {
            return(x * x)
        }
        else {
            throw TypeError
        }
    } catch (TypeError) {
        console.log(`Please provide a integer input as parameter`)
    }
}


module.exports = { add,multiply,subtract,divide,square }