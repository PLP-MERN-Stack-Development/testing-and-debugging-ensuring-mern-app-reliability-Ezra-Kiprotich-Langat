import { Component } from 'react';

export default class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(error, info) { console.error(error, info); }

  render() {
    if(this.state.hasError) return <div className="p-4 text-red-600">Something went wrong.</div>;
    return this.props.children;
  }
}
