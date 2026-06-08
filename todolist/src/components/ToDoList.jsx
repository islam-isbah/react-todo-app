import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { useContext, useState, useEffect } from 'react';
import  TodosContext  from '../contexts/TodosContext';

//other lay.. use this for uniqe id
import { v4 as uuidv4 } from 'uuid';




/* Icons */
// import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
// import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
// import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';

// Components
import ToDo from './ToDo';

export default function ToDoList() {
    const { todos, setTodos } = useContext(TodosContext);
    const [titleInput, setTitleInput] = useState("");
    const [displayTodoType, setDisplayTodoType] = useState("all")

    // function handleChickClick(todoId) {
    //     setTodos(todos.map((todo) => {
    //         if (todo.id === todoId) {
    //             return { ...todo, isCompleted: !todo.isCompleted };
    //         }
    //         return todo;
    //     }));
    // }

    //filtered arrays
    const completedTodos = todos.filter((t) => {
        return t.isCompleted
    });

    //filtered arrays
    const unCompletedTodos = todos.filter((t) => {
        return !t.isCompleted
    });
    // anthar solution 2
    let todosToBeRendered = todos
    if (displayTodoType === "completed") {
        todosToBeRendered = completedTodos
    } else if (displayTodoType === "uncompleted") {
        todosToBeRendered = unCompletedTodos
    } else {
        todosToBeRendered = todos
    }
    // solution num 1
    // const todosToBeRendered = displayTodoType === "completed" ? completedTodos : displayTodoType === "uncompleted" ? unCompletedTodos : todos;

    const todosJsx = todosToBeRendered.map((t) => {
        return <ToDo todo={t} key={t.id} />
    });


    // const todosJsx = todos.map((t) => {
    //     return <ToDo todo={t} key={t.id}  />
    // });

    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem('todos')) ?? [];
        setTodos(storedTodos || []);
    }, []);

    function handleAddClick() {
        const newTodo = {
            id: uuidv4(),
            title: titleInput,
            desc: '',
            isCompleted:false
        }
        const updatedTodos = [...todos, newTodo];
        setTodos(updatedTodos);
        //store in local storage brwosor (not connect in sql db)
        localStorage.setItem('todos', JSON.stringify(updatedTodos));
        setTitleInput('');
    }
    function changeDisplayType(e) {
        setDisplayTodoType(e.target.value)
    }
    return (
        <Container maxWidth="sm">

            <Card sx={{ minWidth: 275 }} style={{maxHeight:"80vh", overflow:"auto"} }>
                <CardContent>

                    {/* Title */}
                    <Typography variant="h2" sx={{ fontWeight: 'bold' }}>
                        مهامي
                    </Typography>

                    <Divider sx={{ my: 2 }} />

                    {/* Filter Buttons */}
                    <ToggleButtonGroup
                        exclusive
                        aria-label="task filter"
                        sx={{ direction: 'ltr', mt: 2,}}
                        value={displayTodoType}
                        onChange={changeDisplayType}
                        color="primary"
                    >
                        <ToggleButton value="uncompleted">
                            غير المنجز
                        </ToggleButton>

                        <ToggleButton value="completed">
                            المنجز
                        </ToggleButton>

                        <ToggleButton value="all">
                            الكل
                        </ToggleButton>
                    </ToggleButtonGroup>

                    {/* Tasks List */}
                    {todosJsx}
                    {/* === Tasks List === */}

                    {/* Add with Btn  */}
                    <Grid container sx={{ marginTop: '20px' }} spacing={2}>

                        {/* Task Info */}
                        <Grid size={8} >
                            <TextField id="outlined-basic"
                                label="عنوان المهمة"
                                variant="outlined"
                                sx={{ width: '100%' }}
                                value={titleInput}
                                onChange={(e) => {
                                    setTitleInput(e.target.value);
                                } }
                            />
                        </Grid>

                        {/* Actions Btn */}
                        <Grid
                            size={4}
                            
                        >
                            <Button variant="contained"
                                sx={{ width: '100%', height: '100%' }}
                                onClick={() => {
                                    handleAddClick()
                                }}
                                disabled={titleInput.length === 0}
                            >إضافة</Button>
                        </Grid>
                        </Grid>
                            {/* Add with Btn  */}
                </CardContent>
            </Card>

        </Container>
    );
}