import React from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';

const SearchBar = ({ onSearch }) => {
  const handleSearch = (event) => {
    const searchTerm = event.target.value;
    onSearch(searchTerm);
  };

  return (
    <Form inline className="d-flex justify-content-center mb-4">
      <FormControl
        type="text"
        placeholder="Search for courses"
        className="mr-sm-2"
        onChange={handleSearch}
        style={{borderRadius:'30px', width:'400px'}}
      />
            <Button
        variant="outline-primary"
        style={{ backgroundColor: '#183D3D', color: '#ffffff', borderColor: '#183D3D', borderRadius:'40px' }}
        onMouseEnter={(e) => e.target.style.backgroundColor = 'grey'}
        onMouseLeave={(e) => e.target.style.backgroundColor = '#183D3D'}
    >Search</Button>
    </Form>
  );
};

export default SearchBar;
