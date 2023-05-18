import { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';
import '../styles/Header.css';

class Header extends Component {
  state = {
    loading: false,
    savedName: '',
  };

  componentDidMount() {
    this.handleName();
  }

  handleName = async () => {
    this.setState({ loading: true });
    const savedName = await getUser();
    this.setState({
      loading: false,
      savedName: savedName.name,
    });
  };

  render() {
    const { loading, savedName } = this.state;
    return (
      <header data-testid="header-component" className="header-container">
        { loading && <Loading /> }
        <p data-testid="header-user-name" className="login-name">
          { savedName }
        </p>
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
      </header>
    );
  }
}

export default Header;
