import React from "react";
import { RouterProvider } from "react-router";
import { BattleContextProvider } from "./battle/battle.context";
import { router } from "./app.routes";

const App = () => {
  return (
    <BattleContextProvider>
      <RouterProvider router={router} />
    </BattleContextProvider>
  );
};

export default App;
