import {
  CoursePart,
  CoursePartBase,
  CoursePartBaseNew,
  CourseProjectPart,
  CourseSubmissionPart,
  CourseSpecialPart,
} from "../types";

const CoursePartBaseContent = ({
  coursePart,
}: {
  coursePart: CoursePartBase;
}) => {
  const styleObj = {
    fontWeight: 500,
    fontSize: 18,
    marginTop: "1em",
  };
  return (
    <div style={styleObj}>
      {coursePart.name} {coursePart.exerciseCount}
    </div>
  );
};

const CoursePartBaseNewContent = ({
  coursePart,
}: {
  coursePart: CoursePartBaseNew;
}) => {
  return (
    <>
      <CoursePartBaseContent coursePart={coursePart} />
      <div>{coursePart.description}</div>
    </>
  );
};

const CourseProjectPartContent = ({
  coursePart,
}: {
  coursePart: CourseProjectPart;
}) => {
  return (
    <>
      <CoursePartBaseContent coursePart={coursePart} />
      <div>project exercises {coursePart.groupProjectCount}</div>
    </>
  );
};

const CourseSubmissionPartContent = ({
  coursePart,
}: {
  coursePart: CourseSubmissionPart;
}) => {
  return (
    <>
      <CoursePartBaseNewContent coursePart={coursePart} />
      <div>submit to {coursePart.exerciseSubmissionLink}</div>
    </>
  );
};

const CourseSpecialPartContent = ({
  coursePart,
}: {
  coursePart: CourseSpecialPart;
}) => {
  return (
    <>
      <CoursePartBaseNewContent coursePart={coursePart} />
      <div>required skills: {coursePart.requirements.join(", ")}</div>
    </>
  );
};

const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
  return (
    <div>
      {courseParts.map((coursePart) => {
        switch (coursePart.type) {
          case "normal":
            return (
              <CoursePartBaseNewContent
                key={coursePart.name}
                coursePart={coursePart}
              />
            );
          case "groupProject":
            return (
              <CourseProjectPartContent
                key={coursePart.name}
                coursePart={coursePart}
              />
            );
          case "submission":
            return (
              <CourseSubmissionPartContent
                key={coursePart.name}
                coursePart={coursePart}
              />
            );
          case "special":
            return (
              <CourseSpecialPartContent
                key={coursePart.name}
                coursePart={coursePart}
              />
            );
          default:
            throw new Error(
              `Unhandled discriminated union member: ${JSON.stringify(
                coursePart
              )}`
            );
        }
      })}
    </div>
  );
};

export default Content;
