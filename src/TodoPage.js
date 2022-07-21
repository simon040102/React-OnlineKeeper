import React, { useEffect, useState } from "react";
import CreateArea from "./CreateArea";
import Header from "./Header";
import Note from "./Note";
import WaitFinish from './waitFinish'
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TodoPage=()=>{
      const authorization = localStorage.getItem('authorization');
 let navigate = useNavigate();
const checkAuthorization = () => {
  axios
    .get(
      'https://todoo.5xcamp.us/check',{ headers: { authorization },}
    )   .catch((err) => {
      navigate('/');
    });
};
    const [notes,setNotes]=useState([])
    const axiosData=()=>{
        return axios.get('https://todoo.5xcamp.us/todos', {
          headers: { authorization },})
          .then(res=>{
          setNotes(res.data.todos);
          });
    }
    let notDone = notes.filter((noteItem) => typeof(noteItem.completed_at)=='object');
    let done = notes.filter((noteItem) => typeof noteItem.completed_at == 'string');
    const showNotDown=()=>{
        return notDone.map((noteItem, index) => {
          return (
            <Note
              content={noteItem.content}
              id={noteItem.id}
              completed_at={noteItem.completed_at}
              init={axiosData}
            />
          );
        });
    }
      const showDone = () => {
        return done.map((noteItem, index) => {
          return (
            <Note
              content={noteItem.content}
              id={noteItem.id}
              completed_at={noteItem.completed_at}
              init={axiosData}
            />
          );
        });
      };
      useEffect(() => {
        axiosData();
        checkAuthorization();
      }, []);
    return (
      <div>
        <Header />
        <CreateArea init={axiosData} />
        <WaitFinish notDone={notDone} done={done} init={axiosData} />
        <div className="container">
          <div className="container noteItem">{showNotDown()}</div>
          <hr />
          <div className="container noteItem"> {showDone()}</div>
        </div>
      </div>
    );
}

export default TodoPage