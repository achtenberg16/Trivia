import React, { Component } from 'react';

export class Login extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      gravatarEmail: '',
      isButtonDisabled: true,
    };
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

  render() {
    const { name, gravatarEmail, isButtonDisabled } = this.state;
    return (
      <form type="submit">
        <label htmlFor="name">
          Nome:
          <input
            id="name"
            name="name"
            type="text"
            value={ name }
            data-testid="input-player-name"
            onChange={ this.handleChange }
            required
          />

        </label>
        <label htmlFor="gravatarEmail">
          Email:
          <input
            id="gravatarEmail"
            name="gravatarEmail"
            type="email"
            value={ gravatarEmail }
            data-testid="input-gravatar-email"
            onChange={ this.handleChange }
            required
          />
        </label>

        <button
          type="submit"
          data-testid="btn-play"
          disabled={ isButtonDisabled }
        >
          Play
        </button>
      </form>
    );
  }
}

export default Login;
