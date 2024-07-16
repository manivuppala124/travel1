// ChatButton.jsx
import React, { useState } from 'react';
import ChatScreen from './ChatScreen';
import './ChatButton.css';

function ChatButton() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <div>
      <div className="chat-button" onClick={toggleChat}>
        💬
      </div>
      {isChatOpen && (
        <div className="chat-popup">
          <ChatScreen />
        </div>
      )}
    </div>
  );
}

export default ChatButton;