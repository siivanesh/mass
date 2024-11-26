import React, { useState } from 'react';
import { format } from 'date-fns';
import { Send, Paperclip, Smile, MoreVertical, Phone, Video } from 'lucide-react';
import type { Chat, Message } from '../types';

interface ChatWindowProps {
  chat: Chat;
  messages: Message[];
}

export default function ChatWindow({ chat, messages }: ChatWindowProps) {
  const [newMessage, setNewMessage] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    // Handle sending message here
    setNewMessage('');
  };

  return (
    <div className="flex-1 flex flex-col h-screen">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center space-x-4">
          <img
            src={chat.avatar}
            alt={chat.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <h2 className="font-semibold text-gray-900">{chat.name}</h2>
            <p className="text-sm text-gray-500">
              {chat.online ? 'online' : 'offline'}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Video className="w-5 h-5 text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Phone className="w-5 h-5 text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <MoreVertical className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#e5ded8]">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === 'me' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[70%] rounded-lg p-3 ${
                message.sender === 'me'
                  ? 'bg-green-100'
                  : 'bg-white'
              }`}
            >
              <p className="text-gray-900">{message.content}</p>
              <div className="flex items-center justify-end space-x-1 mt-1">
                <span className="text-xs text-gray-500">
                  {format(message.timestamp, 'HH:mm')}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <form onSubmit={handleSend} className="p-4 bg-gray-50 border-t border-gray-200">
        <div className="flex items-center space-x-4">
          <button
            type="button"
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <Smile className="w-6 h-6 text-gray-600" />
          </button>
          <button
            type="button"
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <Paperclip className="w-6 h-6 text-gray-600" />
          </button>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message"
            className="flex-1 px-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            type="submit"
            className="p-2 bg-green-500 hover:bg-green-600 rounded-full"
          >
            <Send className="w-6 h-6 text-white" />
          </button>
        </div>
      </form>
    </div>
  );
}