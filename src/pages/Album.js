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
          className="show-album flex max-sm:flex-col max-sm:justify-center
          max-sm:items-center"
        >
          <div
            className="album-page-coverPic max-sm:mt-10"
          >
            <img
              className="img-cover-album max-sm:w-36 max-sm:h-36 max-sm:rounded-xl
              max-sm:shadow-2xl"
              src={ album.artworkUrl100 }
              alt="cover album"
            />
          </div>
          { album ? (
            <div
              className="wrapper-album-songs max-sm:items-center
              max-sm:w-screen max-sm:h-screen max-sm:justify-center max-sm:mt-8"
            >
              <div
                className="artist-album-name flex max-sm:flex-col
                max-sm:items-center max-sm:justify-center max-sm:mb-8"
              >
                <h2
                  data-testid="artist-name"
                  className="artist-name max-sm:text-sm max-sm:font-bold"
                >
                  {album.artistName}
                </h2>
                <p
                  data-testid="album-name"
                  className="album-name max-sm:text-sm max-sm:font-bold"
                >
                  {album.collectionName}
                </p>
              </div>
              <div
                className="show-songs flex flex-wrap
                justify-center align-center w-4/5 h-4/5
                p-2 max-sm:w-screen max-sm:h-screen"
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
