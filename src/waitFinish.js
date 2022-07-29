import React from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import DeleteIcon from '@mui/icons-material/Delete';
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
      <div className="w-9/12 sm:flex-none md:w-6/12 mx-auto md:flex justify-between">
        <button
          className="md:w-5/12 w-full mb-3 md:mb-0 bg-red-300 rounded-xl leading-8"
          onClick={deleteFinish}
        >
          <DeleteIcon className="text-md flex -mt-1" />
          Delete {props.done.length} Finished
        </button>
        <div className="md:w-1/2 w-full mb-3 md:mb-0 text-center text-xl rounded-xl leading-8 text-white bg-gray-800">
          {props.notDone.length} item wait finish
        </div>
      </div>
    );
}


export default WaitFinish;