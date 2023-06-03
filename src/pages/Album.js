import { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import Loading from './Loading';
import MusicCard from '../components/MusicCard';
// import '../styles/Album.css';

class Album extends Component {
  state = {
    album: '',
    songs: '',
  };

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    this.fetchMusics(id);
  }

  fetchMusics = async (albumId) => {
    const musics = await getMusics(albumId);
    console.log(musics);
    this.setState({
      album: musics[0],
      songs: musics.slice(1, musics.length),
    });
  };

  render() {
    const { album, songs } = this.state;
    return (
      <div data-testid="page-album" className="page-album">
        <Header />
        <div className="show-album">
          <div className="album-page-coverPic">
            <img
              className="img-cover-album"
              src={ album.artworkUrl100 }
              alt="cover album"
            />
          </div>
          { album ? (
            <div className="wrapper-album-songs">
              <div className="artist-album-name">
                <h2
                  data-testid="artist-name"
                >
                  {album.artistName}
                </h2>
                <p
                  data-testid="album-name"
                >
                  {album.collectionName}
                </p>
              </div>
              <div className="show-songs">
                { songs.map((song) => (
                  <MusicCard
                    key={ song.trackName }
                    trackName={ song.trackName }
                    previewUrl={ song.previewUrl }
                    trackId={ song.trackId }
                    trackArray={ song }
                  />
                ))}
              </div>
            </div>
          ) : <Loading /> }
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
