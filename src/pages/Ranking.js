import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Ranking extends Component {
  constructor(props) {
    super(props)

    this.state = ({
      picture: '',
      name: '',
      score: null,
      ranking: [],
    })
  }

  redirectToHome = () => {
    const { history } = this.props;
    history.push('/');
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
    }
    this.saveLocalStorage(pessoa);
  }

  saveLocalStorage = async (pessoa) => {
    let rankingValue = localStorage.getItem('ranking')
    let rankingObject = JSON.parse(rankingValue)
    let ranking = [pessoa]
    if(rankingValue){
      ranking = [...rankingObject, pessoa]
    }
    this.setState({ ranking })
    localStorage.setItem('ranking', JSON.stringify(ranking))
  }

  
  render() {
    let { ranking } = this.state
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
              [...ranking].sort((a, b) => b.score - a.score).map((user, index) => {
                console.log(index)
                return (
                  <li key={index}>
                    <img alt='button-power' src={user.picture}/>
                    <p data-testid={`player-name-${index}`}>{user.name}</p>
                    <p data-testid={`player-score-${index}`}>{user.score}</p>
                  </li>
                )
              })
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
};

const mapStateToProps = (state) => ({
  logindata: state.player,
});

export default connect(mapStateToProps, null)(Ranking);
