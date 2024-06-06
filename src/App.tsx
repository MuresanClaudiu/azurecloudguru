import React, { useState } from 'react';
import './App.css';

interface CarQuery {
  fuelType: string;
  price: number;
  year: number;
  color: string;
}

interface CarPost {
  id: number;
  title: string;
  body: string;
}

function App(): JSX.Element {
  const [query, setQuery] = useState<CarQuery>({ fuelType: '', price: 0, year: 0, color: '' });
  const [posts, setPosts] = useState<CarPost[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery({ ...query, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data: CarPost[] = await response.json();
    setPosts(data.slice(0, 5)); // Fetch the first 5 posts for demonstra
    setLoading(false);
  };

  return (
      <div className="App">
        <header className="App-header">
          <h1>Car Model Finder</h1>
          <form onSubmit={handleSubmit}>
            <input type="text" name="fuelType" placeholder="Fuel Type" onChange={handleChange} />
            <input type="number" name="price" placeholder="Price" onChange={handleChange} />
            <input type="number" name="year" placeholder="Year" onChange={handleChange} />
            <input type="text" name="color" placeholder="Color" onChange={handleChange} />
            <button type="submit">Find Models</button>
          </form>
          {loading ? <p>Loading...</p> : (
              <div>
                <h2>Simulated Car Models:</h2>
                <ul>
                  {posts.map(post => (
                      <li key={post.id}>{post.title}</li>
                  ))}
                </ul>
              </div>
          )}
        </header>
      </div>
  );
}

export default App;
