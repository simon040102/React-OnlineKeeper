import React from "react";

const Select=(props)=>{
    const chose=(e)=>{
        props.change(e.target.dataset.tab);
    }
    return (
      <ul className="select container" onClick={chose}>
        <li>
          <button data-tab="all">All</button>
        </li>
        <li>
          <button data-tab="string">Done</button>
        </li>
        <li>
          <button data-tab="object">undone</button>
        </li>
      </ul>
    );
}

export default Select;