import React from "react";

export default class BaseComponent extends React.Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  handleInputChange(event) {
    const target = event.target;
    const name = target.name;
    let value;
    switch (target.type) {
      case "checkbox":
        value = target.checked;
        break;
      case "select-multiple":
        // let flavors = this.state.flavors;
        let list = this.state[name];
        let index = list.indexOf(target.value);
        if (index > -1) {
          list.splice(index, 1);
        } else {
          list.push(target.value);
        }
        value = list;
        break;
      default:
        value = target.value;
        break;
    }
    console.log(value);

    this.setState({
      [name]: value,
    });
  }
}
