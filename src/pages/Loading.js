import { Component } from 'react';
import ReactLoading from 'react-loading';
// import '../styles/Loading.css';

class Loading extends Component {
  render() {
    return (
      <ReactLoading
        className="loading"
        type="bars"
        color="blue"
        width="2.5rem"
        height="2.5rem"
      />

    );
  }
}

export default Loading;
