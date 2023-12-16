import React, { useState } from "react";
import axios from "axios";

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/search/${query}`);
      setSearchResults(response.data);
      console.log(response);
    } catch (error) {
      console.error(query,"Error searching:", error.response?.data || error.message);
  
    }
  };

  return (
    <div>
      <h1>Board Game Search</h1>
      <div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter your search query"
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {searchResults && (
        <div>
          <h2>Search Results:</h2>
          <pre>{JSON.stringify(searchResults, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default SearchPage;