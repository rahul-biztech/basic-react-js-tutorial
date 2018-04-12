import React, { Component } from 'react';
import './App.css';
import Radium, { StyleRoot } from 'radium';
import Person from './Person/Person';

class App extends Component {

  state = {
    persons: [
      { name: "Android", age: 26 },
      { name: "React JS", age: 27 },
      { name: "React Native", age: 28 },
    ],
    isShowPersons: true
  }

  _updateNameHandler = () => {
    this.setState({
      persons: [
        { name: "Android App Developer", age: 26 },
        { name: "React JS Developer", age: 27 },
        { name: "React Native Developer", age: 28 },
      ]
    })
  }

  _onChangeHandler = (event, index) => {
    const person = { ...this.state.persons[index] };
    person.name = event.target.value;
    const persons = [...this.state.persons];
    persons[index] = person;
    this.setState({ persons });
  }

  _togglePersonsVisibilityHandler = (isShow) => {
    this.setState({
      isShowPersons: isShow
    })
  }

  _deletePersonHandler = (index) => {
    const persons = this.state.persons;
    persons.splice(index, 1);
    this.setState({ persons })
  }

  render() {

    const style = {
      backgroundColor: 'red',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer',
      margin: '10px',
      color: 'white',
      ':hover': {
        backgroundColor: 'salmon',
        color: 'black'
      }
    };

    const isVisible = this.state.isShowPersons;
    const label = isVisible ? "Hide" : "Show";

    let persons = null;
    if (isVisible) {
      style.backgroundColor = "green";
      style[':hover'] = {
        backgroundColor: 'lightgreen',
        color: 'black'
      };
      persons = (
        this.state.persons.map((person, index) => {
          return <Person
            name={person.name}
            age={person.age}
            changed={(event) => this._onChangeHandler(event, index)}
            click={this._deletePersonHandler}
            key={index} />
        })
      )
    }

    let btnUpdate = null;
    if (isVisible) {
      btnUpdate = (
        <button style={style} onClick={this._updateNameHandler}>Update</button>
      );
    }

    //let classes = ['red', 'bold'].join(' ');
    let classes = [];
    if (this.state.persons.length <= 2) {
      classes.push('red');
    }

    if (this.state.persons.length <= 1) {
      classes.push('bold');
    }

    return (
      <StyleRoot>
        <div className="App">
          <h1>Hi, I'm React App.</h1>
          <p className={classes.join(' ')}>This is really working!</p>
          {btnUpdate}
          <button style={style} key="1" onClick={this._togglePersonsVisibilityHandler.bind(this, !isVisible)}>{label}</button>
          {persons}
        </div>
      </StyleRoot>
    );
  }
}

export default Radium(App);
