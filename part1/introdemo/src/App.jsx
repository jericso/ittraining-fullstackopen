const Hello = (props) => {
  console.log(props);
  return (
    <div>
      <p>
        Hello {props.name}, you are {props.age} years old
      </p>
    </div>
  );
};

const Footer = () => {
  return (
    <div>
      greeting app created by <a href='https://github.com/jericso'>jericso</a>
    </div>
  );
};

const App = () => {
  const friends = [
    { name: 'Peter', age: 4 },
    { name: 'Maya', age: 10 },
  ];
  const friendsArray = [ 'Felix', 'Vincent'];
  return (
    <div>
      <p>{friends[0].name} {friends[0].age}</p>
      <p>{friends[1].name} {friends[1].age}</p>
      <Hello name={friends[0].name} age={friends[0].age} />
      <Hello name={friends[1].name} age={friends[1].age} />
      <br />
      <p>{friendsArray}</p>
      <Hello name={friendsArray[0]} age={22} />
      <Hello name={friendsArray[1]} age={33} />
      <br />
      <br />
      <Footer />
    </div>
  );
};

export default App;
