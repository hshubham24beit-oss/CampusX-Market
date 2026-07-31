import React from 'react';
import { Link } from 'react-router-dom';

export default function RecentChats() {
  const chats = [
    { id: 1, name: 'Rohit Sharma', msg: 'Is the laptop still available?', time: '2m', avatar: 'https://via.placeholder.com/35' },
    { id: 2, name: 'Sneha Patil', msg: 'Okay, thank you!', time: '1h', avatar: 'https://via.placeholder.com/35' },
    { id: 3, name: 'Aditya Verma', msg: 'Can you share more images?', time: '3h', avatar: 'https://via.placeholder.com/35' },
  ];

  return (
    <div className="sidebar-card chats-card">
      <div className="card-header">
        <h4>Recent Chats</h4>
        <Link to="/chat" className="view-all">View all</Link>
      </div>
      <div className="chats-list">
        {chats.map(chat => (
          <div key={chat.id} className="chat-item">
            <img src={chat.avatar} alt={chat.name} />
            <div className="chat-body">
              <div className="chat-title">
                <h5>{chat.name}</h5>
                <span className="chat-time">{chat.time}</span>
              </div>
              <p>{chat.msg}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}