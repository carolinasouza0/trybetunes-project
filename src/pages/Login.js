import { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from './Loading';
import '../styles/Login.css';
import logo from '../assets/Ellipse 1 (Stroke).png';
import trybe from '../assets/trybe.png';
import tunes from '../assets/tunes.png';
import grupo2 from '../assets/Group 2.png';

class Login extends Component {
  state = {
    name: '',
    loading: false,
  };

  handleInput = ({ target }) => {
    const { value } = target;
    this.setState({ name: value });
  };

  handleClick = async () => {
    const { history } = this.props;
    const { name } = this.state;
    this.setState({ loading: true });
    await createUser({ name });
    this.setState({ loading: false });
    return history.push('/search');
  };

  render() {
    const minCharacters = 3;
    const { name, loading } = this.state;
    return (
      <div className="wrapper-login">
        <div data-testid="page-login" className="page-login">
          <div className="login-logo">
            <img src={ trybe } alt="logo" className="trybe" />
            <img src={ logo } alt="logo" className="logo" />
            <img src={ tunes } alt="logo" className="tunes" />
            <img src={ grupo2 } alt="logo" className="lines" />
          </div>

          <form className="wrapper-form-login">
            <label>
              <input
                type="text"
                data-testid="login-name-input"
                onChange={ this.handleInput }
                className="name-input"
                placeholder="qual é o seu nome?"
              />
            </label>
            <button
              type="submit"
              data-testid="login-submit-button"
              disabled={ name.length < minCharacters }
              onClick={ this.handleClick }
              className="btn-login"
            >
              Entrar
            </button>
            { loading && <Loading />}
          </form>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  push: PropTypes.string,
}.isRequired;

export default Login;
