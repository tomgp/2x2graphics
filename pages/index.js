import Link from 'next/link';
import Matrix from '../components/Matrix';

const exampleData = require('../data/example1.json');

const Index = () => (
  <div>
    <h1>{exampleData.title}</h1>
    <Matrix items={exampleData.items} />
    <Link href="/about"><a>About</a></Link>
  </div>
);

export default Index;