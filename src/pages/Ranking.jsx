import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getItemLocalStorage } from '../services/LocalStorage';
import '../css/Ranking.css';

class Ranking extends React.Component {
  handleButton = () => {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    const ranking = getItemLocalStorage('ranking') || [];
    return (
      <div className="ranking">
        <h1 className="r-title" data-testid="ranking-title">RANKING</h1>
        <ol className="r-list">
          {ranking.map(({ name, score, picture }, index) => (
            <li className="r-item" key={ name + picture + score }>
              <img className="r-img" src={ picture } alt="user-profile" />
              <p className="r-name" data-testid={ `player-name${index}` }>{name}</p>
              <p className="r-score" data-test-id={ `player-score${index}` }>{score}</p>
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
