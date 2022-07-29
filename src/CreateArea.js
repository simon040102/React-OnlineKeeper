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
        console.log(res);
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
    <div className="relative w-9/12 md:w-6/12 mx-auto bg-white p-5 rounded-xl mb-8 shadow-2xl">
      <textarea
        className="w-full focus:outline-none text-md resize-none"
        onChange={CreateNew}
        name="content"
        placeholder="Take a note"
        rows="3"
        value={note.todo.content}
      ></textarea>
      <button
        className="add absolute -bottom-4 right-5 bg-sky-200 rounded-full w-9 h-9 shadow-2xl text-gray-700"
        onClick={handleClick}
      >
        <AddCircleIcon />
      </button>
    </div>
  );
};
export default CreateArea;
