import Link from 'next/link';
import { Provider } from 'react-redux';
import Matrix from '../components/Matrix';

import {initializeStore} from '../model/store';
const exampleData = require('../data/example1.json');

const Index = () => (
  <Provider store={reduxStore}>
    <div>
      <h1>{exampleData.title}</h1>
      <Matrix items={exampleData.items} axes={exampleData.axes} />
      <Link href="/about"><a>About</a></Link>
    </div>
  </Provider>
);

export default Index;