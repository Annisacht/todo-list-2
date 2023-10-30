import { configureStore } from '@reduxjs/toolkit'
import TodoReducer from './reducers/TodoReducer'

const store = configureStore ({
    reducer: {
        todos: TodoReducer,
    }
})

export default store