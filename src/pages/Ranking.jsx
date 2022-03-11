import React from 'react';
import { connect } from 'react-redux';

class Ranking extends React.Component {
  render() {
    return (
      <div>
        <h1 className="r-title" data-testid="ranking-title">RANKING</h1>
      </div>
    );
  }
}

export default connect()(Ranking);
