import * as React from "react";

export interface IHelloWorldProps {
  name: string;
};

export default class HelloWorld extends React.Component<IHelloWorldProps, any> {
  render() {
    return <div><h1>{`Hello World ${this.props.name}`}</h1></div>;
  }
};
