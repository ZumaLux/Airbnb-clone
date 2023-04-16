"use client";
import React from "react";
import { Toaster } from "react-hot-toast";

const ToasterProvider = () => {
  return (
    <div>
      {/* we are doing this because at least one of the parents 
        needs to be Client Side (because its using useEffect), 
        otherwise it will throw an error*/}
      <Toaster />
    </div>
  );
};

export default ToasterProvider;
