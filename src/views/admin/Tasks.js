import React from "react";

// components

import DraggableView from "views/admin/DraggableView.js";

export default function Tasks() {
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
        <DraggableView/>
        </div>
    
      </div>
    </>
  );
}
