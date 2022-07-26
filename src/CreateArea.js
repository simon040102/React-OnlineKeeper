import React, { useState } from 'react';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import ThreeDRotation from '@mui/icons-material/ThreeDRotation';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import axios from 'axios';

const CreateArea = (props) => {
  const authorization = localStorage.getItem('authorization');
  const [note, setNote] = useState({
    todo: {
      content: '',
    },
  });
  
  const CreateNew = (e) => {
    const { name, value } = e.target;
    setNote({
      todo: {
        [name]: value,
      },
    });
  };
  const MySwal = withReactContent(Swal);
  const handleClick = () => {
    console.log(note);
    axios
      .post('https://todoo.5xcamp.us/todos', note, {
        headers: { authorization },
      })
      .then((res) => {
        console.log(res)
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Success',
          showConfirmButton: false,
          timer: 1500,
        });
         props.init();
        setNote({
          todo: {
            content: '',
          },
        });
      });
  };
  return (
    <div className="">
      <div className="inputArea">
        <textarea
          onChange={CreateNew}
          name="content"
          placeholder="Take a note"
          rows="3"
          value={note.todo.content}
        ></textarea>
        <button className="add" onClick={handleClick}>
          <AddCircleIcon />
        </button>
      </div>
    </div>
  );
};
export default CreateArea;
