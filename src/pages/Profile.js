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
    this.setState({ loading: false, userInfo });
  };

  render() {
    const { loading, userInfo } = this.state;
    return (
      <div
        data-testid="page-profile"
        className="page-profile max-sm:flex max-sm:flex-col
        max-sm:items-center max-sm:justify-center max-sm:h-auto"
      >
        <Header />
        { loading ? <Loading /> : (
          <div
            className="profile-container max-sm:flex max-sm:flex-col max-sm:items-center
            max-sm:justify-center max-sm:w-fit max-sm:h-full max-sm:border-2
            max-sm:border-gray-400 max-sm:rounded-xl max-sm:shadow-2xl
            max-sm:mt-10 max-sm:p-4"
          >
            <div
              className="user-image max-sm:w-40 max-sm:h-40 max-sm:rounded-full"
            >
              <img
                src={ userInfo.image }
                data-testid="profile-image"
                alt={ `Foto de ${userInfo.name}` }
              />
            </div>
            <div
              className="user-info max-sm:flex max-sm:flex-col max-sm:items-center"
            >
              <h4
                className="user-title max-sm:mt-4 max-sm:mb-2 max-sm:text-center
                max-sm:text-lg"
              >
                Name:

              </h4>
              <span
                className="user-type max-sm:mb-4 font-bold"
              >
                { userInfo.name }

              </span>
              <h4
                className="user-title max-sm:mt-4 max-sm:mb-2 max-sm:text-center
                max-sm:text-lg"
              >
                Email:

              </h4>
              <span
                className="user-type max-sm:mb-4 font-bold"
              >
                {userInfo.email}

              </span>
              <h4
                className="user-title max-sm:mt-4 max-sm:mb-2 max-sm:text-center
                max-sm:text-lg"
              >
                About:

              </h4>
              <span
                className="user-type max-sm:mb-4 font-bold"
              >
                {userInfo.description}

              </span>

              <Link
                to="/profile/edit"
                className="edit-profile-btn max-sm:mt-4
                max-sm:rounded-xl max-sm:bg-gray-500 max-sm:text-white max-sm:p-1
                max-sm:hover:bg-gray-400 max-sm:mb-4 max-sm:text-lg
                max-sm:font-bold"
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
