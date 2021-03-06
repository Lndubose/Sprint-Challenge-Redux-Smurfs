import React, { Component, Fragment } from "react";
import "./App.css";
import { connect } from "react-redux";

import { smurfGet, addSmurf, deleteSmurf, updateSmurf } from "../actions";
import Smurf from "../Presontatnal/Smurf";
import SmurfForm from "../Presontatnal/SmurfForm";
/*
 to wire this component up you're going to need a few things.
 I'll let you do this part on your own. 
 Just remember, `how do I `connect` my components to redux?`
 `How do I ensure that my component links the state to props?`
 */
class App extends Component {
  state = {
    name: "",
    age: "",
    height: "",
    editId: null
  };

  componentDidMount() {
    this.props.smurfGet();
  }

  handleChange = e => {
    if (e.target.name === "age") {
      const number = parseInt(e.target.value, 10);
      this.setState({ [e.target.name]: number });
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
  };

  handleClick = e => {
    e.preventDefault();
    this.state.editId !== null ? this.props.updateSmurf(this.state): this.props.addSmurf(this.state);
    this.setState({ name: "", age: "", height: "", editId: null });
  };

  deleteClick = (e, id) => {
    e.preventDefault();
    this.props.deleteSmurf(id);
  };

  editSmurf =(smurf) => {
    this.setState({
      name: smurf.name,
      age: smurf.age,
      height: smurf.height,
      editId: smurf.id
    },() => console.log(this.state))
  }

  render() {
    return (
      <div className="App">
        <h1>Smurfs Village</h1>
        <div className="smurfs">
          {this.props.fetching ? (
            <h2>Let's go to the village...</h2>
          ) : (
            <Fragment>
              {this.props.smurfs.map(smurf => (
                <Smurf
                  key={smurf.id}
                  smurf={smurf}
                  deleteClick={this.deleteClick}
                  editSmurf={this.editSmurf}
                />
              ))}
            </Fragment>
          )}
        </div>
        <SmurfForm
          input={this.state}
          handleChange={this.handleChange}
          handleClick={this.handleClick}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    smurfs: state.smurfs,
    fetching: state.fetchingSmurfs
  };
};

export default connect(
  mapStateToProps,
  { smurfGet, addSmurf, deleteSmurf, updateSmurf }
)(App);
