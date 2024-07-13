// For main carousel
export const increment = () => {
    return {
        type: "INCREMENT",
    }
}

export const decrement = () => {
    return {
        type: "DECREMENT",
    }
}

// For overlay carousel - Increases, decreases or resets the index to the start or end of array in albums carousel depending on action.type used
export const increase = () => {
    return {
        type: "INCREASE",
    }
}

export const decrease = () => {
    return {
        type: "DECREASE",
    }
}

export const start = () => {
    return {
        type: "START",
    }
}

export const end = (arr) => {
    return {
        type: "END",
        payload: arr.length
    }
}

// Sets the position in the overlay carousel
export const setCarouselIndex = (index) => {
    return {
        type: "SETCAROUSELINDEX",
        payload: index - 1,
    }
}