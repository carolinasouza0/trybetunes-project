import { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  state = {
    artistName: '',
  };

  handleArtistName = ({ target }) => {
    const { value } = target;
    this.setState({ artistName: value });
  };

  render() {
    const minCharacters = 2;
    const { artistName } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <label>
            <input
              type="text"
              data-testid="search-artist-input"
              onChange={ this.handleArtistName }
            />
          </label>
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ artistName.length < minCharacters }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
