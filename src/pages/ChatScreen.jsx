import React, { useState, useEffect, useRef, useCallback } from 'react';
import { debounce } from 'lodash';
import './ChatScreen.css';

function ChatScreen() {
  const [inputText, setInputText] = useState('');
  const [conversation, setConversation] = useState(() => {
    const saved = localStorage.getItem('chatHistory');
    return saved ? JSON.parse(saved) : [];
  });
  const [isTyping, setIsTyping] = useState(false);
  const [scrolled, setScrolled] = useState(false); // State for scrolled position
  const messagesEndRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('chatHistory', JSON.stringify(conversation));
  }, [conversation]);

  useEffect(() => {
    const handleScroll = () => {
      console.log('Scroll Y:', window.scrollY); // Log scroll position for debugging
      if (window.scrollY > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    document.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const debouncedApiCall = useCallback(
    debounce(async (messageText) => {
      try {
        const response = await fetch('https://9189-34-82-190-225.ngrok-free.app/api/model', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt: messageText }),
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();
        if (!data.response) throw new Error('Invalid response format');

        const botMessage = { 
          id: Date.now(),
          sender: 'bot', 
          text: data.response
        };
        setConversation((prev) => [...prev, botMessage]);
      } catch (error) {
        console.error('Error fetching data:', error);
        const errorMessage = { 
          id: Date.now(),
          sender: 'bot', 
          text: 'Error fetching data. Please try again later.'
        };
        setConversation((prev) => [...prev, errorMessage]);
      } finally {
        setIsTyping(false);
      }
    }, 300),
    [setConversation, setIsTyping]
  );

  const handleGreeting = (messageText) => {
    const greetings = ['hello', 'hi', 'hey'];
    if (greetings.includes(messageText.toLowerCase().trim())) {
      const botMessage = { 
        id: Date.now(),
        sender: 'bot', 
        text: 'Hello! How can I help you today?'
      };
      setConversation((prev) => [...prev, botMessage]);
      return true;
    }
    return false;
  };

  const handleSubmit = async () => {
    if (!inputText.trim()) return;

    const userMessage = { 
      id: Date.now(),
      sender: 'user', 
      text: inputText
    };
    setConversation((prev) => [...prev, userMessage]);
    setInputText('');

    if (!handleGreeting(inputText)) {
      setIsTyping(true);
      debouncedApiCall(inputText);
    }
  };

  const handleClearChat = () => {
    setConversation([]);
    localStorage.removeItem('chatHistory');
  };

  const renderMessage = (msg) => (
    <div key={msg.id} className={`message ${msg.sender}`}>
      <div className="message-text">{msg.text}</div>
    </div>
  );

  return (
    <div className={`chat-container ${scrolled ? 'scrolled' : ''}`}>
      <header className="chat-header">
        <h1>Chat Assistant</h1>
        <button onClick={handleClearChat}>Clear Chat</button>
      </header>
      <div className="chat-box">
        {conversation.map(renderMessage)}
        {isTyping && (
          <div className="typing-indicator">
            <span></span>
            <span></span>
            <span></span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="input-container">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSubmit();
            }
          }}
          placeholder="Type your message here..."
        />
        <button onClick={handleSubmit}>Send</button>
      </div>
    </div>
  );
}

export default ChatScreen;
