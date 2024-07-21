import React from "react";

// components
import CardProfile from "views/candidate/candidateJob/CardSettings";

import CardSettings from "views/candidate/candidateJob/CardProfile";

export default function Alljobs() {
  return (
    <>
      {" "}
      <div className="flex flex-wrap">
        <div className="w-full lg:w-8/12 px-4">
          <CardProfile />
        </div>
        <div className="w-full lg:w-4/12 px-4">
          <CardSettings />
        </div>
      </div>
    </>
  );
}
