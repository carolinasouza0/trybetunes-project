import { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import logo from '../assets/panda-tunes.png';

class Header extends Component {
  state = {
    savedName: '',
    userImage: '',
  };

  async componentDidMount() {
    this.handleName();
    const user = await getUser();
    const { image } = user;
    this.setState({
      userImage: image,
    });
  }

  handleName = async () => {
    const savedName = await getUser();
    this.setState({
      savedName: savedName.name,
    });
  };

  render() {
    const { savedName, userImage } = this.state;

    return (
      <div>
        <header
          data-testid="header-component"
          className="header-container flex justify-between
          w-full shadow-2xl bg-gradient-to-r from-gray-900 via-gray-700 to-gray-500
          max-sm:w-screen max-sm:h-32 max-sm:justify-between max-sm:items-center"
        >
          <Link
            data-testid="link-to-home"
            to="/"
          >
            <img
              src={ logo }
              alt="logo"
              className="logo-search w-28 bg-grey-500 p-2 m-2 rounded-xl
            shadow-2xl max-sm:w-20 max-sm:h-20"
            />
          </Link>
          <div
            className="wrapper-links flex items-center justify-between "
          >
            <Link
              data-testid="link-to-search"
              to="/search"
              className="link text-xl text-white hover:text-gray-400 max-sm:text-sm
              max-sm:hover:text-gray-400 max-sm:font-bold"
            >
              Pesquisa
            </Link>
            <Link
              data-testid="link-to-favorites"
              to="/favorites"
              className="link text-xl text-white p-2 m-2 hover:text-gray-400
              max-sm:text-sm max-sm:hover:text-gray-400 max-sm:font-bold"
            >
              Favoritas
            </Link>
          </div>
          <div
            data-testid="header-user-name"
            className="login-name flex flex-col items-center justify-center"
          >
            <Link
              to="/profile"
              className="flex items-center justify-center max-sm:flex-col"
            >
              <img
                src={ userImage }
                alt="user"
                className="user-image rounded-full w-12 h-10 max-sm:w-8
                max-sm:h-8 max-sm:m-0 max-sm:mr-2 max-sm:mt-2"
              />
              <p
                className=" user-name text-white font-bold text-base m-2
              max-sm:text-sm max-sm:mr-4 max-sm:mt-0 max-sm:font-normal"
              >
                { savedName }

              </p>

            </Link>
          </div>
        </header>
      </div>
    );
  }
}

export default Header;
