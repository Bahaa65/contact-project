import React, { useState } from 'react';

type SearchBarProps = {
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
};

const SearchBar: React.FC<SearchBarProps> = ({ setSearchQuery }) => {
  return (
    <input 
      type="text" 
      placeholder="Search Contacts" 
      onChange={(e) => setSearchQuery(e.target.value)} 
    />
  );
};

export default SearchBar;
