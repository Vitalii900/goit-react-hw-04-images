import { Component } from 'react';
import { BsSearch } from 'react-icons/bs';
import '../Searchbar/Searchbar.css';
import PropTypes from 'prop-types';

export class Searchbar extends Component {
  state = {
    name: '',
  };

  handleInputChange = event => {
    const { name, value } = event.currentTarget;
    this.setState({ [name]: value });
  };

  sendData = async event => {
    event.preventDefault();
    this.props.onSubmit(this.state);
    this.reset();
  };

  reset = () => {
    this.setState({
      name: '',
    });
  };

  render() {
    const { name } = this.state;
    return (
      <header className="searchbar">
        <form className="searchForm" onSubmit={this.sendData}>
          <button type="submit" className="searchForm-button">
            <span className="button-label">
              <BsSearch />
            </span>
          </button>

          <input
            onChange={this.handleInputChange}
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
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};
