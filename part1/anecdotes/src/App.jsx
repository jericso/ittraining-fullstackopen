import { useState } from 'react';

const Anecdote = ({ heading, anecdote, votes }) => {
  return (
    <>
      <h2>{heading}</h2>
      <div>{anecdote}</div>
      <div>
        has {votes} vote{votes !== 1 ? 's' : ''}
      </div>
    </>
  );
};

const Button = ({ onClick, label }) => (
  <button onClick={onClick}>{label}</button>
);

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.',
  ];
  const [votes, setVotes] = useState({
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
  });
  const [currentAnecdote, setCurrentAnecdote] = useState(0);
  const [mostVotesIndex, setMostVotesIndex] = useState(0);
  const [votesCast, setVotesCast] = useState(false);

  const handleNextAnecdoteClick = () => {
    setCurrentAnecdote(Math.floor(Math.random() * 8));
  };

  const handleVoteClick = () => {
    const votesCopy = { ...votes };
    votesCopy[currentAnecdote] += 1;
    setVotes(votesCopy);
    setVotesCast(true);

    let mostIndex = 0;
    for (let i = 1; i < 8; i++) {
      if (votesCopy[i] > votesCopy[mostIndex]) {
        mostIndex = i;
      }
    }
    setMostVotesIndex(mostIndex);
  };

  let mostVotesAnecdote = '';
  if (votesCast) {
    mostVotesAnecdote = (
      <Anecdote
        heading={'Anecdote with most votes'}
        anecdote={anecdotes[mostVotesIndex]}
        votes={votes[mostVotesIndex]}
      />
    );
  }

  return (
    <div>
      <Anecdote
        heading={'Anecdote of the day'}
        anecdote={anecdotes[currentAnecdote]}
        votes={votes[currentAnecdote]}
      />
      <Button onClick={handleVoteClick} label={'vote'} />
      <Button onClick={handleNextAnecdoteClick} label={'next anecdote'} />
      {mostVotesAnecdote}
    </div>
  );
};

export default App;
