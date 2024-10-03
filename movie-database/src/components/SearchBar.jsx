import React from "react";

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
    setSearchTerm("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex justify-center mb-6">
      <input
        type="text"
        placeholder="Search for a movie..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border border-gray-300 rounded-l px-4 py-2 w-1/2"
      />
      <button type="submit" className="bg-blue-500 text-white rounded-r px-4 py-2 hover:bg-blue-600 transition duration-300">
        Search
      </button>
    </form>
  );
}

export default SearchBar;
