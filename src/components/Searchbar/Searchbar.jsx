import { useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import '../Searchbar/Searchbar.css';
import PropTypes from 'prop-types';

export const Searchbar = ({onSubmit}) => {
  const [name, setName] = useState('')

  const handleInputChange = event => {
    setName(event.currentTarget.value);
  };

  const sendData = event => {
    event.preventDefault();
    onSubmit(name);
    reset();
  };

  const reset = () => {
    setName('')
  };

    return (
      <header className="searchbar">
        <form className="searchForm" onSubmit={sendData}>
          <button type="submit" className="searchForm-button">
            <span className="button-label">
              <BsSearch />
            </span>
          </button>

          <input
            onChange={handleInputChange}
            value={name}
            className="input"
            type="text"
            autoComplete="off"
            name="name"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};
