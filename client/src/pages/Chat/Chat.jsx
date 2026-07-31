import React, { useState } from 'react';
import { 
  FaSearch, FaEdit, FaPaperPlane, FaPlus, FaSmile, 
  FaArrowLeft, FaEllipsisV, FaCheckDouble, FaChevronDown 
} from 'react-icons/fa';

export default function Chat() {
  const [activeTab, setActiveTab] = useState('All');
  const [selectedChatId, setSelectedChatId] = useState(1);
  const [messageInput, setMessageInput] = useState('');
  const [showMobileChat, setShowMobileChat] = useState(false);

  // Conversations List Mock Data
  const conversations = [
    {
      id: 1,
      name: 'Rohit Sharma',
      type: 'Buying',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop',
      lastMessage: 'Is it still available?',
      time: '10:30 AM',
      unread: 2,
      online: true,
      product: {
        title: 'Java Programming Book',
        price: '₹350',
        img: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=150&auto=format&fit=crop'
      }
    },
    {
      id: 2,
      name: 'Ankita Patil',
      type: 'Buying',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop',
      lastMessage: 'Can you reduce the price?',
      time: '09:15 AM',
      unread: 1,
      online: true,
      product: {
        title: 'Engineering Mathematics',
        price: '₹400',
        img: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=150&auto=format&fit=crop'
      }
    },
    {
      id: 3,
      name: 'Aman Tiwari',
      type: 'Selling',
      avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop',
      lastMessage: 'Okay, thanks!',
      time: 'Yesterday',
      unread: 0,
      online: false,
      product: {
        title: 'Logitech Wireless Mouse',
        price: '₹600',
        img: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=150&auto=format&fit=crop'
      }
    },
    {
      id: 4,
      name: 'Neha Mehta',
      type: 'Buying',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop',
      lastMessage: 'Deal confirmed ✔',
      time: 'Yesterday',
      unread: 2,
      online: true,
      product: {
        title: 'Study Lamp LED',
        price: '₹250',
        img: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=150&auto=format&fit=crop'
      }
    },
    {
      id: 5,
      name: 'Vivek Singh',
      type: 'Selling',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop',
      lastMessage: 'Check this out',
      time: '2 Aug',
      unread: 0,
      online: false,
      product: {
        title: 'Drafting Board',
        price: '₹800',
        img: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=150&auto=format&fit=crop'
      }
    }
  ];

  // Active Chat Message Thread Mock Data
  const [messages, setMessages] = useState([
    { id: 1, sender: 'other', text: 'Hey Shubham! 👋', time: '10:28 AM' },
    { id: 2, sender: 'other', text: 'I\'m interested in your Java book.', time: '10:28 AM' },
    { id: 3, sender: 'me', text: 'Hi Rohit! 😊', time: '10:28 AM' },
    { id: 4, sender: 'other', text: 'Is it still available?', time: '10:29 AM' },
    { id: 5, sender: 'me', text: 'Yes, it is available.', time: '10:29 AM' },
    { id: 6, sender: 'me', text: 'Great! Would you like to meet tomorrow in college library?', time: '10:30 AM' },
    { id: 7, sender: 'other', text: 'Yes, that works for me.', time: '10:30 AM' },
    { id: 8, sender: 'other', text: 'What time?', time: '10:30 AM' },
    { id: 9, sender: 'me', text: 'How about 2:30 PM?', time: '10:30 AM' },
    { id: 10, sender: 'other', text: 'Perfect! See you then 👍', time: '10:31 AM' },
  ]);

  const activeContact = conversations.find(c => c.id === selectedChatId) || conversations[0];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!messageInput.trim()) return;

    const newMsg = {
      id: Date.now(),
      sender: 'me',
      text: messageInput,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, newMsg]);
    setMessageInput('');
  };

  const handleSelectContact = (id) => {
    setSelectedChatId(id);
    setShowMobileChat(true);
  };

  // Filter conversations based on selected tab
  const filteredConversations = conversations.filter(item => {
    if (activeTab === 'All') return true;
    if (activeTab === 'Unread') return item.unread > 0;
    return item.type === activeTab;
  });

  return (
    <div className="h-[calc(100vh-6.5rem)] flex bg-white rounded-3xl border border-gray-200/80 shadow-xs overflow-hidden">
      
      {/* ==================== LEFT SIDEBAR: MESSAGES LIST ==================== */}
      <div className={`w-full md:w-80 lg:w-96 border-r border-gray-200/80 flex flex-col bg-white shrink-0 ${showMobileChat ? 'hidden md:flex' : 'flex'}`}>
        
        {/* Header & New Chat Button */}
        <div className="p-4 flex items-center justify-between border-b border-gray-100">
          <h2 className="text-xl font-black text-gray-900 tracking-tight">Messages</h2>
          <button className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-xl transition cursor-pointer">
            <FaEdit className="text-lg" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="px-4 py-3">
          <div className="relative">
            <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
            <input 
              type="text" 
              placeholder="Search conversations..." 
              className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200/80 rounded-xl text-xs font-semibold text-gray-800 placeholder-gray-400 outline-none focus:border-indigo-600 focus:bg-white transition"
            />
          </div>
        </div>

        {/* Filter Pills */}
        <div className="px-4 pb-3 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {['All', 'Unread', 'Buying', 'Selling'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition shrink-0 cursor-pointer ${
                activeTab === tab
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200/70'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto divide-y divide-gray-50">
          {filteredConversations.map((item) => (
            <div 
              key={item.id}
              onClick={() => handleSelectContact(item.id)}
              className={`p-3.5 flex items-center gap-3 cursor-pointer transition ${
                selectedChatId === item.id ? 'bg-indigo-50/60' : 'hover:bg-gray-50'
              }`}
            >
              {/* Avatar + Status Indicator */}
              <div className="relative shrink-0">
                <img src={item.avatar} alt={item.name} className="w-11 h-11 rounded-full object-cover" />
                {item.online && (
                  <span className="w-3 h-3 bg-emerald-500 border-2 border-white rounded-full absolute bottom-0 right-0"></span>
                )}
              </div>

              {/* Chat Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-0.5">
                  <h4 className="font-extrabold text-xs md:text-sm text-gray-900 truncate">
                    {item.name}
                  </h4>
                  <span className="text-[10px] text-gray-400 font-semibold">{item.time}</span>
                </div>

                <div className="flex items-center justify-between gap-1">
                  <div className="flex items-center gap-1.5 truncate">
                    <span className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded-md uppercase tracking-wider ${
                      item.type === 'Buying' ? 'bg-purple-100 text-purple-600' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {item.type}
                    </span>
                    <p className="text-xs text-gray-500 truncate font-medium">{item.lastMessage}</p>
                  </div>

                  {item.unread > 0 && (
                    <span className="bg-indigo-600 text-white text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center shrink-0">
                      {item.unread}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Load More Conversations Footer */}
          <div className="p-3 text-center border-t border-gray-100">
            <button className="text-indigo-600 hover:text-indigo-700 text-xs font-bold inline-flex items-center gap-1">
              Load more conversations <FaChevronDown className="text-[10px]" />
            </button>
          </div>
        </div>

      </div>

      {/* ==================== RIGHT PANEL: ACTIVE CHAT CONVERSATION ==================== */}
      <div className={`flex-1 flex-col bg-[#F9FAFC] ${showMobileChat ? 'flex' : 'hidden md:flex'}`}>
        
        {/* Active Chat Header */}
        <div className="bg-white px-4 py-3 border-b border-gray-200/80 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            
            {/* Mobile Back Button */}
            <button 
              onClick={() => setShowMobileChat(false)}
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-xl md:hidden cursor-pointer"
            >
              <FaArrowLeft />
            </button>

            {/* User Avatar */}
            <div className="relative shrink-0">
              <img src={activeContact.avatar} alt={activeContact.name} className="w-10 h-10 rounded-full object-cover" />
              {activeContact.online && (
                <span className="w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full absolute bottom-0 right-0"></span>
              )}
            </div>

            <div className="min-w-0">
              <h3 className="font-extrabold text-sm text-gray-900 truncate leading-tight">
                {activeContact.name}
              </h3>
              <p className="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span> Online
              </p>
            </div>
          </div>

          {/* Product Context Widget Header */}
          <div className="flex items-center gap-3 shrink-0">
            {activeContact.product && (
              <div className="hidden sm:flex items-center gap-3 bg-gray-50 border border-gray-200/80 p-1.5 pr-3 rounded-2xl">
                <img src={activeContact.product.img} alt="Product" className="w-9 h-9 rounded-xl object-cover shrink-0" />
                <div className="text-left">
                  <p className="text-xs font-extrabold text-gray-900 truncate max-w-[120px]">{activeContact.product.title}</p>
                  <p className="text-xs font-black text-indigo-600">{activeContact.product.price}</p>
                </div>
                <button className="ml-2 border border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white font-extrabold text-[11px] px-3 py-1.5 rounded-xl transition cursor-pointer">
                  View Product
                </button>
              </div>
            )}
            
            <button className="p-2 text-gray-400 hover:text-gray-600 rounded-xl cursor-pointer">
              <FaEllipsisV />
            </button>
          </div>
        </div>

        {/* Message Thread Area */}
        <div className="flex-1 p-4 md:p-6 overflow-y-auto space-y-3.5 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
          
          {/* Day Divider */}
          <div className="flex items-center justify-center my-2">
            <span className="bg-white/80 backdrop-blur-xs text-gray-400 font-bold text-[10px] px-3 py-1 rounded-full border border-gray-200/60 uppercase tracking-widest">
              Today
            </span>
          </div>

          {/* Messages Mapping */}
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex items-end gap-2 ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'other' && (
                <img src={activeContact.avatar} alt="Sender" className="w-6 h-6 rounded-full object-cover shrink-0 mb-1" />
              )}

              <div className={`max-w-[78%] sm:max-w-[65%] px-4 py-2.5 rounded-2xl text-xs md:text-sm shadow-xs ${
                msg.sender === 'me' 
                  ? 'bg-indigo-600 text-white rounded-br-xs font-medium' 
                  : 'bg-white text-gray-800 border border-gray-100 rounded-bl-xs font-medium'
              }`}>
                <p className="leading-relaxed">{msg.text}</p>
                <div className={`flex items-center gap-1 justify-end mt-1 text-[10px] ${
                  msg.sender === 'me' ? 'text-indigo-200' : 'text-gray-400'
                }`}>
                  <span>{msg.time}</span>
                  {msg.sender === 'me' && <FaCheckDouble className="text-[10px]" />}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input Footer */}
        <form onSubmit={handleSendMessage} className="p-3 md:p-4 bg-white border-t border-gray-200/80 flex items-center gap-2 shrink-0">
          <button type="button" className="p-2.5 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition cursor-pointer shrink-0">
            <FaPlus className="text-xs" />
          </button>

          <div className="flex-1 relative flex items-center">
            <input 
              type="text" 
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              placeholder="Type a message..." 
              className="w-full pl-4 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-full text-xs md:text-sm font-medium text-gray-800 placeholder-gray-400 outline-none focus:border-indigo-600 focus:bg-white transition"
            />
            <button type="button" className="absolute right-3 text-gray-400 hover:text-gray-600 cursor-pointer">
              <FaSmile className="text-base" />
            </button>
          </div>

          <button 
            type="submit" 
            className="p-2.5 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white rounded-full transition shadow-md shadow-indigo-200 cursor-pointer shrink-0"
          >
            <FaPaperPlane className="text-xs" />
          </button>
        </form>

      </div>

    </div>
  );
}