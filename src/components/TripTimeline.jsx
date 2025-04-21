import { useState } from 'react';

function TripTimeline({ startDate, endDate }) {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    day: '',
    time: '',
    title: '',
    description: '',
    location: ''
  });

  const handleAddEvent = (e) => {
    e.preventDefault();
    if (!newEvent.day || !newEvent.time || !newEvent.title) return;

    setEvents(prev => [...prev, { ...newEvent, id: Date.now() }]);
    setNewEvent({
      day: '',
      time: '',
      title: '',
      description: '',
      location: ''
    });
  };

  const handleDeleteEvent = (eventId) => {
    setEvents(prev => prev.filter(event => event.id !== eventId));
  };

  const getDays = () => {
    if (!startDate || !endDate) return [];
    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = [];
    let current = new Date(start);
    
    while (current <= end) {
      days.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    return days;
  };

  const days = getDays();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Trip Timeline</h2>

      <form onSubmit={handleAddEvent} className="mb-8 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Day
            </label>
            <select
              value={newEvent.day}
              onChange={(e) => setNewEvent(prev => ({ ...prev, day: e.target.value }))}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              required
            >
              <option value="">Select Day</option>
              {days.map((day, index) => (
                <option key={index} value={index + 1}>
                  Day {index + 1} ({day.toLocaleDateString()})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Time
            </label>
            <input
              type="time"
              value={newEvent.time}
              onChange={(e) => setNewEvent(prev => ({ ...prev, time: e.target.value }))}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Title
            </label>
            <input
              type="text"
              value={newEvent.title}
              onChange={(e) => setNewEvent(prev => ({ ...prev, title: e.target.value }))}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="Event title"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Location
            </label>
            <input
              type="text"
              value={newEvent.location}
              onChange={(e) => setNewEvent(prev => ({ ...prev, location: e.target.value }))}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="Event location"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Description
            </label>
            <textarea
              value={newEvent.description}
              onChange={(e) => setNewEvent(prev => ({ ...prev, description: e.target.value }))}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="Event description"
              rows="2"
            />
          </div>
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Add Event
        </button>
      </form>

      <div className="space-y-8">
        {days.map((day, dayIndex) => {
          const dayEvents = events.filter(event => parseInt(event.day) === dayIndex + 1);
          if (dayEvents.length === 0) return null;

          return (
            <div key={dayIndex} className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700"></div>
              
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center z-10">
                  {dayIndex + 1}
                </div>
                <h3 className="ml-4 text-lg font-semibold text-gray-800 dark:text-white">
                  Day {dayIndex + 1} - {day.toLocaleDateString()}
                </h3>
              </div>

              <div className="ml-12 space-y-4">
                {dayEvents
                  .sort((a, b) => a.time.localeCompare(b.time))
                  .map((event) => (
                    <div
                      key={event.id}
                      className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 shadow-sm relative"
                    >
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600 rounded-l-lg"></div>
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                              {event.time}
                            </span>
                            <h4 className="text-lg font-semibold text-gray-800 dark:text-white">
                              {event.title}
                            </h4>
                          </div>
                          {event.location && (
                            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                              📍 {event.location}
                            </p>
                          )}
                          {event.description && (
                            <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                              {event.description}
                            </p>
                          )}
                        </div>
                        <button
                          onClick={() => handleDeleteEvent(event.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TripTimeline; 