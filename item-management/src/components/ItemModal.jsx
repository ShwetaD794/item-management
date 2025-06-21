import React, { useState } from 'react';

const ItemModal = ({ item, onClose, onDelete, onEdit }) => {
  const [index, setIndex] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState(item);

  const handleEdit = () => {
    onEdit(form);
    setEditMode(false);
    onClose();
  };

  const next = () => setIndex((index + 1) % item.additionalImages.length);
  const prev = () => setIndex((index - 1 + item.additionalImages.length) % item.additionalImages.length);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close" onClick={onClose}>&times;</span>
        {editMode ? (
          <div className='edit-form'>
            <h3>Edit Item</h3>
            <input name="name" value={form.name} onChange={handleChange} />
            <input name="type" value={form.type} onChange={handleChange} />
            <textarea name="description" value={form.description} onChange={handleChange} />
            <button onClick={handleEdit}>Save</button>
            <button onClick={() => setEditMode(false)}>Cancel</button>
          </div>
        ) : (
          <>
            <h3>{item.name}</h3>
            <p><strong>Type:</strong> {item.type}</p>
            <p>{item.description}</p>
            {item.additionalImages.length > 0 && (
              <>
                <img src={item.additionalImages[index]} alt="carousel" className='modal-img'/>
              </>
            )}

            <div className='btn'>
            <button onClick={() => alert('Enquiry sent!')} className='modal-btn'>Enquire</button>
            </div>
            <div className="btn">
                <button onClick={() => setEditMode(true)} className='modal-btn'>Edit</button>
            <button onClick={() => { onDelete(item); onClose(); }} className='modal-btn'>Delete</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ItemModal;
