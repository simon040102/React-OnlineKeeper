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
      <ul className="select container" onClick={chose}>
        <li>
          <button
            className={active.tag == 'all' && 'changeColor'}
            data-tab="all"
          >
            All
          </button>
        </li>
        <li>
          <button
            className={active.tag == 'string' && 'changeColor'}
            data-tab="string"
          >
            Done
          </button>
        </li>
        <li>
          <button
            className={active.tag == 'object' && 'changeColor'}
            data-tab="object"
          >
            undone
          </button>
        </li>
      </ul>
    );
}

export default Select;