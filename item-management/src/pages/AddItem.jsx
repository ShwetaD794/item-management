import React, { useState } from 'react';
import "../index.css";

const AddItem = () => {
  // Form state for the item
  const [form, setForm] = useState({
    name: '',
    type: '',
    description: '',
    coverImage: '',
    additionalImages: [],
  });

  // Success message flag
  const [success, setSuccess] = useState(false);

  // Handle input changes
  const handleChange = (event) => {
    const { name, value, files } = event.target;

    // For cover image (single file)
    if (name === 'coverImage') {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setForm((prevForm) => ({
          ...prevForm,
          coverImage: reader.result,
        }));
      };
      if (file) reader.readAsDataURL(file);
    }

    // For additional images (multiple files)
    else if (name === 'additionalImages') {
      const images = Array.from(files);
      const readers = images.map((file) => {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.readAsDataURL(file);
        });
      });

      Promise.all(readers).then((imageData) => {
        setForm((prevForm) => ({
          ...prevForm,
          additionalImages: imageData,
        }));
      });
    }

    // For text fields (name, type, description)
    else {
      setForm((prevForm) => ({
        ...prevForm,
        [name]: value,
      }));
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Get existing items or start with empty array
    const existingItems = JSON.parse(localStorage.getItem('items') || '[]');

    // Add the new item
    const updatedItems = [...existingItems, form];
    localStorage.setItem('items', JSON.stringify(updatedItems));

    // Reset form and show success message
    setSuccess(true);
    setForm({
      name: '',
      type: '',
      description: '',
      coverImage: '',
      additionalImages: [],
    });
  };

  return (
    <div className="container">
      <h2>Add Item</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Item Name"
          value={form.name}
          onChange={handleChange}
          required
        /><br />

        <input
          name="type"
          placeholder="Item Type"
          value={form.type}
          onChange={handleChange}
          required
        /><br />

        <textarea
          name="description"
          placeholder="Item Description"
          value={form.description}
          onChange={handleChange}
          required
        ></textarea><br />

        <input
          type="file"
          name="coverImage"
          accept="image/*"
          onChange={handleChange}
          className='file-input'
          required
        /><br />

        <input
          type="file"
          name="additionalImages"
          accept="image/*"
          multiple
          onChange={handleChange}
          className='file-input'
        /><br />

        <div className="btn">
            <button type="submit">Add Item</button>
        </div>
      </form>

      {success && <p style={{ color: 'green' }}>Item successfully added</p>}
    </div>
  );
};

export default AddItem;
