import { Component } from 'react';
import Header from '../components/Header';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';
import MusicCard from '../components/MusicCard';

class Favorites extends Component {
  state = {
    loading: false,
    favoriteSongs: [],
  };

  componentDidMount() {
    this.handleFavorite();
  }

  handleFavorite = async () => {
    this.setState({ loading: true });
    const favoriteSongs = await getFavoriteSongs();
    console.log(favoriteSongs);
    this.setState({ loading: false, favoriteSongs });
  };

  render() {
    const { favoriteSongs, loading } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        { loading ? <Loading /> : (
          <div className="music-container">
            { favoriteSongs.map((song) => (
              <MusicCard
                key={ song.trackId }
                trackName={ song.trackName }
                previewUrl={ song.previewUrl }
                trackId={ song.trackId }
                trackArray={ song }
                handleFavorite={ this.handleFavorite }
              />
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default Favorites;
