import React from 'react'
import './BodyColor.css';

class BodyColor extends React.Component {
  static propTypes = {
    imageOn: React.PropTypes.bool
  }
  static defaultProps = {
    imageOn: true
  }
  componentDidMount() {
    document.body.classList.toggle('backgroundImage', this.props.imageOn)
  }
  componentWillReceiveProps(nextProps) {
    document.body.classList.toggle('backgroundImage', nextProps.imageOn)
  }
  componentWillUnmount() {
    document.body.classList.remove('backgroundImage')
  }
  render() {
    return this.props.children
  }
}

export default BodyColor;