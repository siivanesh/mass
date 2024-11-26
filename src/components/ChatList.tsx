import React from 'react';
import { format } from 'date-fns';
import { Check, CheckCheck } from 'lucide-react';
import type { Chat } from '../types';

interface ChatListProps {
  chats: Chat[];
  selectedChatId: string;
  onChatSelect: (chatId: string) => void;
}

const MessageStatus = ({ status }: { status: 'sent' | 'delivered' | 'read' }) => {
  if (status === 'read') return <CheckCheck className="w-4 h-4 text-blue-500" />;
  if (status === 'delivered') return <CheckCheck className="w-4 h-4 text-gray-500" />;
  return <Check className="w-4 h-4 text-gray-500" />;
};

export default function ChatList({ chats, selectedChatId, onChatSelect }: ChatListProps) {
  return (
    <div className="w-full max-w-sm border-r border-gray-200 bg-white">
      <div className="sticky top-0 z-10 bg-gray-50 p-4 border-b border-gray-200">
        <input
          type="search"
          placeholder="Search or start new chat"
          className="w-full px-4 py-2 rounded-lg bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>
      <div className="overflow-y-auto h-[calc(100vh-73px)]">
        {chats.map((chat) => (
          <div
            key={chat.id}
            onClick={() => onChatSelect(chat.id)}
            className={`flex items-center p-4 cursor-pointer hover:bg-gray-50 ${
              selectedChatId === chat.id ? 'bg-gray-100' : ''
            }`}
          >
            <div className="relative">
              <img
                src={chat.avatar}
                alt={chat.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              {chat.online && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
              )}
            </div>
            <div className="ml-4 flex-1">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-gray-900">{chat.name}</h3>
                {chat.lastMessage && (
                  <span className="text-xs text-gray-500">
                    {format(chat.lastMessage.timestamp, 'HH:mm')}
                  </span>
                )}
              </div>
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-500 truncate max-w-[200px]">
                  {chat.typing ? (
                    <span className="text-green-500">typing...</span>
                  ) : (
                    chat.lastMessage?.content
                  )}
                </p>
                <div className="flex items-center space-x-2">
                  {chat.lastMessage && (
                    <MessageStatus status={chat.lastMessage.status} />
                  )}
                  {chat.unreadCount > 0 && (
                    <span className="bg-green-500 text-white text-xs rounded-full px-2 py-1">
                      {chat.unreadCount}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}