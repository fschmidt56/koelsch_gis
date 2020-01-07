import React from 'react';
import './App.css';

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID)
  }

  tick() {
    this.setState({
      date: new Date()
    })
  }

  render() {
    return (
      <p>
        {this.state.date.toLocaleTimeString()}
      </p>
    );
  }
}

class ButtonGroup extends React.Component {
  render() {
    return (
      <div className='buttonGroup'>
        <CreateButton name='Create Point' />
        <CreateButton name='Modify Point' />
        <CreateButton name='Delete Point' />
        <Overlay />
      </div>
    );
  }
}

class CreateButton extends React.Component {
  render() {
    return (
      <div >
        <button className='Button'>{this.props.name}</button>
      </div>
    )
  }
}

class Overlay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      style: {
        width: "0",
      }
    };
    this.showOverlay = this.showOverlay.bind(this);
    this.hideOverlay = this.hideOverlay.bind(this);

  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  showOverlay() {
    const style = { width: "100%" };
    this.setState({ style });
    document.body.style.backgroundColor = "rgba(255,255,255,0.75)";
  }

  hideOverlay() {
    const style = { width: 0 };
    this.setState({ style });
    document.body.style.backgroundColor = "#F3F3F3";
  }

  render() {
    return (
      <div id="koelschForm">
        <button class="Button" onClick={this.showOverlay}>Show Infos</button>
        <div className="overlay" style={this.state.style}>
          <h2>Kölsch</h2>
          <p>PlaceholderInputs</p>
          <a href="javascript:void(0)" className="closebtn" onClick={this.hideOverlay}>×</a>
        </div>
      </div>
    );
  }
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ButtonGroup />
        <div className="clock">
          <Clock />
        </div>
      </header>
    </div>
  );
}
export default App;
