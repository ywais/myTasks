import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return {hasError: true};
  }

  render() {
    return (
      <div>
        {this.state.hasError ?
          <h3>Too many Comments to count!</h3> :
          this.props.children
        }
      </div>
    )
  }
}

export default ErrorBoundary;