import { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';
import '../styles/MusicCard.css';

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
      <div className="music-card">
        { loading ? <Loading /> : (
          <div className="show-preview">
            <p>{trackName}</p>
            <div className="audio-container">
              <audio
                className="audio"
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
            </div>
            <label data-testid={ `checkbox-music-${trackId}` }>
              Favorita
              <input
                type="checkbox"
                onChange={ this.handleChange }
                checked={ favoriteCheckbox }
              />
            </label>
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
