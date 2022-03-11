import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getItemLocalStorage } from '../services/LocalStorage';

class Ranking extends React.Component {
  handleButton = () => {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    const ranking = getItemLocalStorage('ranking') || [];
    return (
      <div>
        <h1 className="r-title" data-testid="ranking-title">RANKING</h1>
        <ol>
          {ranking.map(({ name, score, picture }, index) => (
            <li key={ name + picture + score }>
              <img src={ picture } alt="user-profile" />
              <p data-testid={ `player-name${index}` }>{name}</p>
              <p data-test-id={ `player-score${index}` }>{score}</p>
            </li>
          ))}
        </ol>
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
