import React, { useState } from "react";

const Select=(props)=>{
    const [active,setActive]=useState({tag:'all'})
    
    const chose=(e)=>{
        if(e.target.nodeName!=="BUTTON") return
        props.change(e.target.dataset.tab);
        let tab = e.target.dataset.tab;
        setActive({tag:tab})
        
    }
    return (
      <ul
        className="flex select space-x-3 mt-3 container mx-auto w-9/12 md:w-6/12"
        onClick={chose}
      >
        <li className="w-1/3">
          <button
            className="w-full leading-7 bg-teal-100 rounded-xl text-xl transition duration-300 ease-out "
            style={
              active.tag == 'all'
                ? {
                    backgroundColor: '#1f7a8c',
                    border: '2px solid #022b3a',
                    color: 'white',
                    boxShadow: '0 10px 10px 0 #0000004d',
                  }
                : null
            }
            data-tab="all"
          >
            All
          </button>
        </li>
        <li className="w-1/3">
          <button
            className="w-full leading-7 bg-teal-100 rounded-xl text-xl transition duration-300 ease-out "
            style={
              active.tag == 'string'
                ? {
                    backgroundColor: '#1f7a8c',
                    border: '2px solid #022b3a',
                    color: 'white',
                    boxShadow: '0 10px 10px 0 #0000004d',
                  }
                : null
            }
            data-tab="string"
          >
            Done
          </button>
        </li>
        <li className="w-1/3">
          <button
            className="w-full leading-7 bg-teal-100 rounded-xl text-xl transition duration-300 ease-out "
            style={
              active.tag == 'object'
                ? {
                    backgroundColor: '#1f7a8c',
                    border: '2px solid #022b3a',
                    color: 'white',
                    boxShadow: '0 10px 10px 0 #0000004d',
                  }
                : null
            }
            data-tab="object"
          >
            undone
          </button>
        </li>
      </ul>
    );
}

export default Select;