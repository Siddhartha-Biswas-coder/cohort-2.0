import React, { createContext } from "react";

export const PostDataCOntext = createContext();

const PostContext = (props) => {
  const data = [
    {
      id: 1,
      username: "Siddhartha",
      title: "Learning React",
      content: "Today I learned about Context API and it's super useful!",
      likes: 12,
    },
    {
      id: 2,
      username: "Amit",
      title: "JavaScript Tips",
      content: "Always understand closures deeply, it helps in interviews.",
      likes: 25,
    },
    {
      id: 3,
      username: "Priya",
      title: "UI Design",
      content: "Good UI is all about spacing and consistency.",
      likes: 18,
    },
    {
      id: 4,
      username: "Rahul",
      title: "DSA Practice",
      content: "Solved 5 problems on arrays today 💪",
      likes: 30,
    },
    {
      id: 5,
      username: "Neha",
      title: "Tailwind CSS",
      content: "Tailwind makes styling so fast and clean!",
      likes: 20,
    },
  ];

  return (
    <div>
      <PostDataCOntext.Provider value={data}>
        {props.children}
      </PostDataCOntext.Provider>
    </div>
  );
};

export default PostContext;
