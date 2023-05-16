import { Component } from 'react';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';

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
      <header data-testid="header-component">
        { loading && <Loading /> }
        <p data-testid="header-user-name" className="login-name">
          { savedName }
        </p>
      </header>
    );
  }
}

export default Header;
