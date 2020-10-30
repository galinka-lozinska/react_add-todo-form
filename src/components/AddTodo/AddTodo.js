/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import uuid from 'uuid-random';
import { AddTodoTypes } from './AddTodoTypes';

import './AddTodo.css';

export class AddTodo extends React.Component {
  state = {
    todo: {
      id: 1,
      title: '',
      completed: false,
      userId: 0,
    },
    maxLengthTitle: 35,
    countLetters: 0,
    titleError: false,
    userIdError: false,
    validInput: true,
  }

  validInputTitle = (value) => {
    const regexp = /[^A-Za-z0-9 ]+/g;

    this.setState({
      validInput: !value.match(regexp),
    });
  }

  validate = () => {
    this.setState(state => ({
      titleError: !state.todo.title,
      userIdError: !state.todo.userId,
    }));

    if (!this.state.todo.title || !this.state.todo.userId) {
      return false;
    }

    return true;
  }

  handleSubmit = () => {
    const isValid = this.validate();

    if (isValid && this.state.validInput) {
      this.props.addTodo(this.state.todo);
      this.cleanForm();
    }
  }

  cleanForm = () => {
    this.setState(prevState => ({
      todo: {
        id: prevState.todo.id + 1,
        title: '',
        completed: false,
        userId: 0,
      },
      countLetters: 0,
      titleError: false,
      userIdError: false,
      validInput: true,
    }));
  }

  handleChange = (event) => {
    const { name, value, checked } = event.target;

    this.validInputTitle(value);

    name === 'completed'
      ? this.setState(state => ({
        todo: {
          ...state.todo,
          [name]: checked,
        },
      }))
      : this.setState(state => ({
        todo: {
          ...state.todo,
          [name]: name === 'title' ? value : Number(value),
        },
        countLetters: value.length,
        titleError: name === 'title'
          ? value === '' : state.titleError,
        userIdError: name === 'userId'
          ? Number(value) === 0 : state.userIdError,
      }));
  }

  render() {
    const {
      users,
    } = this.props;

    return (
      <form>
        <label className="header">
          Create new Todo
        </label>
        <div>
          <label id="title">Title</label>
          <div className="container">
            <input
              className="title"
              htmlFor="title"
              name="title"
              type="text"
              maxLength={this.state.maxLengthTitle}
              value={this.state.todo.title}
              placeholder="Title"
              onChange={this.handleChange}
            />
            <div className="limit">
              <p>{Number(this.state.countLetters)}</p>
            </div>
          </div>
          <div className="error-message">
            {this.state.titleError ? 'Please enter the title' : ''}
            <br />
            { this.state.validInput
              ? '' : 'Special characters are not allowed'}
          </div>
        </div>

        <div>
          <label id="userId">User</label>
          <select
            htmlFor="userId"
            name="userId"
            value={this.state.todo.userId}
            onChange={this.handleChange}
          >
            <option key={uuid()} value={0}>Choose a user</option>
            {users.map(user => (
              <option key={uuid()} value={user.id}>
                {user.id}
                {' - '}
                {user.name}
              </option>
            ))}
          </select>
          <div className="error-message">
            {this.state.userIdError ? 'Please choose a user' : ''}
          </div>
        </div>

        <div>
          <label id="completed">Complited</label>
          <input
            htmlFor="completed"
            type="checkbox"
            name="completed"
            checked={this.state.todo.completed}
            onChange={this.handleChange}
          />
        </div>

        <input
          type="button"
          value="Add Todo"
          onClick={this.handleSubmit}
        />
      </form>
    );
  }
}

AddTodo.propTypes = AddTodoTypes;
