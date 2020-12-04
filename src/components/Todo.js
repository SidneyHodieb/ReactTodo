import React, {useState, useEffect} from 'react'
import axios from "axios";
import  "../App.css";
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import add_boxIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import CommentIcon from '@material-ui/icons/Comment';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Navbar from './Navbar';




function Todo() {

    const useStyles = makeStyles((theme) => ({
        root: {
          width: '100%',
          maxWidth: 360,
          backgroundColor: theme.palette.background.paper,
        },
      }));  

      const classes = useStyles();

      

    function Task({ task, index, changeStatut, removeTask }) {   //Form where task a values are get
        
        const [open, setOpenD] = useState(false);

        const closeDialog = () => {
            setOpenD(false);
          };

          const openDialog = () => {
            setOpenD(true);
          };
        return (
            <div>
                
                
                <Dialog open={ open } onClose={closeDialog} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">  Tache en cours </DialogTitle>
       
        <DialogContent>
          
          <TextField
            autoFocus
            value={task.title}
            margin="dense"
            label="Titre de la tache"
            type="text"
            disabled
            fullWidth
            
          />
          <TextField
            autoFocus
            value={task.details}
            margin="dense"
            label="Aucun detail"
            type="text"
            fullWidth
            disabled
          />
        </DialogContent>
     
      </Dialog>
            
            <ListItem button onClick={openDialog} >

               <div style={{ textDecoration: task.statut ? "line-through" : "" }}> {task.title} </div> 

               
                <IconButton onClick={() => removeTask(index)} aria-label="delete" className={classes.margin}>
          <DeleteIcon fontSize="small" />
        </IconButton>
                <Button onClick={() => changeStatut(index)} variant="contained" color="primary">Terminer</Button>

            </ListItem>
            </div>
        );
    }

    function getTasks(){     //Function which import tasks from the current user
        axios.get('http://localhost:8000/api/tasks',{
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
              }
        }).then((response) => {
            setTasks(response.data);   
        })
    }
    
    
    function CreateTask({ addTask }) {  //Function which create tasks f the current user
        const [open, setOpen] = useState(false);
        const [title, setTitle] = useState("");
        const [details, setDetails] = useState("");
    
        const handleSubmit = e => {
            e.preventDefault();
            if (!title) return;
    
            addTask(title, details);
            setTitle("");
            setDetails("");
            setOpen(false)
        }
    
          const Close = () => {
            setOpen(false);
          };

          const Open = () => {
            setOpen(true);
          };
    
        
        
    
        return (
            
            <div>

        <Button
        variant="contained"
        color="secondary"
        className={classes.button}
        startIcon={<AddIcon />}
        onClick={Open}
      >
        Ajouter une tache
      </Button>

        <Dialog open={open} onClose={Close} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <form onSubmit={handleSubmit}>
        <DialogContent>
          <DialogContentText>
           Ajouter une tache
          </DialogContentText>
          
          <TextField
            autoFocus
            value={title}
            margin="dense"
            label="Titre de la tache"
            type="text"
            fullWidth
            onChange={e => setTitle(e.target.value)}
          />
          <TextField
            autoFocus
            value={details}
            margin="dense"
            label="Details de la tache"
            type="text"
            fullWidth
            onChange={e => setDetails(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={Close} color="primary">
            Cancel
          </Button>
          <Button type="submit" color="primary">
            Ajouter
          </Button>
        </DialogActions>
        </form>
      </Dialog>
       
      </div>
           
        );
    }


    
    const [tasksRemaining, setTasksRemaining] = useState(0);
    const [tasks, setTasks] = useState([]);

    useEffect(() => { 
        setTasksRemaining(tasks.filter(task => !task.completed).length)  //fucntion who set numer of tasks pending
      });

      useEffect(() => { 
        getTasks()
      },[]);

     

    const addTask = (title, details) => {

        //API call To create tasks for the current user
         
        axios.post("http://localhost:8000/api/tasks", { title : title, details: details},  
        {
            headers: {
              'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(response => {
            console.log(response);

        }).catch(error => {
            console.log(error.response.data.message)
          });
    


        const newTasks = [...tasks, { title, details, statut: false }];
        setTasks(newTasks);
        getTasks()
        
    };

    const changeStatut = index => {  
        const newTasks = [...tasks];
        let toChange= newTasks[index];
        newTasks[index].statut = true;
        setTasks(newTasks);
        console.log(toChange)

        //API Call to update a task

        axios.patch(`http://localhost:8000/api/tasks/${toChange._id}`, {statut :  toChange.statut},
        {
            headers: {
              'Authorization': 'Bearer ' + localStorage.getItem('token'),
              'Content-Type': 'application/json',
            }
        }).then(response => {
            console.log(response);

        }).catch(error => {
            console.log(error.response.data)
          });
    };

    const removeTask = index => {  //function to delete a task

        const newTasks = [...tasks];
        let toDelete = newTasks[index];
        newTasks.splice(index, 1);
        setTasks(newTasks)

        axios.delete(`http://localhost:8000/api/tasks/${toDelete._id}`,
        {
            headers: {
              'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(response => {
            console.log(response);

        }).catch(error => {
            console.log(error.response.data.message)
          });
    }

    
    
    return (
           
            <div>
                 <Navbar/>
                 <Container>
            <Typography component="h1" variant="h5">
           AOS TodoApp
        </Typography>
            <div className="header">Taches en cours ({tasksRemaining})</div>
            <div className="tasks">
                {tasks.map((task, index) => (
                    <Task
                        task={task}
                        index={index}
                        key={index}
                        changeStatut={changeStatut}
                        removeTask={removeTask}
                    />
                ))}
            </div>
          
            <div className="create-task" >
                    <CreateTask addTask={addTask} />
                </div>
      
        </Container>
        </div>
      

    );
}

export default Todo;