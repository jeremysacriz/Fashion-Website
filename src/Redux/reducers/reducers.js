// For main carousel
const initialState = {
    prevIndex: undefined,
    activeIndex: 0,
    carouselIndex: 0,
}

export const indexReducer = (state = initialState, action) => {
    switch(action.type) {
        // For main carousel index
        case "INCREMENT":
            return {
                ...state,
                prevIndex: state.activeIndex,
                activeIndex: state.activeIndex + 1,
            }
        case "DECREMENT":
            return {
                ...state,
                prevIndex: state.activeIndex,
                activeIndex: state.activeIndex - 1,
            }

        // For overlay carousel index
        case "INCREASE":
            return {
                ...state,
                carouselIndex: state.carouselIndex + 1,
            }
        case "DECREASE":
            return {
                ...state,
                carouselIndex: state.carouselIndex - 1,
            }
        case "START":
            return {
                ...state,
                carouselIndex: 0
            }
        case "END":
            return {
                ...state,
                carouselIndex: action.payload - 1
            }
        case "SETCAROUSELINDEX":
            return {
                ...state,
                carouselIndex: action.payload
            }
        default:
            return state
    }
}