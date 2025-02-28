import { useState } from 'react';

const Display = (props) => <div>{props.value}</div>;

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const History = (props) => {
  if (props.allClicks.length === 0) {
    return <div>the app is used by pressing the buttons</div>;
  }
  return <div>button press history: {props.allClicks.join(' ')}</div>;
};

const App = () => {
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(0);
  const [allClicks, setAll] = useState([]);
  const [total, setTotal] = useState(0);

  const handleLeftClick = () => {
    setAll(allClicks.concat('L'));
    const updatedLeft = left + 1;
    setLeft(updatedLeft);
    setTotal(updatedLeft + right);
  };

  const handleRightClick = () => {
    setAll(allClicks.concat('R'));
    const updatedRight = right + 1;
    setRight(updatedRight);
    setTotal(left + updatedRight);
  };

  const handleClick = (direction) => {
    if (direction === 'R') {
      setAll(allClicks.concat('R'));
      const updatedRight = right + 1;
      setRight(updatedRight);
      setTotal(left + updatedRight);
    } else if (direction === 'L') {
      setAll(allClicks.concat('L'));
      const updatedLeft = left + 1;
      setLeft(updatedLeft);
      setTotal(updatedLeft + right);
    }
  };

  return (
    <div>
      <Display value={left} />
      <Button onClick={() => handleClick('L')} text={'left'} />
      <Button onClick={() => handleClick('R')} text={'right'} />
      <Display value={right} />
      <History allClicks={allClicks} />
    </div>
  );
};

export default App;
