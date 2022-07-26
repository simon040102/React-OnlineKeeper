import React, { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const Note = (props) => {
  const authorization = localStorage.getItem('authorization');
  const MySwal = withReactContent(Swal);
  const handleDelete = () => {
    axios
      .delete(`https://todoo.5xcamp.us/todos/${props.id}`, {
        headers: { authorization },
      })
      .then((res) => {
        props.init();
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Success',
          showConfirmButton: false,
          timer: 1000,
        });
      });
  };

  const doneCheck = () => {
    if (typeof props.completed_at == 'object') {
      return false;
    } else if (typeof props.completed_at == 'string') {
      return true;
    }
  };
  const handleDone = (e) => {
    axios
      .patch(
        `https://todoo.5xcamp.us/todos/${props.id}/toggle`,
        {},
        { headers: { authorization } }
      )
      .then((res) => {
        props.init();
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Success',
          showConfirmButton: false,
          timer: 1000,
        });
      });
  };
  const [edit, setEdit] = useState(false);
  const mouseEdit = () => {
    setEdit(true);
  };
  const mouseOut = () => {
    setEdit(false);
  };
  const [editText,setEditText]=useState({content:props.content})
  const editClick=()=>{
   console.log(editText)
  }
  return (
    <div
      className="note"
      style={{ backgroundColor: doneCheck() && '#022b3a81' }}
      onMouseMove={mouseEdit}
      onMouseOut={mouseOut}
    >
      <p
        style={
          doneCheck()
            ? { color: '#abafbc', textDecoration: 'line-through' }
            : null
        }
      >
        {props.content}
      </p>
      <div className="noteButton">
        <button
          style={{ backgroundColor: doneCheck() && '#e1e5f2a1' }}
          data-id={props.id}
          onClick={handleDone}
        >
          {doneCheck() ? 'Finished' : 'Done'}
        </button>
        <div>
          {/* <button
            style={{ backgroundColor: doneCheck() && '#e1e5f2a1' }}
            data-id={props.id}
            onClick={editClick}
          >
            <ModeEditIcon  style={{ display: edit ? 'inline' : 'none' }} />
          </button> */}
          <button
            style={{ backgroundColor: doneCheck() && '#e1e5f2a1' }}
            data-id={props.id}
            onClick={handleDelete}
          >
            <DeleteIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Note;
