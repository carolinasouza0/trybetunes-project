import { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';
import Loading from './Loading';

class ProfileEdit extends Component {
  state = {
    name: '',
    email: '',
    description: '',
    image: '',
    loading: true,
    isDisabled: true,
  };

  componentDidMount() {
    this.handleUser();
  }

  handleUser = async () => {
    const user = await getUser();
    const { name, email, description, image } = user;
    this.setState({
      name,
      email,
      description,
      image,
      loading: false,
    }, () => this.handleValidation());
  };

  handleChange = async ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, this.handleValidation);
  };

  handleValidation = () => {
    const { name, email, description, image } = this.state;
    if (name && email && description && image && email.match(/^[a-z0-9]+@[a-z0-9]+\.[a-z]+/i)) {
      this.setState({ isDisabled: false });
    }
  };

  handleSubmit = async () => {
    this.setState({ loading: true }, async () => {
      const { name, email, description, image } = this.state;
      await updateUser({ name, email, description, image });
    });
    this.setState({ loading: false }, () => {
      const { history } = this.props;
      history.push('/profile');
    });
  };

  render() {
    const { name, email, description, image, loading, isDisabled } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        <div>
          { loading ? <Loading /> : (
            <form className="profile-edit-form">
              <label className="profile-edit-label">
                Nome
                <input
                  name="name"
                  data-testid="edit-input-name"
                  className="profile-edit-input"
                  value={ name }
                  onChange={ this.handleChange }
                />
              </label>
              <label className="profile-edit-label">
                Email
                <input
                  data-testid="edit-input-email"
                  name="email"
                  className="profile-edit-input"
                  onChange={ this.handleChange }
                  value={ email }
                />
              </label>
              <label className="profile-edit-label">
                Descrição
                <input
                  data-testid="edit-input-description"
                  name="description"
                  className="profile-edit-input"
                  onChange={ this.handleChange }
                  value={ description }
                />
              </label>
              <label className="profile-edit-label">
                URL da imagem
                <input
                  data-testid="edit-input-image"
                  name="image"
                  className="profile-edit-input"
                  onChange={ this.handleChange }
                  value={ image }
                />
              </label>
              <button
                type="submit"
                data-testid="edit-button-save"
                className="button-edit-save"
                disabled={ isDisabled }
                onClick={ this.handleSubmit }
              >
                Salvar
              </button>
            </form>
          ) }
        </div>
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
export default ProfileEdit;
