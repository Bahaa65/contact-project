import React from 'react';
import { Input, Box } from '@chakra-ui/react';

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  return (
    <Box mb={4}>
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search contacts..."
        size="lg"
        variant="filled"
      />
    </Box>
  );
};

export default SearchBar;