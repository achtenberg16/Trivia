import React, { Component } from 'react';
import { object, func } from 'prop-types';
import { connect } from 'react-redux';
import { addTokenFetch, addInfos } from '../action';
import triviaLogo from '../trivia.png';
import '../css/Login.css';

export class Login extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      gravatarEmail: '',
      isButtonDisabled: true,
    };
  }

  redirectSettings = () => {
    const { history } = this.props;
    history.push('/settings');
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value }, this.checkButtonValidation);
  }

  checkButtonValidation = () => {
    const { name, gravatarEmail } = this.state;
    const conditionName = name !== '';
    const conditionEmail = /\S+@\S+\.\S+/.test(gravatarEmail);
    if (conditionEmail && conditionName) {
      this.setState({ isButtonDisabled: false });
      return true;
    }
    this.setState({ isButtonDisabled: true });
  }

  handleSubmit = async (event) => {
    const { gravatarEmail, name } = this.state;
    const { history, submitInfos, addToken } = this.props;
    event.preventDefault();
    submitInfos({ gravatarEmail, name });
    await addToken();
    history.push('/game');
  }

  render() {
    const { name, gravatarEmail, isButtonDisabled } = this.state;
    return (
      <div className="login">
        <img src={ triviaLogo } alt="trivia logo" className="trivia-logo" />
        <form
          className="l-form"
          type="submit"
          onSubmit={ this.handleSubmit }
        >
          <label htmlFor="name" className="l-label">
            Nome:
            <input
              id="name"
              className="l-input"
              name="name"
              type="text"
              value={ name }
              data-testid="input-player-name"
              onChange={ this.handleChange }
              required
            />

          </label>
          <label htmlFor="gravatarEmail" className="l-label">
            Email:
            <input
              id="gravatarEmail"
              name="gravatarEmail"
              className="l-input"
              type="email"
              value={ gravatarEmail }
              data-testid="input-gravatar-email"
              onChange={ this.handleChange }
              required
            />
          </label>
          <div className="l-buttons">
            <button
              type="submit"
              data-testid="btn-play"
              disabled={ isButtonDisabled }
              className="l-button"
            >
              Play
            </button>

            <button
              data-testid="btn-settings"
              type="button"
              onClick={ this.redirectSettings }
              className="l-button"
            >
              Settings
            </button>
          </div>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: object,
  addToken: func,
  submitInfos: func,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  addToken: () => dispatch(addTokenFetch()),
  submitInfos: (userInfos) => dispatch(addInfos(userInfos)),
});

export default connect(null, mapDispatchToProps)(Login);
