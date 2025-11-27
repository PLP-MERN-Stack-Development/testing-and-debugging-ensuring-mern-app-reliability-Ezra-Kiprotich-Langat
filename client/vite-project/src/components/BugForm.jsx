import { useState } from 'react';
import apiClient from '../api/apiClient';

export default function BugForm({ onBugCreated }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await apiClient.post('/bugs', { title, description });
      onBugCreated(res);
      setTitle('');
      setDescription('');
    } catch(err) { console.error(err); }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2 p-2 border rounded">
      <input className="border p-2 w-full" placeholder="Title" value={title} onChange={(e)=>setTitle(e.target.value)} />
      <textarea className="border p-2 w-full" placeholder="Description" value={description} onChange={(e)=>setDescription(e.target.value)} />
      <button className="bg-blue-600 text-white px-4 py-2 rounded">Report Bug</button>
    </form>
  );
}
