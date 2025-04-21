import { useState } from 'react';

function PackingList({ tripId }) {
  const [items, setItems] = useState(() => {
    const savedItems = localStorage.getItem(`packing-list-${tripId}`);
    return savedItems ? JSON.parse(savedItems) : [];
  });
  const [newItem, setNewItem] = useState('');
  const [category, setCategory] = useState('clothing');

  const categories = {
    clothing: '👕 Clothing',
    electronics: '📱 Electronics',
    toiletries: '🧴 Toiletries',
    documents: '📄 Documents',
    other: '📦 Other'
  };

  const addItem = (e) => {
    e.preventDefault();
    if (!newItem.trim()) return;

    setItems(prevItems => {
      const updatedItems = [...prevItems, {
        id: Date.now(),
        name: newItem.trim(),
        category,
        packed: false
      }];
      localStorage.setItem(`packing-list-${tripId}`, JSON.stringify(updatedItems));
      return updatedItems;
    });

    setNewItem('');
  };

  const togglePacked = (itemId) => {
    setItems(prevItems => {
      const updatedItems = prevItems.map(item => 
        item.id === itemId ? { ...item, packed: !item.packed } : item
      );
      localStorage.setItem(`packing-list-${tripId}`, JSON.stringify(updatedItems));
      return updatedItems;
    });
  };

  const deleteItem = (itemId) => {
    setItems(prevItems => {
      const updatedItems = prevItems.filter(item => item.id !== itemId);
      localStorage.setItem(`packing-list-${tripId}`, JSON.stringify(updatedItems));
      return updatedItems;
    });
  };

  const getItemsByCategory = (category) => {
    return items.filter(item => item.category === category);
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Packing List</h3>
      
      <form onSubmit={addItem} className="mb-6">
        <div className="flex gap-4">
          <input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder="Add new item..."
            className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          >
            {Object.entries(categories).map(([key, label]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add
          </button>
        </div>
      </form>

      <div className="space-y-6">
        {Object.entries(categories).map(([categoryKey, categoryLabel]) => {
          const categoryItems = getItemsByCategory(categoryKey);
          if (categoryItems.length === 0) return null;

          return (
            <div key={categoryKey} className="space-y-2">
              <h4 className="text-lg font-medium text-gray-700">{categoryLabel}</h4>
              <div className="space-y-2">
                {categoryItems.map(item => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={item.packed}
                        onChange={() => togglePacked(item.id)}
                        className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <span className={`${item.packed ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                        {item.name}
                      </span>
                    </div>
                    <button
                      onClick={() => deleteItem(item.id)}
                      className="text-red-500 hover:text-red-700 p-1"
                    >
                      🗑️
                    </button>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {items.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <p>No items added yet. Start packing!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default PackingList; 