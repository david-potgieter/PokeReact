import React from 'react';
import Radium from 'radium';
import {render} from 'react-dom';

import Screen from './components/Screen.jsx';
import Paddle from './components/Paddle.jsx';
import ScreenInfo from './components/ScreenInfo.jsx';
import DetailInfo from './components/DetailInfo.jsx';
import getPokemon from './client';

@Radium
class Pokedex extends React.Component {
  constructor() {
    super();
    this.state = {i : 1, isLoading : true};
    this.arrowRight = this.arrowRight.bind(this);
    this.arrowLeft = this.arrowLeft.bind(this);
  }
  componentDidMount() {
    this.makeRequest(this.state.i);
  }
  makeRequest(index) {
    this.setState({
      isLoading : true,
    });
    return getPokemon(index).then((res) => {
      return this.setState({
        pokemon : res.body.pokemon,
        i : index,
        isLoading : false
      });
    });
  }
  arrowRight() {
    this.makeRequest(this.state.i + 1);
  }
  arrowLeft() {
    this.makeRequest(this.state.i - 1);
  }
  render() {
    return (
      <div style={styles.background}>
        <Screen isLoading={this.state.isLoading} pokemon={this.state.pokemon} />
        <Paddle arrowRight={this.arrowRight} arrowLeft={this.arrowLeft}/>
        <ScreenInfo pokemon={this.state.pokemon} />
        <DetailInfo pokemon={this.state.pokemon} />
      </div>
    );
  };
}

const styles = {
  background : {
    backgroundImage: 'url(img/pokedex.png)',
    backgroundRepeat: 'no-repeat',
    height: '600px',
    position: 'relative'
  }
};

render(<Pokedex/>, document.getElementById('app'));