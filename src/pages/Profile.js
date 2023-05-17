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
      <div data-testid="page-profile">
        <Header />
        { loading ? <Loading /> : (
          <div className="profile-container">
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

              <Link to="/profile/edit">Editar perfil</Link>
            </div>
          </div>
        )}

      </div>
    );
  }
}

export default Profile;
