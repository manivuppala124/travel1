import React, { useState, useEffect, useRef, useCallback } from 'react';
import { debounce } from 'lodash';
import './ChatScreen.css';

const COHERE_API_KEY = '4DXFsPiFWGRBusJhGMRWSw6VO848SKbliQ09CCz0';
const API_URL = 'https://api.cohere.ai/v1/generate';
const SUMMARIZE_URL = 'https://api.cohere.ai/v1/summarize';

function ChatScreen() {
  const [inputText, setInputText] = useState('');
  const [conversation, setConversation] = useState(() => {
    const saved = localStorage.getItem('chatHistory');
    return saved ? JSON.parse(saved) : [];
  });
  const [isTyping, setIsTyping] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('chatHistory', JSON.stringify(conversation));
    scrollToBottom();
  }, [conversation]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    document.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const summarizeText = async (text) => {
    try {
      const response = await fetch(SUMMARIZE_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${COHERE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: text,
          length: 'short', 
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (!data.summary) {
        throw new Error('Invalid response format');
      }

      return data.summary;
    } catch (error) {
      console.error('Error summarizing data:', error);
      return text;
    }
  };

  const debouncedApiCall = useCallback(
    debounce(async (messageText) => {
      try {
        setIsTyping(true);
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${COHERE_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            prompt: messageText,
            max_tokens: 500,
            temperature: 0.7,
            stop_sequences: [],
            return_likelihoods: 'NONE',
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (!data.generations || !data.generations[0] || !data.generations[0].text) {
          throw new Error('Invalid response format');
        }

        const summarizedText = await summarizeText(data.generations[0].text.trim());
        
        const botMessage = {
          id: Date.now(),
          sender: 'bot',
          text: summarizedText,
        };
        setConversation((prev) => [...prev, botMessage]);
      } catch (error) {
        console.error('Error fetching data:', error);
        const errorMessage = {
          id: Date.now(),
          sender: 'bot',
          text: 'Error fetching data. Please try again later.',
        };
        setConversation((prev) => [...prev, errorMessage]);
      } finally {
        setIsTyping(false);
      }
    }, 300),
    []
  );

  const handleGreeting = (messageText) => {
    const greetings = ['hello', 'hi', 'hey'];
    if (greetings.includes(messageText.toLowerCase().trim())) {
      const botMessage = {
        id: Date.now(),
        sender: 'bot',
        text: 'Hello! How can I help you today?',
      };
      setConversation((prev) => [...prev, botMessage]);
      return true;
    }
    return false;
  };

  const isTravelQuery = (messageText) => {
    const travelKeywords = [
      'travel', 'trip', 'vacation', 'holiday', 'destination', 'visit',
      'places to visit', 'best time to visit', 'budget', 'cost', 'accommodation',
      'stay', 'hotel', 'flight', 'transportation', 'sightseeing', 'activities', 'attractions'
    ];

    if (messageText.split(' ').length <= 3) {
      return true;
    }

    return travelKeywords.some(keyword => messageText.toLowerCase().includes(keyword));
  };

  const handleSubmit = async () => {
    if (!inputText.trim()) return;

    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: inputText,
    };
    setConversation((prev) => [...prev, userMessage]);
    setInputText('');

    if (!handleGreeting(inputText)) {
      if (isTravelQuery(inputText)) {
        debouncedApiCall(inputText);
      } else {
        const botMessage = {
          id: Date.now(),
          sender: 'bot',
          text: 'I can only answer questions related to travel. Please ask about travel destinations, best times to visit, budget, places to visit, etc.',
        };
        setConversation((prev) => [...prev, botMessage]);
      }
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

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversation]);

  return (
    <div className={`chat-popup ${scrolled ? 'scrolled' : ''}`}>
      <div className="chat-container">
        <header className="chat-header">
          <h1>Chat Assistant</h1>
          <button className="clear-chat-button" onClick={handleClearChat}>Clear Chat</button>
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
    </div>
  );
}

export default ChatScreen;
