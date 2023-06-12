import { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';
// import '../styles/MusicCard.css';

class MusicCard extends Component {
  state = {
    favoriteCheckbox: false,
    loading: false,
  };

  async componentDidMount() {
    const { trackId } = this.props;
    const favoriteList = await getFavoriteSongs();
    const alreadyFavorite = favoriteList.some((song) => song.trackId === trackId);
    this.setState({
      loading: false,
      favoriteCheckbox: alreadyFavorite,
    });
  }

  handleChange = async (event) => {
    const { trackArray, handleFavorite } = this.props;
    this.setState({
      loading: true,
    });
    if (event.target.checked) {
      await addSong(trackArray);
      this.setState({
        favoriteCheckbox: true,
        loading: false,
      });
    } else {
      await removeSong(trackArray);
      this.setState({
        favoriteCheckbox: false,
        loading: false,
      });
    }
    handleFavorite();
  };

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { favoriteCheckbox, loading } = this.state;
    return (
      <div
        className="music-card flex justify-center max-sm:w-4/5"
      >
        { loading ? <Loading /> : (
          <div
            className="show-preview max-sm:flex max-sm:flex-col max-sm:justify-center
           max-sm:items-center max-sm:h-38"
          >
            <p
              className=" track-name flex justify-center max-sm:text-sm
              max-sm:items-center max-sm:justify-center max-sm:font-bold"
            >
              {trackName}

            </p>
            <div
              className="audio-container flex w-96 flex m-2 max-sm:w-52 max-sm:h-20
              max-sm:justify-center max-sm:items-center"
            >
              <audio
                className="audio max-sm:rounded-full max-sm:shadow-2xl w-44 mr-2"
                data-testid="audio-component"
                src={ previewUrl }
                controls
              >
                <track kind="captions" />
                O seu navegador não suporta o elemento
                {' '}
                {' '}
                <code>audio</code>
                .
              </audio>
              <label data-testid={ `checkbox-music-${trackId}` }>
                <img
                  src={ favoriteCheckbox ? 'https://img.icons8.com/?size=512&id=85138&format=png' : 'https://img.icons8.com/?size=512&id=85038&format=png' }
                  alt="heart icon"
                  className="heart-icon w-8 h-8 max-sm:w-6 max-sm:h-6
                max-sm:mt-2 max-sm:mb-2"
                />
                <input
                  type="checkbox"
                  onChange={ this.handleChange }
                  checked={ favoriteCheckbox }
                  className="checkbox-input hidden"
                />

              </label>
            </div>
            <hr
              className="border-1 border-black w-4/5 max-sm:w-52 max-sm:h-1
              max-sm:mt-2 max-sm:mb-2"
            />
          </div>
        )}
      </div>

    );
  }
}

MusicCard.defaultProps = {
  handleFavorite: () => {},
};

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  trackArray: PropTypes.shape([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  handleFavorite: PropTypes.func,
};
export default MusicCard;
