import React from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const WaitFinish=(props)=>{
     const authorization = localStorage.getItem('authorization');
   const deleteFinish=()=>{
    (props.done).forEach((item,index)=>{
        axios
          .delete(`https://todoo.5xcamp.us/todos/${item.id}`, {
            headers: { authorization },
          })
          .then((res) => {
            console.log(res.data);
            props.init();
             Swal.fire({
               position: 'center',
               icon: 'success',
               title: 'Success',
               showConfirmButton: false,
               timer: 1000,
             });
          });
    })
   }
    return (
      <div className="container waitFinish">
        <button onClick={deleteFinish}>Delete {props.done.length} Finished</button>
        <div className=" waitFinishItem">
          {props.notDone.length} item wait finish
        </div>
      </div>
    );
}


export default WaitFinish;