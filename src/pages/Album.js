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
      <div
        data-testid="page-album"
        className="page-album flex flex-col align-end"
      >
        <Header />
        <div
          className="show-album flex"
        >
          <div className="album-page-coverPic">
            <img
              className="img-cover-album"
              src={ album.artworkUrl100 }
              alt="cover album"
            />
          </div>
          { album ? (
            <div
              className="wrapper-album-songs flex flex-col justify-end
              align-center w-4/5 h-4/5 p-2 border-2 border-black"
            >
              <div
                className="artist-album-name flex ml-60"
              >
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
              <div
                className="show-songs flex flex-wrap
                justify-center align-center w-4/5 h-4/5
                p-2 border-2 border-blue-500"
              >
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
