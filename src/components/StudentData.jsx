import React from "react";
import StudentDataRow from "./StudentDataRow";

const StudentData = React.memo(({ data, showDetails }) => {
  return (
    <>
      <tbody>
        {data.map((row, index) => {
          return (
            <StudentDataRow key={index} row={row} showDetails={showDetails} />
          );
        })}
      </tbody>
    </>
  );
});

StudentData.displayName = 'StudentData';

export default StudentData;
