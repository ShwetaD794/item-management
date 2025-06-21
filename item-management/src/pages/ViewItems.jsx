import React, { useEffect, useState } from 'react';
import ItemModal from '../components/ItemModal';
import ItemCard from '../components/ItemCard';

const ViewItems = () => {
  const [items, setItems] = useState([]);
  const [activeItem, setActiveItem] = useState(null);

  useEffect(() => {
    const savedItems = JSON.parse(localStorage.getItem('items') || '[]');
    setItems(savedItems);
  }, []);

  const handleDelete = (itemToDelete) => {
    const updated = items.filter((item) => item.name !== itemToDelete.name);
    setItems(updated);
    localStorage.setItem('items', JSON.stringify(updated));
  };

  const handleEdit = (editedItem) => {
    const updated = items.map((item) =>
      item.name === editedItem.name ? editedItem : item
    );
    setItems(updated);
    localStorage.setItem('items', JSON.stringify(updated));
  };

  return (
    <div className="view-container">
      <h2>View Items</h2>
      <div className="item-grid">
        {items.map((item, index) => (
          <ItemCard key={index} item={item} onClick={() => setActiveItem(item)} />
        ))}
      </div>
      {activeItem && (
        <ItemModal
          item={activeItem}
          onClose={() => setActiveItem(null)}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      )}
    </div>
  );
};

export default ViewItems;
