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
          <div
            className="search-container flex flex-col items-center justify-center"
          >
            <div
              className="search-input-btn flex items-center justify-center"
            >
              <label>
                <input
                  type="text"
                  data-testid="search-artist-input"
                  value={ artistName }
                  onChange={ this.handleArtistName }
                  className="input-artist flex items-center justify-center
                  w-auto h-10 p-2 m-2 border-2 border-gray-400 rounded-xl shadow-2xl
                  outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-700"
                />
              </label>
              <button
                type="button"
                data-testid="search-artist-button"
                disabled={ artistName.length < minCharacters }
                onClick={ this.handleApi }
                className="search-button flex items-center justify-center
                w-auto h-10 p-2 m-2 text-white bg-gray-700 rounded-xl shadow-2xl
                disabled:opacity-50"
              >
                Pesquisar
              </button>
            </div>
            <div
              className="search-result flex flex-col items-center justify-center"
            >
              <h2
                className="search-artist flex items-center justify-center
                w-auto h-10 p-2 m-2 text-center text-2xl text-gray-400 font-bold"
              >
                { resultArtistName && api
                  ? `Resultado de álbuns de: ${resultArtistName}` : '' }
              </h2>
              <div
                className="result flex flex-wrap items-center justify-center
                w-auto h-1/2 p-2 m-2"
              >
                { !api && (
                  <h2
                    className="search-album flex items-center justify-center
                    w-auto h-96 p-2 m-2 text-center text-2xl text-gray-400"
                  >
                    Nenhum álbum foi encontrado

                  </h2>) }
              </div>
              <div
                className=" result flex flex-wrap justify-center w-full h-auto p-2
                 bg-gray-200"
              >
                { artistArray.map((artist, index) => (
                  <div
                    key={ index }
                    className="artist-album flex flex-col w-auto h-auto p-2 m-2"
                  >
                    <Link
                      to={ `/album/${artist.collectionId}` }
                      data-testid={ `link-to-album-${artist.collectionId}` }
                      className="link-artist-info flex flex-col items-center
                      flex-wrap justify-center w-96 h-auto p-2 m-2"
                    >
                      <img
                        src={ artist.artworkUrl100 }
                        alt="album cover"
                        className="cover-album flex items-center justify-center
                        w-48 h-48 p-2 m-2 shadow-2xl rounded-xl border-2
                        hover:shadow-lg transition duration-500 ease-in-out
                        transform hover:-translate-y-1 hover:scale-110"
                      />
                      <h3
                        className="album-name flex items-center justify-center
                        w-2/4 h-auto p-2 text-center text-gray-400 font-bold"
                      >
                        {artist.collectionName}

                      </h3>
                      <p
                        className="artist-name flex items-center justify-center
                        w-2/4 h-auto text-center text-gray-700 font-bold"
                      >
                        {artist.artistName}

                      </p>

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
