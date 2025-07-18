import React, { useState } from 'react';

const BugForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert('Title is required');
      return;
    }

    try {
      setLoading(true);
      const res = await fetch('/api/bugs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`, // ✅ Secure
        },
        body: JSON.stringify({ title, description }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Failed to add bug');
      }

      alert('Bug added successfully!');
      setTitle('');
      setDescription('');
    } catch (err) {
      console.error('Error adding bug:', err);
      alert(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Report a Bug</h2>
      <input
        type="text"
        placeholder="Bug Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
        required
      />
      <textarea
        placeholder="Bug Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{ width: '100%', padding: '8px', height: '80px', marginBottom: '10px' }}
      />
      <button type="submit" style={{ padding: '10px 15px' }} disabled={loading}>
        {loading ? 'Adding...' : 'Add Bug'}
      </button>
    </form>
  );
};

export default BugForm;