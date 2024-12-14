import React, { useState } from "react";
import { FaExclamationTriangle } from "react-icons/fa"; // Error icon

const Search = () => {
  const [query, setQuery] = useState(""); // State for search query (username)
  const [results, setResults] = useState([]); // State for search results (users)
  const [errorMessage, setErrorMessage] = useState(""); // State for error messages

  const handleSearch = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Reset error message
    setResults([
      
        { _id: "1", username: "john_doe", email: "john@example.com" },
        { _id: "2", username: "jane_doe", email: "jane@example.com" },
      ],
    ); // Reset previous search results

    if (!query.trim()) {
      return;
    }

    try {
      const response = await fetch(
        `https://backend-for-khatabook-f1cr.onrender.com/api/v1/users/search?username=${query}`, // API endpoint to search by username
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        const errorMessage = data.message || "An unknown error occurred.";
        setErrorMessage(errorMessage);
        return;
      }

      // Check if no users were found
      if (data.data.length === 0) {
        setErrorMessage("No users found with that username.");
      } else {
        setResults(data.data); // Set search results
      }
    } catch (e) {
      console.error("Network or server error", e);
      setErrorMessage("Failed to connect to the server. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-white text-center mb-6">
          Search User
        </h2>
        <form onSubmit={handleSearch} className="space-y-6">
          <div>
            <label
              htmlFor="query"
              className="block text-sm font-medium text-gray-300"
            >
              Username
            </label>
            <input
              type="text"
              id="query"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-gray-700 text-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
              placeholder="Enter username to search"
            />
          </div>

          {/* Error message display with icon and styling */}
          {errorMessage && (
            <div className="flex items-center text-red-500 p-2 mt-2 rounded-lg">
              <FaExclamationTriangle className="mr-2" />
              <p className="text-sm">{errorMessage}</p>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition duration-200"
          >
            Search
          </button>
        </form>

        {/* Displaying search results */}
        {results.length > 0 && (
          <div className="mt-6 text-white">
            <h3 className="text-xl font-semibold mb-4">Results:</h3>
            <ul className="space-y-3">
              {results.map((user) => (
                <li key={user._id} className="bg-gray-700 p-4 rounded-lg">
                  <h4 className="font-bold">{user.username}</h4>
                  <p>{user.email}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
