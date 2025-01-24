import React, { useEffect, useState } from "react";
import List from "./components/List";
import axios from "axios";
import { baseURL } from "./utils/constant";

const App = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState(""); // Champ de recherche
  const [page, setPage] = useState(1); // Page actuelle
  const [totalPages, setTotalPages] = useState(1); // Nombre total de pages
  const [updateId, setUpdateId] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, [page, search]); // Recharger lorsque la page ou la recherche change

  const fetchTasks = async () => {
    try {
      const res = await axios.get(`${baseURL}/get`, {
        params: { page, limit: 3, search }, // Envoyer les paramètres
      });
      setTasks(res.data.tasks);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error(err);
    }
  };

  const addTask = () => {
    axios
      .post(`${baseURL}/save`, { title, content })
      .then(() => {
        setTitle("");
        setContent("");
        fetchTasks(); // Recharger les tâches
      });
  };

  const updateMode = (id, taskTitle, taskContent) => {
    setTitle(taskTitle);
    setContent(taskContent);
    setUpdateId(id);
  };

  const updateTask = () => {
    axios
      .put(`${baseURL}/update/${updateId}`, { title, content })
      .then(() => {
        setTitle("");
        setContent("");
        setUpdateId(null);
        fetchTasks(); // Recharger les tâches
      });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1); // Réinitialise à la première page lors d'une nouvelle recherche
    fetchTasks();
  };

  return (
    <main>
      <h1 className="title">BLOgggggG</h1>

      <div className="input_holder">
        <input
          type="text"
          placeholder="Search by title"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={handleSearch}>Recherche</button>
      </div>

      <div className="input_holder">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <button type="submit" onClick={updateId ? updateTask : addTask}>
          {updateId ? "Update Blog" : "Add Blog"}
        </button>
      </div>

      <ul>
        {tasks.map((task) => (
          <List
            key={task._id}
            id={task._id}
            title={task.title}
            content={task.content}
            setUpdateUI={fetchTasks}
            updateMode={updateMode}
          />
        ))}
      </ul>

      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>
          Next
        </button>
      </div>
    </main>
  );
};

export default App;
