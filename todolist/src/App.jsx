import './App.css'
// import React from 'react';
import ToDoList from './components/ToDoList';
//this for style MUI to use it!
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import TodosContext from './contexts/TodosContext';
//other lay.. use this for uniqe id
import { v4 as uuidv4 } from 'uuid';

// use it for all project to change ex color btn to #fff(change at all btn color!)
const theme = createTheme({
    typography: {
        fontFamily: [
            'Alexa'
        ],
    },
    palette: {
        primary: {
            main:"#004d40",
        }
    }
});

const initialTodos = [
    {
        id: uuidv4(),
        title: '',
        desc: '',
        isCompleted: false
    },
    {
        id: uuidv4(),
        title: '',
        desc: '',
        isCompleted: false
    },
    {
        id: uuidv4(),
        title: '',
        desc: '',
        isCompleted: false
    },
];


function App() {
    const [todos, setTodos] = useState(initialTodos);

    return (
        <ThemeProvider theme={theme}>
        <div className="App" style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems:'center',
            backgroundColor: '#191b1f',
            height: '100vh',
            direction: 'rtl',
            }}>
                <TodosContext.Provider value={{ todos, setTodos }}>
                    <ToDoList />
                </TodosContext.Provider>
            </div>
        </ThemeProvider>
    );
}

export default App
