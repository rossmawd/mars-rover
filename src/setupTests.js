//this file t tells Jest and Enzyme what Adapters you will be making use of

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });