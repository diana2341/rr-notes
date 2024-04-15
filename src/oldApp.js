import React, { Component } from "react";
import "./App.css";
import { connect } from "react-redux";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      num: '',
    };
  }

  handleUpdateNum = (e) => {
    this.setState({ num: e.target.value });
  };

  handleSubmit = () => {
    const { num } = this.state;
    this.props.addNum(parseInt(num))
    this.setState({ num: "" });
  };

  render() {
    const { counter, dispatch } = this.props;
    const { num } = this.state;
    return (
      <div className="App">
        {counter}
        <input onChange={this.handleUpdateNum} value={num} />{" "}
        <button onClick={this.handleSubmit} type="number">
          add number
        </button>
        <br />
        <button onClick={this.props.increment}>+</button>{" "}
        <button onClick={this.props.decrement}>-</button>
        <button onClick={this.props.reset}>Reset</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  counter: state.count,
});
const mapDispatchToProps = (dispatch) => ({
  increment: ()=> dispatch({type:"INCREMENT"}),
  decrement: ()=> dispatch({type:"DECREMENT"}),
  addNum: (num)=> dispatch({type:"ADDNUM", payload: num}),
  reset: () => dispatch({type:'RESET'})

});

export default connect(mapStateToProps, mapDispatchToProps)(App);

//funtional version
// import { useState } from "react";
// import "./App.css";

// import { useDispatch, useSelector } from "react-redux";
// function App() {
//   const dispatch = useDispatch();
//   const counter = useSelector((state) => state.count);
//   const [num, setNum] = useState(null);
//   const handleUpdateNum = (e) => {
//     setNum(e.target.value);
//   };
//   const handleSubmit = () => {
//     dispatch({ type: "ADDNUM", payload: parseInt(num) });
//     setNum("");
//   };
//   return (
//     <div className="App">
//       {counter}
//       <input onChange={handleUpdateNum} value={num} />{" "}
//       <button onClick={handleSubmit} type="number">
//         add number
//       </button>
//       <br />
//       <button onClick={() => dispatch({ type: "INCREMENT" })}>+</button>{" "}
//       <button onClick={() => dispatch({ type: "DECREMENT" })}>-</button>
//       <button onClick={() => dispatch({ type: "RESET" })}>Reset</button>
//     </div>
//   );
// }

// export default App;
