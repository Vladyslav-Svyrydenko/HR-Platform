import { array } from "prop-types";
import React, { useState } from "react";
import "../../../../src/assets/styles/post.scss";

const SavedJobs = ({ array }) => {
  var list = [];

  const [initialList, setList] = useState(list);
  function allStorage() {
    var values = [],
      keys = Object.keys(localStorage),
      i = keys.length;

    while (i--) {
      var values = localStorage.getItem(keys[i]);

      if (keys[i].slice(0, 7) === "favItem") {
        list.push(JSON.parse(values));

        console.log(list);
      }
    }

    return list;
  }

  function onDelete(job) {
    localStorage.removeItem("favItem" + job.title);

    const newList = initialList.filter((item) => item.id !== job._id);
    setList(newList);
    console.log("deletes");
  }

  allStorage();
  return (
    <>
      {list.map((job) => (
        <>
          <div class="blog-card">
            <div class="meta">
              <div
                class="photo"
                style={{
                  backgroundImage: `url(https://storage.googleapis.com/chydlx/codepen/blog-cards/image-1.jpg)`,
                }}
              ></div>

              <ul class="details">
                <p>Salary : {job.salary} DT</p>
                <li class="date">Aug. 24, 2015</li>
                <li class="tags"></li>
                <div className="  py-4 w-6">
                  <button
                    className="bg-green-500  text-white active:bg-blue-600 font-bold uppercase 
                  text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                    type="button"
                  >
                    Apply now{" "}
                  </button>
                </div>

                <div>
                  <button
                    className="bg-gray-200 text-black active:bg-gray-600 font-bold uppercase 
                  text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => onDelete(job)}
                    style={{ color: "black" }}
                  >
                    Unsave{" "}
                  </button>
                </div>
              </ul>
            </div>
            <div class="description">
              <h1>{job.title}</h1>
              <h2>{job.requirement}</h2>
              <p> {job.description}</p>
              <p class="read-more">
                <a href="#">Read More</a>
              </p>
            </div>
          </div>
        </>
      ))}
    </>
  );
};

export default SavedJobs;
