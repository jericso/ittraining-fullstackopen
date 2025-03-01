import { useState } from 'react';

const SubHeading = ({ text }) => <h2>{text}</h2>;

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const StatisticLine = ({ label, value }) => (
  <tr>
    <td>{label}</td>
    <td>{value}</td>
  </tr>
);

const Statistics = ({ good, neutral, bad }) => {
  let total = good + neutral + bad;

  if (total === 0) {
    return <div>No feedback given</div>;
  }

  return (
    <table>
      <tbody>
        <StatisticLine label={'good'} value={good} />
        <StatisticLine label={'neutral'} value={neutral} />
        <StatisticLine label={'bad'} value={bad} />
        <StatisticLine label={'all'} value={total} />
        <StatisticLine label={'average'} value={(good + bad * -1) / total} />
        <StatisticLine label={'positive'} value={(good / total) * 100 + ' %'} />
      </tbody>
    </table>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleClick = (feedback) => {
    switch (feedback) {
      case 'G':
        setGood(good + 1);
        break;
      case 'N':
        setNeutral(neutral + 1);
        break;
      case 'B':
        setBad(bad + 1);
        break;
      default:
        console.log(`Invalid feedback: "${feedback}".`);
    }
  };

  return (
    <div>
      <SubHeading text={'give feedback'} />
      <Button onClick={() => handleClick('G')} text={'good'} />
      <Button onClick={() => handleClick('N')} text={'neutral'} />
      <Button onClick={() => handleClick('B')} text={'bad'} />
      <SubHeading text={'statistics'} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
