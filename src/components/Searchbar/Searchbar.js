import { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { FaSearch } from 'react-icons/fa';
import {
  SearchbarHeader,
  SearchForm,
  SearchButton,
  FormInput,
} from './Searchbar.styled';

class Searchbar extends Component {
  state = {
    inputValue: '',
  };

  handleInputChange = event => {
    this.setState({ inputValue: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = event => {
    const { inputValue } = this.state;
    event.preventDefault();
    if (inputValue.trim() === '') {
      return toast.warning('Search field is empty!');
    }
    this.props.onSearch(inputValue);
    this.setState({ inputValue: '' });
  };

  render() {
    const { handleSubmit, handleInputChange } = this;
    const { inputValue } = this.state;

    return (
      <SearchbarHeader>
        <SearchForm onSubmit={handleSubmit}>
          <SearchButton type="submit">
            <FaSearch size={16} />
          </SearchButton>

          <FormInput
            type="text"
            name="searchRequest"
            value={inputValue}
            onChange={handleInputChange}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </SearchForm>
      </SearchbarHeader>
    );
  }
}

Searchbar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default Searchbar;
