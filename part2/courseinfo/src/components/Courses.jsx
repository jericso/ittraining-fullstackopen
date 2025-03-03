import Course from './Course';

const Heading = ({ curriculumName }) => <h1>{curriculumName}</h1>;

const Courses = ({ courses }) => (
  <div>
    <Heading curriculumName={'Web development curriculum'} />
    {courses.map((course) => (
      <Course key={course.id} course={course} />
    ))}
  </div>
);

export default Courses;
