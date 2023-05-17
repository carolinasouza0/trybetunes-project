import { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';

class Search extends Component {
  state = {
    artistName: '',
    artistArray: [],
    api: false,
    loading: false,
    resultArtistName: '',
  };

  handleArtistName = ({ target }) => {
    const { value } = target;
    this.setState({ artistName: value, resultArtistName: value });
  };

  handleApi = async () => {
    const { artistName } = this.state;
    const apiReturned = await searchAlbumsAPI(artistName);
    this.setState({ artistName: '' });
    if (apiReturned.length === 0) {
      this.setState({
        api: false,
        loading: false,
      });
    } else {
      this.setState({
        artistArray: apiReturned,
        loading: false,
        api: true,
      });
    }
  };

  render() {
    const minCharacters = 2;
    const { artistName, artistArray, api, loading, resultArtistName } = this.state;

    return (
      <div data-testid="page-search">
        <Header />
        { loading ? <Loading /> : (
          <div className="wrapper">
            <label>
              <input
                type="text"
                data-testid="search-artist-input"
                value={ artistName }
                onChange={ this.handleArtistName }
                className="input-artist"
              />
            </label>
            <button
              type="button"
              data-testid="search-artist-button"
              disabled={ artistName.length < minCharacters }
              onClick={ this.handleApi }
              className="search-button"
            >
              Pesquisar
            </button>
            <div className="search-result">
              <h2 className="search-artist">
                { resultArtistName && api
                  ? `Resultado de álbuns de: ${resultArtistName}` : '' }
              </h2>
              <div className="result">
                { !api && <h2 className="search-album">Nenhum álbum foi encontrado</h2> }
                { artistArray.map((artist, index) => (
                  <div key={ index } className="artist-album">
                    <Link
                      to={ `/album/${artist.collectionId}` }
                      data-testid={ `link-to-album-${artist.collectionId}` }
                    >
                      <img
                        src={ artist.artworkUrl100 }
                        alt="album cover"
                        className="cover-album"
                      />
                      <h3>{artist.collectionName}</h3>
                      <p>{artist.artistName}</p>

                    </Link>
                  </div>
                )) }
              </div>
            </div>
          </div>
        ) }
      </div>
    );
  }
}

export default Search;
