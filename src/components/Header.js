import { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import logo from '../assets/panda-tunes.png';

import userImage from '../assets/carol.jpg';

class Header extends Component {
  state = {
    savedName: '',
  };

  componentDidMount() {
    this.handleName();
  }

  handleName = async () => {
    const savedName = await getUser();
    this.setState({
      savedName: savedName.name,
    });
  };

  render() {
    const { savedName } = this.state;
    return (
      <div>
        <header
          data-testid="header-component"
          className="header-container flex justify-between
          w-full shadow-2xl bg-gradient-to-r from-gray-900 via-gray-700 to-gray-500"
        >
          <img
            src={ logo }
            alt="logo"
            className="logo-search w-28 bg-grey-500 p-2 m-2 rounded-xl shadow-2xl"
          />
          <div
            className="wrapper-links flex items-center justify-between "
          >
            <Link
              data-testid="link-to-search"
              to="/search"
              className="link text-xl text-white hover:text-gray-400"
            >
              Pesquisa
            </Link>
            <Link
              data-testid="link-to-favorites"
              to="/favorites"
              className="link text-xl text-white p-2 m-2 hover:text-gray-400"
            >
              Favoritas
            </Link>
            <Link
              data-testid="link-to-profile"
              to="/profile"
              className="link text-xl text-white hover:text-gray-400"
            >
              Perfil
            </Link>
          </div>
          <div
            data-testid="header-user-name"
            className="login-name flex flex-col items-center justify-center"
          >
            { savedName.toLowerCase() === 'carolina' && (
              <img
                src={ userImage }
                alt="user"
                className="user-image rounded-full w-10 h-10"
              />
            )}
            <p
              className=" user-name text-white font-bold text-base m-2"
            >
              { savedName }

            </p>
          </div>
        </header>
      </div>
    );
  }
}

export default Header;
