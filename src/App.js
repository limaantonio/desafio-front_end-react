import React, {useEffect, useState} from "react";

import "./styles.css";
import api from "./services/api";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
    setRepositories(response.data);
    })
    }, []);

  async function handleAddRepository() {  
     const response = await api.post('repositories',{
      title : `Desafio React Navite ${Date.now()}`,
      url : "https://github.com/limaantonio",
      techs : [
        "Node.js", "React JS"
      ]
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    
    await api.delete(`repositories/${id}`);
    const repositoryIndex = repositories.findIndex(repo => repo.id === id);
    const repository = [...repositories];
    repository.splice(repositoryIndex, 1);
    setRepositories(repository);
  }
  

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => 
          <li key={repository.id}>
            {repository.title}
         
          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
          </li>)}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
