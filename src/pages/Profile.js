import { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Profile extends Component {
  state = {
    loading: false,
    userInfo: {},
  };

  componentDidMount() {
    this.handleUser();
  }

  handleUser = async () => {
    this.setState({ loading: true });
    const userInfo = await getUser();
    console.log(userInfo);
    this.setState({ loading: false, userInfo });
  };

  render() {
    const { loading, userInfo } = this.state;
    return (
      <div
        data-testid="page-profile"
        className="page-profile max-sm:flex max-sm:flex-col
        max-sm:items-center max-sm:justify-center max-sm:h-screen"
      >
        <Header />
        { loading ? <Loading /> : (
          <div
            className="profile-container max-sm:flex max-sm:flex-col max-sm:items-center
            max-sm:justify-center max-sm:w-fit max-sm:h-full max-sm:border-2
            max-sm:border-gray-400 max-sm:rounded-xl max-sm:shadow-2xl"
          >
            <div className="user-image">
              <img
                src={ userInfo.image }
                data-testid="profile-image"
                alt={ `Foto de ${userInfo.name}` }
              />
            </div>
            <div className="user-info">
              <h4 className="user-title">Name</h4>
              <span className="user-type">{ userInfo.name }</span>
              <h4 className="user-title">Email</h4>
              <span className="user-type">{userInfo.email}</span>
              <h4 className="user-title">About</h4>
              <span className="user-type">{userInfo.description}</span>

              <Link
                to="/profile/edit"
                className="edit-profile-btn max-sm:mt-4
                max-sm:rounded-xl max-sm:shadow-2xl"
              >
                Editar perfil

              </Link>
            </div>
          </div>
        )}

      </div>
    );
  }
}

export default Profile;
