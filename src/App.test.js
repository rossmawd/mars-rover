import React from 'react';
// import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import App from './App';

// it('renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<App />, div);
//   ReactDOM.unmountComponentAtNode(div);
// });


describe('App component', () => {
  it('starts with a count of 0', () => {
    const wrapper = shallow(<App />);
    const text = wrapper.find('label').text();
    expect(text).toEqual('Enter Test input: ');
  });
});

