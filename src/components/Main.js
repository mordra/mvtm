import React from 'react';
import movies from '../sources/movies.json';
import _ from 'lodash';
import '../styles/App.css';

const buildGenre = movies => {
  let moviesByGenre = {};
  _.map(movies, movie => {
    console.log(movie.title);
    _.forEach(movie.genres, (genre) => {
      console.log(movie + ' ' + genre);
      if (!moviesByGenre[genre])
        moviesByGenre[genre] = [];
      moviesByGenre[genre].push(movie);
    });
  })
  return moviesByGenre;
};

class AppComponent extends React.Component {

  constructor(props) {
    super();
    this.moviesByGenre = buildGenre(movies);
    this.state = {
      selectedGenre: _.keys(this.moviesByGenre)[0]
    }
  }

  render() {
    let self = this;
    return (
      <div className="main-component">
        <span>Select your genre: </span>
        <select onChange={(e) => {self.setState({selectedGenre: e.target.value})}}>
          {
            _.map(this.moviesByGenre, (val, key) => {
              return <option key={key} value={key}>{key}</option>
            })
          }
        </select>
        <table>
          <thead>
          <tr>
            <td>Name</td>
            <td>Genres</td>
          </tr>
          </thead>
          <tbody>
          {
            this.moviesByGenre && _.map(this.moviesByGenre[this.state.selectedGenre], movie => {
              return (
                <tr>
                  <td>{movie.title}</td>
                  <td>{
                    _.reduce(movie.genres, (total, single) => {
                      return total + ', ' + single;
                    })
                  }</td>
                </tr>
              )
            })
          }
          </tbody>
        </table>
      </div>
    );
  }
}

AppComponent.defaultProps = {};

export default AppComponent;
