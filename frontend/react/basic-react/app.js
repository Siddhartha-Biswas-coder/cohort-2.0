const box = () => {
  return React.createElement(
    "div",
    {
      style: {
        height: "200px",
        width: "200px",
        backgroundColor: "red",
      },
      id: "box",
    },
    "This is a  box",
  );
};

export default box;
