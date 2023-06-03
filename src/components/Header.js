import { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import logo from '../assets/logo.png';

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
      <div
        className="header-wrapper flex flex-col w-1/6 h-auto bg-white fixed"
      >
        <div
          className="login-logo flex items-center justify-center w-full h-1/2 p-2 m-2"
        >
          <img
            src={ logo }
            alt="logo"
            className="logo-search w-60 h-1/2 p-2"
          />

        </div>
        <header
          data-testid="header-component"
          className="header-container flex flex-col items-center
          justify-center w-full h-1/2 bg-white"
        >
          <div
            className="wrapper-links flex flex-col items-center
            justify-between w-full h-96 mt-36 mb-28"
          >
            <Link
              data-testid="link-to-search"
              to="/search"
              className="link text-xl text-grey p-2 m-2 hover:text-blue-400"
            >
              Pesquisa
            </Link>
            <Link
              data-testid="link-to-favorites"
              to="/favorites"
              className="link text-xl text-grey p-2 m-2 hover:text-blue-400"
            >
              Favoritas
            </Link>
            <Link
              data-testid="link-to-profile"
              to="/profile"
              className="link text-xl text-grey p-2 m-2 hover:text-blue-400"
            >
              Perfil
            </Link>
          </div>
          <div
            data-testid="header-user-name"
            className="login-name flex items-center justify-center w-full h-1/2 p-2 m-2"
          >
            { savedName.toLowerCase() === 'carolina' && (
              <img
                src={ userImage }
                alt="user"
                className="user-image rounded-full w-10 h-10"
              />
            )}
            <p
              className=" user-name text-gray-600 font-bold text-base m-2"
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
