import React from 'react'
import { createSlice, nanoid } from '@reduxjs/toolkit'


export const TodoReducer = createSlice({
    name: 'todos',
    initialState: {
        todos: [],
        filter:'all'},
    reducers: {
        addTodo: (state, action) => {
            const newTodo = {
                id: nanoid(),
                text: action.payload,
                completed: false,
            };
            state.todos.push(newTodo);
        },
        updateTodo: (state, action) => {
            const todo = state.todos.find(todo => todo.id === action.payload.id);
            if (todo) {
                todo.text = action.payload.text;
            }
        },
        complete: (state, action) => {
            const todo = state.todos.find(todo => todo.id === action.payload.id);
            if (todo) {
                todo.completed = !todo.completed;
            }
        },
        deleteTodo: (state, action) => {
            return state.todos.filter(todo => todo.id !== action.payload.id);
        },
        setFilter: (state, action) => {
            state.filter = action.payload
        }
    }
})

export const { addTodo, updateTodo, complete, deleteTodo, setFilter } = TodoReducer.actions
export default TodoReducer.reducer