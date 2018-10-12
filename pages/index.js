import Link from 'next/link';
import Matrix from '../components/Matrix';
const Index = () => (
  <div>
    <p>Hello Next.js</p>
    <Link href="/about"><a>About</a></Link>
    <Matrix title="My first matrix" items={['a','b','c']} />
  </div>
);

export default Index;