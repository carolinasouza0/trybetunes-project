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
      <div
        data-testid="page-profile-edit"
        className="page-profile-edit max-sm:flex max-sm:flex-col max-sm:items-center"
      >
        <Header />
        <div
          className=" profile-edit-container max-sm:flex max-sm:items-center
          max-sm:justify-center max-sm:border-2 max-sm:border-gray-300 max-sm:rounded-xl
           max-sm:shadow-2xl max-sm:mt-10 max-sm:mb-20 max-sm:w-fit"
        >
          { loading ? <Loading /> : (
            <div
              className="profile-edit-content max-sm:flex max-sm:flex-col
              max-sm:items-center max-sm:justify-center max-sm:w-fit max-sm:h-full"
            >
              <form
                className="profile-edit-form max-sm:flex max-sm:flex-col
              max-sm:items-center max-sm:justify-center max-sm:h-auto max-sm:w-fit"
              >
                <label
                  className="profile-edit-label max-sm:flex max-sm:flex-col max-sm:m-4
                max-sm:font-bold max-sm:text-base"
                >
                  Name
                  <input
                    name="name"
                    data-testid="edit-input-name"
                    className="profile-edit-input max-sm:w-5/6 max-sm:p-1 max-sm:m-2
                  max-sm:border-2 max-sm:border-gray-300 max-sm:rounded-md
                  max-sm:shadow-md max-sm:text-base max-sm:font-bold max-sm:ml-4"
                    value={ name }
                    onChange={ this.handleChange }
                  />
                </label>
                <label
                  className="profile-edit-label max-sm:flex max-sm:flex-col
                max-sm:font-bold max-sm:text-base max-sm:mb-4"
                >
                  Email
                  <input
                    data-testid="edit-input-email"
                    name="email"
                    className="profile-edit-input max-sm:w-5/6 max-sm:p-1 max-sm:m-2
                    max-sm:border-2 max-sm:border-gray-300 max-sm:rounded-md
                    max-sm:shadow-md max-sm:text-base max-sm:font-bold max-sm:ml-4"
                    onChange={ this.handleChange }
                    value={ email }
                  />
                </label>
                <label
                  className="profile-edit-label max-sm:flex max-sm:flex-col
              max-sm:ml-2 max-sm:m-2 max-sm:font-bold max-sm:text-base max-sm:mb-4"
                >
                  About
                  <textarea
                    data-testid="edit-input-description"
                    name="description"
                    rows="4"
                    cols="25"
                    className="profile-edit-input max-sm:w-5/6 max-sm:p-1 max-sm:m-2
                    max-sm:border-2 max-sm:border-gray-300 max-sm:rounded-md
                    max-sm:shadow-md max-sm:text-base max-sm:font-bold max-sm:ml-4"
                    onChange={ this.handleChange }
                    value={ description }
                  />
                </label>
                <label
                  className="profile-edit-label max-sm:flex max-sm:flex-col
               max-sm:font-bold max-sm:text-base max-sm:mb-4"
                >
                  Image URL
                  <input
                    data-testid="edit-input-image"
                    name="image"
                    className="profile-edit-input max-sm:w-5/6 max-sm:p-1 max-sm:m-2
                    max-sm:border-2 max-sm:border-gray-300 max-sm:rounded-md
                    max-sm:shadow-md max-sm:text-base max-sm:font-bold max-sm:ml-4"
                    onChange={ this.handleChange }
                    value={ image }
                  />
                </label>
                <button
                  type="submit"
                  data-testid="edit-button-save"
                  className="button-edit-save max-sm:mt-4
                  max-sm:rounded-xl max-sm:bg-gray-500 max-sm:text-white max-sm:p-1
                  max-sm:hover:bg-gray-400 max-sm:mb-4 max-sm:text-lg
                  max-sm:font-bold"
                  disabled={ isDisabled }
                  onClick={ this.handleSubmit }
                >
                  Salvar
                </button>
              </form>
            </div>
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
