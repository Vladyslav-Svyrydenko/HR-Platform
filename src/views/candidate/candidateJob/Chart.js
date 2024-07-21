import React from "react";
import Scrollbars from "react-custom-scrollbars";
import { PieChart, Tooltip, Pie, ResponsiveContainer } from "recharts";
import "../../../../src/assets/styles/job.css";
import "../../../../src/assets/styles/recommended.scss";

// components

export default function Chart({ job }) {
  return (
    <>
      <article className="blog-card">
        <img
          className="post-image"
          src={require("assets/img/team-3-800x800.jpg")}
        />
        <div class="article-details">
          <h4 class="post-category">{job.requirement} </h4>
          <h3 class="post-title"> {job.title}</h3>
          <p class="post-description"> {job.description}</p>
          <div className="flex">
            <button
              className="bg-green-500 px-4 text-white active:bg-blue-600 font-bold uppercase 
                  text-xs  py-0 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
              type="button"
            >
              Apply now{" "}
            </button>
            <button
              className="bg-gray-200 text-black active:bg-gray-600 font-bold uppercase 
              text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
              type="button"
            >
              Details{" "}
            </button>
          </div>
        </div>
      </article>
    </>
  );
}
