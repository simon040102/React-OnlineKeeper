import React, { useEffect, useState } from "react";
import CreateArea from "./CreateArea";
import Header from "./Header";
import Note from "./Note";
import WaitFinish from './waitFinish';
import Chose from './Select'
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Select } from "@mui/material";

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
    const [chose,setChose]=useState('all')
    console.log(chose)
    let notDone = notes.filter((noteItem) => typeof(noteItem.completed_at)=='object');
    let done = notes.filter((noteItem) => typeof noteItem.completed_at == 'string');
    const showData=()=>{
      if (chose=='all'){
        return notes.map((noteItem, index) => {
          return (
            <Note
              content={noteItem.content}
              id={noteItem.id}
              completed_at={noteItem.completed_at}
              init={axiosData}
            />
          );
        });
      }else{
        return notes.filter(
          (noteItem) => typeof noteItem.completed_at == chose
        ).map(noteItem=>{
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
    }
    // const showNotDown=()=>{
    //     return notDone.map((noteItem, index) => {
    //       return (
    //         <Note
    //           content={noteItem.content}
    //           id={noteItem.id}
    //           completed_at={noteItem.completed_at}
    //           init={axiosData}
    //         />
    //       );
    //     });
    // }
    //   const showDone = () => {
    //     return done.map((noteItem, index) => {
    //       return (
    //         <Note
    //           content={noteItem.content}
    //           id={noteItem.id}
    //           completed_at={noteItem.completed_at}
    //           init={axiosData}
    //         />
    //       );
    //     });
    //   };
      useEffect(() => {
        axiosData();
        checkAuthorization();
      }, []);
    return (
      <div>
        <Header />
        <CreateArea init={axiosData} />
        <WaitFinish notDone={notDone} done={done} init={axiosData} />
        <Chose change={setChose} />
        <div className="container">
          <div className="container noteItem">{showData()}</div>
        </div>
      </div>
    );
}

export default TodoPage