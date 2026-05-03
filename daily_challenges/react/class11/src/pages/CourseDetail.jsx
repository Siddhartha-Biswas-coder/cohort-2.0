import React, { use } from "react";
import { useParams } from "react-router-dom";

const CourseDetail = () => {
  const params = useParams();

  return (
    <div>
      <h1
        className="text-5xl underline whitespace-nowrap font-semibold fixed left-[50vw] -translate-x-1/2
      "
      >
        {params.id} Course Details Page
      </h1>
    </div>
  );
};

export default CourseDetail;
