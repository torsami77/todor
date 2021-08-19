import { Button, TextField } from '@material-ui/core'
import { Add, Update } from '@material-ui/icons';
import React, { useState } from 'react';
import '../styles/TodoForm.css';


function TodoForm({TodoId=null, Title='', Description='', UpdateTodoList, EditMode=false}) {
    const [ TodoTitle, SetTodoTitle ] = useState(Title);
    const [ TodoDescription, SetTodoDescription ] = useState(Description);

    const HandleChange = (e) => {
        const fieldName = e.target.name;
        const value = e.target.value;
        if(fieldName === 'Title'){
          SetTodoTitle(value)
        }
        if(fieldName === 'Description'){
            SetTodoDescription(value)
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        UpdateTodoList({
            TodoId,
            TodoTitle,
            TodoDescription
        })
        SetTodoTitle('');
        SetTodoDescription('');
    }
    
    return (
        <form onSubmit={handleSubmit}>
            <div>
              <TextField 
                className="Form-Element"
                variant="outlined"
                value={TodoTitle}
                name="Title"
                label="Title   (required)"
                onChange={(e) => {HandleChange(e)}}
                required
              />
            </div>
            <div>
              <TextField
                className="Form-Element"
                variant="outlined"
                value={TodoDescription}
                name="Description"
                label="Description (required)"
                onChange={(e) => {HandleChange(e)}}
                multiline
                rows={3}
                required
              />
              </div>
              {EditMode? 
              <Button type="submit" variant="contained" color="default" className="Form-Element" >
                    <Update/> Update Todo
              </Button>
                :
                <Button type="submit" variant="contained" color="default" className="Form-Element" >
                    <Add/>  Add Todo
                </Button>
                }
            <div/>
        </form>
    )
}

export default TodoForm
