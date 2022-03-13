import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import '../css/Game.css';

class Header extends React.Component {
  render() {
    const { email, score, playerName } = this.props;
    const hash = md5(email).toString();
    return (
      <header className="header">
        <img
          className="profile-image"
          src={ `https://www.gravatar.com/avatar/${hash}` }
          data-testid="header-profile-picture"
          alt="profile"
        />
        <h3 data-testid="header-player-name" className="profile-name">
          { playerName }
        </h3>
        <p data-testid="header-score" className="profile-score">{ score }</p>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  playerName: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.player.gravatarEmail,
  score: state.player.score,
  playerName: state.player.name,
});

export default connect(mapStateToProps)(Header);
