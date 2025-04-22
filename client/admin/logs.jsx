/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { db } from "../src/firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

/**
 * A React functional component to display deletion logs from Firestore.
 *
 * @returns {JSX.Element} The JSX element representing the Deletion Logs page.
 */
const Logs = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    /**
     * Asynchronously fetches logs from a Firestore collection named "logs" and sorts them by the "deletedAt" field in descending order.
     *
     * @async
     * @function fetchLogs
     * @returns {Promise<void>} A promise that resolves when the logs have been fetched and set in the component's state. It does not return any value directly but updates the component state through the `setLogs` function.
     * @throws {Error} If there is an error during the fetching of logs, it will be logged to the console with the message "Error fetching logs:" followed by the actual error.
     *
     * Example usage:
     * ```javascript
     * useEffect(() => {
     *   fetchLogs();
     * }, []);
     * ```
     */
    const fetchLogs = async () => {
      try {
        const q = query(collection(db, "logs"), orderBy("deletedAt", "desc"));
        const querySnapshot = await getDocs(q);
        const fetchedLogs = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setLogs(fetchedLogs);
      } catch (error) {
        console.error("Error fetching logs:", error);
      }
    };

    fetchLogs();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-center mb-6">Deletion Logs</h1>
      {logs.length === 0 ? (
        <p>No logs available.</p>
      ) : (
        <div className="gap-4 justify-start">
          {logs.map((log) => (
            <div
              key={log.id}
              className="p-4 bg-white shadow-md rounded-md border border-gray-300 w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
            >
              <h3 className="text-xl font-bold mb-2">{log.title || "Untitled Request"}</h3>
              <p><strong>Deleted At:</strong> {new Date(log.deletedAt.seconds * 1000).toLocaleString()}</p>
              <p><strong>Deleted By:</strong> {log.deletedBy}</p>
              <p><strong>Reason:</strong> {log.reason}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Logs;