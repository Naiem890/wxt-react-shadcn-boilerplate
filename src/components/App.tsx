import React, { useState } from "react";
import { Button } from "./ui/button";

const App = ({ baseScale = 1 }) => {
  return (
    <div
      className="relative flex items-center justify-center bg-black! text-white"
      style={{ zoom: baseScale }}
    >
      Here is sales sniper
    </div>
  );
};

export default App;
