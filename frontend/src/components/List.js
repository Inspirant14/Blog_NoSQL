import React from "react";
import { BiEditAlt } from "react-icons/bi";
import { BsTrash } from "react-icons/bs";
import axios from "axios";
import { baseURL } from "../utils/constant";

const List = ({ id, title, content, setUpdateUI, updateMode }) => {
  const removeTask = (id) => {
    axios.delete(`${baseURL}/delete/${id}`).then(() => {
      setUpdateUI();
    });
  };

  return (
    <li className="list" >
      <h3>{title}</h3>
      <p>{content}</p>
      <div className="icon_holder">
        <BiEditAlt
          className="icon"
          onClick={() => updateMode(id, title, content)}
        />
        <BsTrash className="icon" onClick={() => removeTask(id)} />
      </div>
    </li>
  );
};

export default List;
