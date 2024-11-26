import React, { useState } from 'react';
import ChatList from './components/ChatList';
import ChatWindow from './components/ChatWindow';
import type { Chat, Message } from './types';

// Sample data
const sampleChats: Chat[] = [
  {
    id: '1',
    name: 'John Doe',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    unreadCount: 3,
    online: true,
    lastMessage: {
      id: 'm1',
      content: 'Hey, how are you?',
      sender: 'them',
      timestamp: new Date(),
      status: 'delivered'
    }
  },
  {
    id: '2',
    name: 'Jane Smith',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    unreadCount: 0,
    online: true,
    typing: true,
    lastMessage: {
      id: 'm2',
      content: 'See you tomorrow!',
      sender: 'me',
      timestamp: new Date(),
      status: 'read'
    }
  },
  {
    id: '3',
    name: 'Mike Johnson',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    unreadCount: 1,
    online: false,
    lastMessage: {
      id: 'm3',
      content: 'The meeting is scheduled for 3 PM',
      sender: 'them',
      timestamp: new Date(),
      status: 'sent'
    }
  }
];

const sampleMessages: Message[] = [
  {
    id: '1',
    content: 'Hey, how are you?',
    sender: 'them',
    timestamp: new Date(Date.now() - 3600000),
    status: 'read'
  },
  {
    id: '2',
    content: 'I\'m good, thanks! How about you?',
    sender: 'me',
    timestamp: new Date(Date.now() - 3500000),
    status: 'read'
  },
  {
    id: '3',
    content: 'Pretty good! Did you check out the new project requirements?',
    sender: 'them',
    timestamp: new Date(Date.now() - 3400000),
    status: 'read'
  },
  {
    id: '4',
    content: 'Yes, I did. They look interesting. Let\'s discuss them tomorrow at the meeting.',
    sender: 'me',
    timestamp: new Date(Date.now() - 3300000),
    status: 'delivered'
  }
];

function App() {
  const [selectedChatId, setSelectedChatId] = useState(sampleChats[0].id);
  const selectedChat = sampleChats.find(chat => chat.id === selectedChatId);

  return (
    <div className="flex h-screen bg-gray-100">
      <ChatList
        chats={sampleChats}
        selectedChatId={selectedChatId}
        onChatSelect={setSelectedChatId}
      />
      {selectedChat && (
        <ChatWindow
          chat={selectedChat}
          messages={sampleMessages}
        />
      )}
    </div>
  );
}

export default App;