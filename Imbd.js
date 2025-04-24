import React, { useState } from 'react';

const initialActors = [
  { id: 1, name: 'Leonardo DiCaprio' },
  { id: 2, name: 'Scarlett Johansson' }
];

const initialProducers = [
  { id: 1, name: 'Christopher Nolan' }
];

const IMDBClone = () => {
  const [movies, setMovies] = useState([]);
  const [actors, setActors] = useState(initialActors);
  const [producers, setProducers] = useState(initialProducers);

  const [movieForm, setMovieForm] = useState({
    name: '',
    year: '',
    producer: '',
    newProducer: '',
    selectedActors: [],
    newActor: ''
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setMovieForm((prev) => ({ ...prev, [name]: value }));
  };

  const toggleActorSelection = (id) => {
    setMovieForm((prev) => {
      const selected = prev.selectedActors.includes(id)
        ? prev.selectedActors.filter((a) => a !== id)
        : [...prev.selectedActors, id];
      return { ...prev, selectedActors: selected };
    });
  };

  const handleAddMovie = () => {
    const actorList = [...actors];
    const producerList = [...producers];

    // Add new actor if provided
    if (movieForm.newActor) {
      const newActor = { id: actorList.length + 1, name: movieForm.newActor };
      actorList.push(newActor);
      movieForm.selectedActors.push(newActor.id);
    }

    // Add new producer if provided
    let producerId = parseInt(movieForm.producer);
    if (movieForm.newProducer) {
      const newProducer = { id: producerList.length + 1, name: movieForm.newProducer };
      producerList.push(newProducer);
      producerId = newProducer.id;
    }

    const newMovie = {
      name: movieForm.name,
      year: movieForm.year,
      producer: producerList.find((p) => p.id === producerId)?.name || '',
      actors: actorList.filter((a) => movieForm.selectedActors.includes(a.id)).map((a) => a.name)
    };

    setMovies([...movies, newMovie]);
    setActors(actorList);
    setProducers(producerList);
    setMovieForm({ name: '', year: '', producer: '', newProducer: '', selectedActors: [], newActor: '' });
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-xl font-bold mb-4">IMDB Clone - Movie Manager</h2>

      <div className="mb-6">
        <h3 className="text-lg font-semibold">Add New Movie</h3>
        <input name="name" value={movieForm.name} onChange={handleFormChange} placeholder="Movie Name" className="w-full border p-2 mt-2 mb-2 rounded" />
        <input name="year" value={movieForm.year} onChange={handleFormChange} placeholder="Year of Release" className="w-full border p-2 mb-2 rounded" />

        <select name="producer" value={movieForm.producer} onChange={handleFormChange} className="w-full border p-2 mb-2 rounded">
          <option value="">Select Producer</option>
          {producers.map((prod) => (
            <option key={prod.id} value={prod.id}>{prod.name}</option>
          ))}
        </select>
        <input name="newProducer" value={movieForm.newProducer} onChange={handleFormChange} placeholder="Or Add New Producer" className="w-full border p-2 mb-2 rounded" />

        <div className="mb-2">Select Actors:</div>
        {actors.map((actor) => (
          <label key={actor.id} className="block">
            <input
              type="checkbox"
              checked={movieForm.selectedActors.includes(actor.id)}
              onChange={() => toggleActorSelection(actor.id)}
              className="mr-2"
            />
            {actor.name}
          </label>
        ))}
        <input name="newActor" value={movieForm.newActor} onChange={handleFormChange} placeholder="Or Add New Actor" className="w-full border p-2 mt-2 mb-2 rounded" />

        <button onClick={handleAddMovie} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Add Movie</button>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Movie Listings</h3>
        {movies.length === 0 ? <p>No movies added yet.</p> : (
          <ul className="space-y-4">
            {movies.map((movie, index) => (
              <li key={index} className="border p-4 rounded">
                <h4 className="font-bold text-md">{movie.name} ({movie.year})</h4>
                <p><strong>Producer:</strong> {movie.producer}</p>
                <p><strong>Actors:</strong> {movie.actors.join(', ')}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default IMDBClone;
