import React, { Component } from "react";
import { connect } from "react-redux";

class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <>
        {this.props.show && (
          <div className={`snackbar ${this.props.type}`}>
            <div className="snackbar-title">{this.props.title}</div>
            <div>{this.props.description}</div>
            <div className="close-snackbar">
              {/* <i className="fa-solid fa-circle-xmark"></i> */}
            </div>
          </div>
        )}
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  title: state.notification.title,
  description: state.notification.description,
  show: state.notification.show,
  type: state.notification.type,
});

export default connect(mapStateToProps)(Notification);
