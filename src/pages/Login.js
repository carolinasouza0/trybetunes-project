import { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from './Loading';
import '../styles/Login.css';
import logo from '../assets/Group 3.png';
import trybe from '../assets/trybe.png';
import tunes from '../assets/tunes.png';

class Login extends Component {
  state = {
    name: '',
    loading: false,
  };

  handleInput = ({ target }) => {
    const { value } = target;
    this.setState({ name: value });
  };

  handleClick = async (event) => {
    event.preventDefault();
    const { name } = this.state;
    const { history } = this.props;
    this.setState({ loading: true });
    try {
      await createUser({ name });
      history.push('/search');
    } catch (error) {
      this.setState({ loading: false });
    }
  };

  render() {
    const minCharacters = 3;
    const { name, loading } = this.state;
    return (
      <div className="wrapper-login">
        <div data-testid="page-login" className="page-login">
          <div className="login-logo">
            <img src={ logo } alt="logo" className="logo" />
            <img src={ trybe } alt="logo" className="trybe" />
            <img src={ tunes } alt="logo" className="tunes" />
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
            <div className="loading-login">
              { loading && <Loading />}
            </div>
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
