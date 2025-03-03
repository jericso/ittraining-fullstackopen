const Subheading = ({ courseName }) => <h2>{courseName}</h2>;

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Content = ({ parts }) => (
  <div>
    {parts.map((part) => (
      <Part key={part.id} part={part} />
    ))}
  </div>
);

const Total = ({ total }) => (
  <h4>
    total of {total} exercise{total !== 1 ? 's' : ''}
  </h4>
);

const Course = ({ course }) => (
  <div>
    <Subheading courseName={course.name} />
    <Content parts={course.parts} />
    <Total
      total={course.parts.reduce(
        (totalExercises, exercises) => totalExercises + exercises.exercises,
        0
      )}
    />
  </div>
);

export default Course;
