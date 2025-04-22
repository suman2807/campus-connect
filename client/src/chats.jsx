/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { collection, addDoc, query, orderBy, onSnapshot } from "firebase/firestore";
import { db, auth } from "./firebase";
import "./chats.css";

/**
 * Represents a chat component that handles messages, profanity checking, and user authentication.
 *
 * @returns {JSX.Element} - The JSX element representing the chat interface.
 */
const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("timestamp", "asc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messagesArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log("Fetched Messages:", messagesArray); // Debugging
      setMessages(messagesArray);
    });

    return () => unsubscribe();
  }, []);
  
  /**
   * Checks if the provided text contains profanity.
   *
   * @async
   * @function checkProfanity
   * @param {string} text - The text to be checked for profanity.
   * @returns {Promise<boolean>} A promise that resolves with a boolean indicating whether the text is offensive (true) or not (false).
   * @throws {Error} Throws an error if there's an issue with the HTTP request or response.
   * @example
   * checkProfanity("This is a test message.")
   *   .then(result => console.log(result)) // Outputs: false
   *   .catch(error => console.error(error));
   */
  const checkProfanity = async (text) => {
    try {
      const response = await fetch("http://localhost:5000/api/proxy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const result = await response.json();
      console.log("Profanity check result:", result);
      return result.isOffensive;
    } catch (error) {
      console.error("Error checking profanity:", error);
      return false; // Assume non-offensive if an error occurs
    }
  };
  

  // Send a message with profanity check
  /**
   * Sends a message to the server after checking for profanity.
   * @async
   * @function sendMessage
   * @returns {void} - Does not return any value.
   * @throws {Error} - Throws an error if there is an issue sending the message.
   */
  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      const isProfane = await checkProfanity(newMessage);
      console.log("Is Profane:", isProfane); // Debugging

      if (isProfane) {
        alert("Message contains inappropriate content and cannot be sent. Please be respectful.");
        setNewMessage(""); // Clear input
        await logProfanity(newMessage); // Optionally log flagged messages
        return;
      }

      await addDoc(collection(db, "messages"), {
        text: newMessage,
        timestamp: new Date(),
        user: auth.currentUser?.email || "Anonymous",
      });
      setNewMessage("");
    } catch (error) {
      console.error("Error in sendMessage:", error);
    }
  };

  // Log flagged profanity messages
  /**
   * Logs a flagged message to the database.
   *
   * @async
   * @function logProfanity
   * @param {string} message - The message to be logged.
   * @returns {Promise<void>} - A promise that resolves when the message is successfully logged, or rejects with an error if logging fails.
   *
   * @example
   * try {
   *   await logProfanity("This is a flagged message");
   *   console.log("Message logged successfully.");
   * } catch (error) {
   *   console.error("Failed to log message:", error);
   * }
   *
   * @throws {Error} - If an error occurs during the logging process.
   */
  const logProfanity = async (message) => {
    try {
      console.log("Logging flagged message:", message); // Debugging
      await addDoc(collection(db, "flagged_messages"), {
        text: message,
        timestamp: new Date(),
        user: auth.currentUser?.email || "Anonymous",
      });
    } catch (error) {
      console.error("Error logging flagged message:", error);
    }
  };

  // Check if the user is logged in
  const isUserLoggedIn = auth.currentUser;

  return (
    <div className="chat-container">
      {!isUserLoggedIn ? (
        <div className="please-sign-in">
          <h2>Please sign in to chat</h2>
        </div>
      ) : (
        <>
          <div className="messages">
            {messages.map((message) => (
              <div key={message.id} className="message">
                <strong>{message.user}:</strong> {message.text}
              </div>
            ))}
          </div>
          <div className="message-input">
            <input
              type="text"
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Chat;
