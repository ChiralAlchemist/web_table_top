import React, { Component } from 'react';
import logo from './logo.svg';
import TableTop from './components/table_top/Table_Top'
import './App.css';



class App extends Component {
  render() {
    var green = {
      color : "green",
      number : 1
    };
    var blue = {
      color : "blue",
      number : 2,
      show: true
    }

    var tableData = [[green, green, green, green, blue],
                      [green, green, green, green, green]
                    ];
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <TableTop tableData={tableData} />
      </div>
    );
  }
}

export default App;
