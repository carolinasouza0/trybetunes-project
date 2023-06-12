import { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from './Loading';
import logo from '../assets/logo-login.png';
import backgroundImage from '../assets/loginImage4.jpg';

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
      <div
        className="wrapper flex justify-center max-md:flex-col max-md:h-screen"
      >
        <div
          className=" background-image flex items-center justify-center"
        >
          <img
            src={ backgroundImage }
            alt="background"
            className="background-image w-screen h-screen
            md:object-cover md:object-center max-md:hidden"
          />
        </div>
        <div
          className="wrapper-login flex items-center justify-center w-screen h-screen
        bg-gradient-to-r from-gray-500 via-gray-700 to-gray-900"
        >
          <div
            data-testid="page-login"
            className="page-login flex flex-col items-center justify-center
          w-2/4 h-2/4 bg-white rounded-xl shadow-2xl max-md:w-4/5"
          >
            <div
              className="login-logo flex flex-col
              items-center justify-center w-1/2 h-1/2 p-2 m-2 "
            >
              <img
                src={ logo }
                alt="logo"
                className="logo-login "
              />
              <h2
                className="text-2xl font-bold text-gray-900 max-md:text-xl
                max-md:font-bold max-md:text-center max-md:mt-4"
              >
                PandaTunes

              </h2>
            </div>

            <form
              className="wrapper-form-login flex flex-col items-center justify-center"
            >
              <input
                type="text"
                data-testid="login-name-input"
                onChange={ this.handleInput }
                className="name-input flex items-center justify-center w-auto h-10 p-2 m-2
                  text-center text-gray-700 bg-white rounded-xl shadow-xl
                  focus:outline-none focus:ring-2 focus:ring-gray-600
                  focus:border-transparent focus:ring-opacity-50 max-md:w-4/5 md:w-4/5"
                placeholder="qual é o seu nome?"
              />
              <button
                type="submit"
                data-testid="login-submit-button"
                disabled={ name.length < minCharacters }
                onClick={ this.handleClick }
                className="btn-login flex items-center justify-center
              w-auto h-10 p-2 m-2 text-white bg-gray-900 rounded-xl shadow-2xl
              disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Entrar
              </button>
              <div
                className="loading-login flex items-center justify-center"
              >
                { loading && <Loading />}
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  push: PropTypes.string,
}.isRequired;

export default Login;
