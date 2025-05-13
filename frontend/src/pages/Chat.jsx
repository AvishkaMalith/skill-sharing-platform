import { useEffect, useRef, useState } from 'react';
import { user as userApi } from '../services/api';
import axios from 'axios';
import { MoreVertical, Edit2, Trash2 } from 'lucide-react';

function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingContent, setEditingContent] = useState('');
  const [user, setUser] = useState(null);
  const [showMenuId, setShowMenuId] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await userApi.getCurrent();
      setUser(res.data);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchMessages = async () => {
      const res = await axios.get('/api/chat-messages');
      setMessages(res.data);
    };
    fetchMessages();
    const interval = setInterval(fetchMessages, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || !user) return;
    await axios.post('/api/chat-messages', { userId: user.userId || user.id || user._id, content: input });
    setInput('');
  };

  const handleEdit = (id, content) => {
    setEditingId(id);
    setEditingContent(content);
    setShowMenuId(null);
  };

  const handleEditSubmit = async (id) => {
    await axios.put(`/api/chat-messages/${id}`, { userId: user.userId || user.id || user._id, content: editingContent });
    setEditingId(null);
    setEditingContent('');
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this message?')) return;
    await axios.delete(`/api/chat-messages/${id}?userId=${user.userId || user.id || user._id}`);
    setShowMenuId(null);
  };

  const isCurrentUser = (msg) => user && (msg.sender?.userId === user.userId || msg.sender?.userId === user.id || msg.sender?.userId === user._id);

  const getInitials = (name) => {
    if (!name) return '?';
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 min-h-screen flex flex-col">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Chat Room</h1>
      <div className="flex-1 overflow-y-auto bg-white rounded-lg shadow-lg p-4 mb-4" style={{ minHeight: 500 }}>
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex mb-4 ${isCurrentUser(msg) ? 'justify-end' : 'justify-start'}`}
          >
            {!isCurrentUser(msg) && (
              <div className="flex-shrink-0 mr-2">
                {msg.sender?.profilePictureUrl ? (
                  <img
                    src={msg.sender.profilePictureUrl}
                    alt={msg.sender.fullName}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm">
                    {getInitials(msg.sender?.fullName)}
                  </div>
                )}
              </div>
            )}
            <div className={`max-w-lg ${isCurrentUser(msg) ? 'order-1' : 'order-2'}`}>
              <div className={`p-3 rounded-lg shadow-sm ${
                isCurrentUser(msg) 
                  ? 'bg-blue-500 text-white rounded-br-none' 
                  : 'bg-gray-100 text-gray-800 rounded-bl-none'
              }`}>
                {!isCurrentUser(msg) && (
                  <div className="text-sm font-semibold mb-1 text-gray-700">
                    {msg.sender?.fullName || 'Unknown User'}
                  </div>
                )}
                {editingId === msg.id ? (
                  <div>
                    <textarea
                      className="w-full border rounded p-2 text-gray-800"
                      value={editingContent}
                      onChange={e => setEditingContent(e.target.value)}
                    />
                    <div className="flex gap-2 mt-1 justify-end">
                      <button 
                        className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                        onClick={() => handleEditSubmit(msg.id)}
                      >
                        Save
                      </button>
                      <button 
                        className="text-sm bg-gray-200 text-gray-700 px-3 py-1 rounded hover:bg-gray-300"
                        onClick={() => setEditingId(null)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="whitespace-pre-wrap break-words">{msg.content}</div>
                    <div className="text-xs mt-1 opacity-75">
                      {new Date(msg.timestamp).toLocaleTimeString()}
                    </div>
                  </>
                )}
              </div>
            </div>
            {isCurrentUser(msg) && (
              <div className="flex-shrink-0 ml-2 order-2">
                {msg.sender?.profilePictureUrl ? (
                  <img
                    src={msg.sender.profilePictureUrl}
                    alt={msg.sender.fullName}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm">
                    {getInitials(msg.sender?.fullName)}
                  </div>
                )}
              </div>
            )}
            {isCurrentUser(msg) && !editingId && (
              <div className="relative order-3">
                <button
                  onClick={() => setShowMenuId(showMenuId === msg.id ? null : msg.id)}
                  className="p-1 hover:bg-gray-100 rounded-full"
                >
                  <MoreVertical size={16} className="text-gray-500" />
                </button>
                {showMenuId === msg.id && (
                  <div className="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-lg py-1 z-10">
                    <button
                      onClick={() => handleEdit(msg.id, msg.content)}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <Edit2 size={16} className="mr-2" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(msg.id)}
                      className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      <Trash2 size={16} className="mr-2" />
                      Delete
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSend} className="flex gap-2 bg-white p-4 rounded-lg shadow-lg">
        <textarea
          className="flex-1 border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type your message..."
          rows={2}
        />
        <button 
          type="submit" 
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 self-end transition-colors"
        >
          Send
        </button>
      </form>
    </div>
  );
}

export default Chat; 