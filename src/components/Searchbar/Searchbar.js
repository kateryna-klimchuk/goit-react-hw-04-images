import { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { FaSearch } from 'react-icons/fa';
import {
  SearchbarHeader,
  SearchForm,
  SearchButton,
  FormInput,
} from './Searchbar.styled';

const Searchbar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = event => {
    setQuery(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (query.trim() === '') {
      return toast.warning('Search field is empty!');
    }
    onSearch(query);
    setQuery('');
  };

  return (
    <SearchbarHeader>
      <SearchForm onSubmit={handleSubmit}>
        <SearchButton type="submit">
          <FaSearch size={16} />
        </SearchButton>

        <FormInput
          type="text"
          name="searchRequest"
          value={query}
          onChange={handleInputChange}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </SearchForm>
    </SearchbarHeader>
  );
};

Searchbar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default Searchbar;
