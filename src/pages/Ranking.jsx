import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Ranking extends React.Component {
  handleButton = () => {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    return (
      <div>
        <h1 className="r-title" data-testid="ranking-title">RANKING</h1>
        <button
          data-testid="btn-go-home"
          type="button"
          className="r-button"
          onClick={ this.handleButton }
        >
          Home
        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.object,
}.isRequired;

export default connect()(Ranking);
