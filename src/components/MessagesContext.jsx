/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { createContext, useState, useContext } from 'react';

const MessagesContext = createContext();

export const MessagesProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [people, setPeople] = useState([]);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [newMessage, setNewMessage] = useState("");

  return (
    <MessagesContext.Provider
      value={{
        messages,
        setMessages,
        people,
        setPeople,
        selectedPerson,
        setSelectedPerson,
        newMessage,
        setNewMessage,
      }}
    >
      {children}
    </MessagesContext.Provider>
  );
};

export const useMessages = () => useContext(MessagesContext);
