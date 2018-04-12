import React, { Component } from 'react';
import styles from './App.css';
import Person from './Person/Person';
import ErrorBoundary from './ErrorBoundary/ErrorBoundary';

class App extends Component {

  state = {
    persons: [
      { name: "Android", age: 26 },
      { name: "React JS", age: 27 },
      { name: "React Native", age: 28 },
    ],
    isShowPersons: false
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

    const isVisible = this.state.isShowPersons;
    const label = isVisible ? "Hide" : "Show";

    let btnClass = '';

    let persons = null;
    if (isVisible) {
      btnClass = styles.Red;
      persons = (
        this.state.persons.map((person, index) => {
          return <ErrorBoundary key={index}>
            <Person
              name={person.name}
              age={person.age}
              changed={(event) => this._onChangeHandler(event, index)}
              click={this._deletePersonHandler} />
          </ErrorBoundary>
        })
      )
    }

    let btnUpdate = null;
    if (isVisible) {
      btnUpdate = (
        <button onClick={this._updateNameHandler}>Update</button>
      );
    }

    //let classes = ['red', 'bold'].join(' ');
    let classes = [];
    if (this.state.persons.length <= 2) {
      classes.push(styles.Red);
    }

    if (this.state.persons.length <= 1) {
      classes.push(styles.Bold);
    }

    return (
      <div className={styles.App}>
        <h1>Hi, I'm React App.</h1>
        <p className={classes.join(' ')}>This is really working!</p>
        {btnUpdate}
        <button
          className={btnClass}
          onClick={this._togglePersonsVisibilityHandler.bind(this, !isVisible)}>
          {label}</button>
        {persons}
      </div>
    );
  }
}

export default App;
