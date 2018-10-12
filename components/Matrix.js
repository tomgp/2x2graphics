const ItemList = (list)=>{
  return list.map((item,i)=>(
    <li key={`itemList${i}`}>{item}</li>
  ));
}

const Matrix = ({items=[], title, axes, date, author})=>{
  return (<div>
    <h1>{title}</h1>
    {ItemList(items)}
  </div>);
};

export default Matrix;