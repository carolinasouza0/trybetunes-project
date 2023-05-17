import { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

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

  handleClick = async (event) => {
    const { trackArray } = this.props;
    this.setState({
      loading: true,
    });
    if (event.target.checked) {
      await addSong(trackArray);
      this.setState({
        favoriteCheckbox: true,
        loading: false,
      });
    }
  };

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { favoriteCheckbox, loading } = this.state;
    return (
      <div className="music-card">
        { loading ? <Loading /> : (
          <div className="show-preview">
            <label data-testid={ `checkbox-music-${trackId}` }>
              Favorita
              <input
                type="checkbox"
                onChange={ this.handleClick }
                checked={ favoriteCheckbox }
              />
            </label>
            <p>{trackName}</p>
            <audio data-testid="audio-component" src={ previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              {' '}
              {' '}
              <code>audio</code>
              .
            </audio>
          </div>
        )}
      </div>

    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  trackArray: PropTypes.shape([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
};
export default MusicCard;
