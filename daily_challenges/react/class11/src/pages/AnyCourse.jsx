import React from "react";
import { useParams } from "react-router-dom";

const AnyCourse = () => {

    
    const params = useParams()
    console.log(params);
    

  return (
    <div>
      <h1
        className="text-5xl underline whitespace-nowrap font-semibold fixed left-[50vw] -translate-x-1/2
      "
      >
        {params.id} Course Page
      </h1>
    </div>
  );
};

export default AnyCourse;
