import React from 'react';
import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { token, score, playerName } = this.props;
    return (
      <header>
        <img
          className="profile-image"
          src={ `https://www.gravatar.com/avatar/${token}` }
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
  token: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  playerName: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  token: state.token,
  score: state.player.score,
  playerName: state.player.name,
});

export default connect(mapStateToProps)(Header);
