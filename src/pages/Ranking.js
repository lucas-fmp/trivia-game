import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Ranking extends Component {
  constructor(props) {
    super(props);

    this.state = ({
      ranking: [],
    });
  }

  componentDidMount() {
    const { logindata } = this.props;
    const { gravatarEmail } = logindata;
    const convertedEmail = md5(gravatarEmail).toString();
    const gravatarLink = `https://www.gravatar.com/avatar/${convertedEmail}`;
    const pessoa = {
      picture: gravatarLink,
      name: logindata.name,
      score: logindata.score,
    };
    this.saveLocalStorage(pessoa);
  }

  redirectToHome = () => {
    const { history } = this.props;
    history.push('/');
  }

  saveLocalStorage = async (pessoa) => {
    const rankingValue = localStorage.getItem('ranking');
    const rankingObject = JSON.parse(rankingValue);
    let ranking = [pessoa];
    if (rankingValue) {
      ranking = [...rankingObject, pessoa];
    }
    this.setState({ ranking });
    localStorage.setItem('ranking', JSON.stringify(ranking));
  }

  render() {
    const { ranking } = this.state;
    return (
      <div>
        <h1 data-testid="ranking-title">
          Ranking
        </h1>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ this.redirectToHome }
        >
          Voltar ao início
        </button>
        <div>
          <ul>
            {
              [...ranking].sort((a, b) => b.score - a.score).map((user, index) => (
                <li key={ index }>
                  <img alt="button-power" src={ user.picture } />
                  <p data-testid={ `player-name-${index}` }>{user.name}</p>
                  <p data-testid={ `player-score-${index}` }>{user.score}</p>
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  logindata: PropTypes.shape({
    gravatarEmail: PropTypes.string,
    name: PropTypes.string,
    score: PropTypes.number,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  logindata: state.player,
});

export default connect(mapStateToProps, null)(Ranking);
