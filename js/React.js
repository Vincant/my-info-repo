/*Функция Clock (ES5), в props принимаются аргументы (properties),
так же является Классом и Компонентом Реакта (ES6) где this.props теже аргументы.
При Рендере 1 -что передаем, 2 -куда передаем, передаем класс Clock с параметром date.*/

function Clock(props) {     //ES5
  return (
    <div>
    <h1>Hello, world!</h1>
    <h2>It is {props.date.toLocaleTimeString()}.</h2>
    </div>
  );
}

class Clock extends React.Component {     //ES6
  render() {
    return (
      <div>
      <h1>Hello, world!</h1>
      <h2>It is {this.props.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

ReactDOM.render(
  <Clock date={new Date()} />,
  document.getElementById('root')
);



//### Adding Local State to a Class ###//
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);



//### Adding Lifecycle Methods to a Class  ###//
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);

