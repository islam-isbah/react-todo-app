import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';

import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';

import { useContext, useState } from 'react';
import TodosContext from '../contexts/TodosContext';

//Modal or Dialog import
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';



export default function ToDo({ todo }) {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editTodo, setEditTodo] = useState({
        title: todo.title,
        desc: todo.desc
    });
    const { todos, setTodos } = useContext(TodosContext);

    function handleChickClick() {
        const updatedTodos = todos.map((t) => {
            if (t.id === todo.id) {
                return { ...t, isCompleted: !t.isCompleted };
            }
            return t;
        });
        setTodos(updatedTodos);
        localStorage.setItem('todos', JSON.stringify(updatedTodos));
    }

    function handleDeleteClick() {
        setShowDeleteModal(true);
    }
    // when click at any where of modal except buttons it will close the modal
    function handleDeleteDialogClose() {
        setShowDeleteModal(false);
    }
    function handleDeleteConfirm() {
        const updatedTodos = todos.filter((t) => t.id !== todo.id);
        setTodos(updatedTodos);
        setShowDeleteModal(false);
        localStorage.setItem('todos', JSON.stringify(updatedTodos));
    }
    function handleEditDialogClose() {
        setShowEditModal(false);
    }
    function handleEditConfirm() {
        const updatedTodos = todos.map((t) => {
            if (t.id === todo.id) {
                return { ...t, title: editTodo.title, desc: editTodo.desc };
            }
            return t;
        });
        setTodos(updatedTodos);
        setShowEditModal(false);
        localStorage.setItem('todos', JSON.stringify(updatedTodos));
    }
    function handleEditClick() {
        setShowEditModal(true);
    }
    // function handleSubmit(e) {
    //     e.preventDefault();
    //     const updatedTodos = todos.map((t) => {
    //         if (t.id === todo.id) {
    //             return { ...t, title: editTodo.title, desc: editTodo.desc };
    //         }
    //         return t;
    //     });
    //     setTodos(updatedTodos);
    //     setShowEditModal(false);
    // }

    return (
        <>
            {/* Delete Modal  */}
            <Dialog
                onClose={handleDeleteDialogClose}
                open={showDeleteModal}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                role="alertdialog"
                style={{ direction: 'rtl' }}
            >
                <DialogTitle id="alert-dialog-title">
                    هل أنت متأكد من حذف المهمة ؟
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        إذا قمت بحذف المهمة فلن تتمكن من استعادتها مرة أخرى
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteConfirm} autoFocus>
                        نعم قم بحذف المهمة
                    </Button>
                    <Button onClick={handleDeleteDialogClose}>إلغاء</Button>
                </DialogActions>
            </Dialog>
            {/* === Delete Modal === */}

            {/* Edit Modal  */}
            <Dialog
                onClose={handleEditDialogClose}
                open={showEditModal}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                role="alertdialog"
                style={{ direction: 'rtl' }}
            >
                <DialogTitle id="alert-dialog-title">
                    تعديل المهمة
                </DialogTitle>
                <DialogContent>
                    <form id="subscription-form">
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="name"
                            name="title"
                            label="عنوان المهمة"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={editTodo.title}
                            onChange={(e) => {
                                setEditTodo({ ...editTodo, title: e.target.value });
                            }}
                        />
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="name"
                            name="desc"
                            label=" التفاصيل"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={editTodo.desc}
                            onChange={(e) => {
                                setEditTodo({ ...editTodo, desc: e.target.value });
                            }}
                        />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleEditConfirm} autoFocus>
                        تأكيد
                    </Button>
                    <Button onClick={handleEditDialogClose}>إلغاء</Button>
                </DialogActions>
            </Dialog>

            {/* === Edit Modal === */}
        <Card
            sx={{
                minWidth: 275,
                color: '#fff',
                backgroundColor: '#283593',
                mt: 5
            }}
            className="todoCard"
        >
            <CardContent>

                <Grid container spacing={2} sx={{ alignItems: 'center' }}>

                    {/* Task Info */}
                    <Grid size={8}>
                        <Typography variant="h5" sx={{ textAlign: 'right', textDecoration:todo.isCompleted ? "line-through" :"none" }}>
                            {todo.title}
                        </Typography>

                        <Typography variant="h6" sx={{ textAlign: 'right' }}>
                            {todo.desc}
                        </Typography>
                    </Grid>

                    {/* Actions Btn */}
                    <Grid
                        size={4}
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-around',
                            alignItems: 'center',
                            gap: 1
                        }}
                    >
                        <IconButton
                            className="iconBtn"
                            sx={{
                                color: todo.isCompleted ? '#fff' : '#8bc34a',
                                backgroundColor: todo.isCompleted ? '#8bc34a' : '#fff',
                                border: '3px solid #8bc34a'
                            }}
                            aria-label="complete"
                            onClick={handleChickClick}
                        >
                            <CheckIcon />
                        </IconButton>

                            <IconButton
                                onClick={handleEditClick}
                            className="iconBtn"
                            sx={{
                                color: '#fff',
                                backgroundColor: '#1769aa',
                                border: '3px solid #1769aa'
                            }}
                            aria-label="edit"
                        >
                            <ModeEditOutlineOutlinedIcon />
                        </IconButton>
                            {/* Delete Btn */}
                        <IconButton
                                className="iconBtn"
                                sx={{
                                    color: '#fff',
                                    backgroundColor: '#b23c17',
                                    border: '3px solid #b23c17'
                                }}
                                aria-label="delete"
                                onClick={handleDeleteClick}
                        >
                            <DeleteIcon />
                            </IconButton>
                            {/*=== Delete Btn ===*/}
                        {/*=== Actions Btn ===*/}
                    </Grid>

                </Grid>

            </CardContent>
            </Card>
        </>
    );
}