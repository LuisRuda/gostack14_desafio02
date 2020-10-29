import React, {useState, useEffect} from "react";

import "./styles.css";

import api from './services/api';

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then((res) => {
      setRepositories(res.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Novo repositorio ${Date.now()}`,
      url: 'https://github.com',
      techs: ['Node.js', 'React.js', 'React Native']
    });

    const repository = response.data;

    setRepositories(prevState => [...prevState, repository]);
  }

  async function handleRemoveRepository(id) {
    api.delete(`repositories/${id}`).then(() => {
      setRepositories(prevState => prevState.filter(repository => repository.id !== id));
    });
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
