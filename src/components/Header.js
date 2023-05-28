import { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import '../styles/Header.css';
import logo from '../assets/Group 3.png';
import trybe from '../assets/trybe.png';
import tunes from '../assets/tunes.png';

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
        <div className="login-logo">
          <img src={ trybe } alt="logo" className="trybe-search" />
          <img src={ logo } alt="logo" className="logo-search" />
          <img src={ tunes } alt="logo" className="tunes-search" />
        </div>
        <header data-testid="header-component" className="header-container">
          <div className="wrapper-links">
            <Link
              data-testid="link-to-search"
              to="/search"
              className="link"
            >
              Pesquisa
            </Link>
            <Link
              data-testid="link-to-favorites"
              to="/favorites"
              className="link"
            >
              Favoritas
            </Link>
            <Link
              data-testid="link-to-profile"
              to="/profile"
              className="link"
            >
              Perfil
            </Link>
          </div>
          <div data-testid="header-user-name" className="login-name">
            { savedName }
          </div>
        </header>
      </div>
    );
  }
}

export default Header;
