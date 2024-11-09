/* eslint-disable no-unused-vars */
import { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useMessages } from "../components/MessagesContext";
import { Col, Container, Row } from "react-bootstrap";
import BASE_URL from "./UTILS";

// const socket = io(`${BASE_URL}`);

const MessagesPage = () => {
  const { messages, setMessages, people, setPeople, selectedPerson, setSelectedPerson } = useMessages();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const chatMessagesRef = useRef(null);

  // Retrieve the current user's ID (replace with your actual logic to get the user ID)
  const currentUserId = localStorage.getItem('user_id');

  // Fetch conversations and set up socket listeners
  useEffect(() => {
    fetch(`${BASE_URL}/users/conversations`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    })
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          setPeople(data);
        } else {
          console.error('Unexpected data format for conversations:', data);
        }
      })
      .catch(error => {
        console.error('Error fetching conversations:', error);
      });

    // socket.on("connect", () => {
    //   console.log("Connected to the server");
    // });

    // socket.on("disconnect", () => {
    //   console.log("Disconnected from the server");
    // });

    // socket.on("message", (data) => {
    //   setMessages((prevMessages) => {
    //     if (Array.isArray(prevMessages)) {
    //       return [...prevMessages, data];
    //     } else {
    //       console.error('prevMessages is not an array:', prevMessages);
    //       return [data]; // Reset to a new array if the previous state is invalid
    //     }
    //   });
    // });

    return () => {
      // socket.disconnect();
    };
  }, [setPeople, setMessages]);

  // Fetch messages for the selected person
  useEffect(() => {
    if (selectedPerson) {
      fetch(`${BASE_URL}/messages?user_id=${selectedPerson.id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
      })
        .then(response => response.json())
        .then(data => {
          if (Array.isArray(data)) {
            setMessages(data);
          } else {
            console.error('Unexpected data format for messages:', data);
          }
        })
        .catch(error => {
          console.error('Error fetching messages:', error);
        });
    }
  }, [selectedPerson, setMessages]);

  // Scroll to the bottom of the chat messages
  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [messages]);

  // Handle message sending
  const sendMessage = () => {
    if (message.trim() && selectedPerson) {
      const newMessage = {
        content: message,
        sender_id: parseInt(currentUserId, 10), // Replace with actual sender ID
        receiver_id: selectedPerson.id,
        timestamp: new Date(),
      };
      
      // Emit message via socket
      // socket.emit("sendMessage", newMessage);
      setMessages((prevMessages) => {
        if (Array.isArray(prevMessages)) {
          return [...prevMessages, newMessage];
        } else {
          console.error('prevMessages is not an array:', prevMessages);
          return [newMessage]; // Reset to a new array if the previous state is invalid
        }
      });
      setMessage('');

      // Persist the message to the database
      fetch(`${BASE_URL}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(newMessage)
      })
      .then(response => response.json())
      .then(data => {
        console.log('Message saved:', data);
      })
      .catch(error => {
        console.error('Error saving message:', error);
      });
    }
  };

  // Handle back navigation
  //const handleBackClick = () => {
   // navigate(-1);
  //};

  return (
    <div className="flex h-screen">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-16'} flex`}>
        {/* Conversations List */}
        <Container>
          <Row>
            <Col xs={3} style={{marginRight:'10px', marginTop:'10px'}}>
        <div className="w-64 bg-gray-100 border-r border-gray-300" style={{width:'330px', height:'900px', borderBottomRightRadius:'30px', borderBottomLeftRadius:'30px', borderTopLeftRadius:'30px', borderTopRightRadius:'30px', marginRight:'20px'}}>
          <div className="p-4 bg-[#183d3d] text-white" style={{height:'80px', borderTopLeftRadius:'30px' ,borderTopRightRadius:'30px'}}> 
            Conversations
          </div>
          <div className="p-2 overflow-y-auto h-[calc(100vh-4rem)]">
            {people.map(person => (
              <div
                key={person.id}
                className={`p-2 cursor-pointer hover:bg-gray-200 ${selectedPerson?.id === person.id ? 'bg-gray-300' : ''}`}
                onClick={() => setSelectedPerson(person)}
              >
                {person.first_name} {person.last_name}
              </div>
            ))}
          </div>
        </div>
        </Col>
        <Col xs={6 } style={{marginTop:'10px'}}>

        {/* Chat Area */}
        
        <div className="flex-1 flex flex-col " style={{height:'900px', width:'1000px', borderTopLeftRadius:'30px' ,borderTopRightRadius:'30px', borderBottomRightRadius:'30px', borderBottomLeftRadius:'30px',}}>
          <div className="bg-[#183d3d] text-white p-3" style={{  borderTopLeftRadius:'30px', borderTopRightRadius:'30px'}}>
            {selectedPerson ? (
              `${selectedPerson.first_name} ${selectedPerson.last_name}`
            ) : (
              "Chats"
            )}
          </div>
          <div className="flex-1 bg-gray-100 p-4 overflow-auto">
            <div ref={chatMessagesRef} className="flex flex-col space-y-4">
              {messages.length > 0 ? (
                messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`p-2 rounded-lg max-w-xs ${
                      msg.sender_id === parseInt(currentUserId, 10)
                        ? 'bg-[#183d3d] text-white self-end ml-auto'
                        : 'bg-gray-300 text-black self-start mr-auto'
                    }`}
                  >
                    {msg.content}
                  </div>
                ))
              ) : (
                <div>Start chatting</div>
              )}
            </div>
          </div>
          <div className="p-4 bg-white border-t border-gray-300">
            <div className="flex space-x-2">
              <input
                type="text"
                className="flex-1 p-2 border rounded-lg"
                placeholder="Type a message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button
                onClick={sendMessage}
                className="bg-[#183d3d] text-white px-4 py-2 rounded-lg hover:bg-[#1e4e4e]"
              >
                Send
              </button>
            </div>
          </div>
        </div>
        </Col>
        </Row>
        </Container>
       
      </div>
      
    </div>

  );
  
};

export default MessagesPage;
