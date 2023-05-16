import { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

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
      <div data-testid="page-login">
        <form>
          <label>
            <input
              type="text"
              data-testid="login-name-input"
              onChange={ this.handleInput }
            />
          </label>
          <button
            type="submit"
            data-testid="login-submit-button"
            disabled={ name.length < minCharacters }
            onClick={ this.handleClick }
          >
            Entrar
          </button>
          { loading && <Loading />}
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  push: PropTypes.string,
}.isRequired;

export default Login;
