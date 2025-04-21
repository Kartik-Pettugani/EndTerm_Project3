import { useState } from 'react';
import { useTripContext } from '../context/TripContext';

function TripForm() {
  const { addTrip } = useTripContext();

  const [form, setForm] = useState({
    destination: '',
    startDate: '',
    endDate: '',
    notes: ''
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.destination || !form.startDate || !form.endDate) {
      setError('Please fill all required fields');
      return;
    }
    addTrip(form);
    setForm({ destination: '', startDate: '', endDate: '', notes: '' });
    setError('');
    alert('Trip added!');
  };

  return (
    <form className="max-w-md mx-auto p-4 bg-white shadow-md rounded" onSubmit={handleSubmit}>
      <h2 className="text-xl font-bold mb-4">Add a New Trip</h2>

      <input
        name="destination"
        type="text"
        placeholder="Destination"
        className="w-full p-2 border mb-2"
        value={form.destination}
        onChange={handleChange}
      />
      <input
        name="startDate"
        type="date"
        className="w-full p-2 border mb-2"
        value={form.startDate}
        onChange={handleChange}
      />
      <input
        name="endDate"
        type="date"
        className="w-full p-2 border mb-2"
        value={form.endDate}
        onChange={handleChange}
      />
      <textarea
        name="notes"
        placeholder="Notes (optional)"
        className="w-full p-2 border mb-2"
        rows="3"
        value={form.notes}
        onChange={handleChange}
      />
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Save Trip</button>
    </form>
  );
}

export default TripForm;
