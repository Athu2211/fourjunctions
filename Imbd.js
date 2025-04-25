import React, { useState, useEffect } from 'react';

const IMDBClone = () => {
  const [actors, setActors] = useState([]);
  const [producers, setProducers] = useState([]);
  const [movies, setMovies] = useState([]);

  const [form, setForm] = useState({
    name: '',
    year: '',
    plot: '',
    poster: '',
    producer: '',
    newProducer: '',
    selectedActors: [],
    newActor: ''
  });

  useEffect(() => {
    const localActors = JSON.parse(localStorage.getItem('actors') || '[]');
    const localProducers = JSON.parse(localStorage.getItem('producers') || '[]');
    const localMovies = JSON.parse(localStorage.getItem('movies') || '[]');
    setActors(localActors);
    setProducers(localProducers);
    setMovies(localMovies);
  }, []);

  useEffect(() => {
    localStorage.setItem('actors', JSON.stringify(actors));
    localStorage.setItem('producers', JSON.stringify(producers));
    localStorage.setItem('movies', JSON.stringify(movies));
  }, [actors, producers, movies]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const toggleActor = (id) => {
    const updated = form.selectedActors.includes(id)
      ? form.selectedActors.filter(a => a !== id)
      : [...form.selectedActors, id];
    setForm({ ...form, selectedActors: updated });
  };

  const handleSubmit = () => {
    const newActors = [...actors];
    const newProducers = [...producers];

    if (form.newActor) {
      const newId = newActors.length + 1;
      newActors.push({ id: newId, name: form.newActor });
      form.selectedActors.push(newId);
    }

    let producerId = parseInt(form.producer);
    if (form.newProducer) {
      producerId = newProducers.length + 1;
      newProducers.push({ id: producerId, name: form.newProducer });
    }

    const movie = {
      name: form.name,
      year: form.year,
      plot: form.plot,
      poster: form.poster,
      producer: newProducers.find(p => p.id === producerId)?.name,
      actors: newActors.filter(a => form.selectedActors.includes(a.id)).map(a => a.name)
    };

    setActors(newActors);
    setProducers(newProducers);
    setMovies([...movies, movie]);
    setForm({ name: '', year: '', plot: '', poster: '', producer: '', newProducer: '', selectedActors: [], newActor: '' });
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-xl font-bold mb-4">IMDB Clone – Movie Management</h2>
      <div className="mb-6">
        <input name="name" placeholder="Movie Name" className="w-full p-2 border mb-2" value={form.name} onChange={handleChange} />
        <input name="year" placeholder="Year of Release" className="w-full p-2 border mb-2" value={form.year} onChange={handleChange} />
        <input name="plot" placeholder="Plot" className="w-full p-2 border mb-2" value={form.plot} onChange={handleChange} />
        <input name="poster" placeholder="Poster URL" className="w-full p-2 border mb-2" value={form.poster} onChange={handleChange} />

        <select name="producer" className="w-full p-2 border mb-2" value={form.producer} onChange={handleChange}>
          <option value="">Select Producer</option>
          {producers.map((p) => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>
        <input name="newProducer" placeholder="Or Add New Producer" className="w-full p-2 border mb-2" value={form.newProducer} onChange={handleChange} />

        <div className="mb-2">Select Actors:</div>
        {actors.map((actor) => (
          <label key={actor.id} className="block">
            <input type="checkbox" checked={form.selectedActors.includes(actor.id)} onChange={() => toggleActor(actor.id)} /> {actor.name}
          </label>
        ))}
        <input name="newActor" placeholder="Or Add New Actor" className="w-full p-2 border mt-2 mb-2" value={form.newActor} onChange={handleChange} />

        <button onClick={handleSubmit} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Add Movie</button>
      </div>

      <h3 className="text-lg font-semibold mb-2">Movie Listings</h3>
      {movies.map((movie, idx) => (
        <div key={idx} className="mb-4 border p-4 rounded bg-gray-50">
          <h4 className="font-bold text-md">{movie.name} ({movie.year})</h4>
          <p><strong>Plot:</strong> {movie.plot}</p>
          {movie.poster && <img src={movie.poster} alt={movie.name} className="w-32 h-auto my-2" />}
          <p><strong>Producer:</strong> {movie.producer}</p>
          <p><strong>Actors:</strong> {movie.actors.join(', ')}</p>
        </div>
      ))}
    </div>
  );
};

export default IMDBClone;
