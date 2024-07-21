import { history } from "helpers/history";
import React, { useState } from "react";

const JobCandidate = ({ job, onEdit }) => {
  var i = job._id;

  console.log(job);
  console.log(i);
  const [favorites, setFavorites] = useState([]);

  const addFav = ({ job }) => {
    var array = JSON.stringify(job);

    console.log(job.title);
    var array = favorites;
    let addArray = true;
    array.map((item, job) => {
      if (item === job._id) {
        addArray = false;
      }
    });

    if (addArray) {
      array.push(job._id);
    }
    setFavorites([...array]);

    var storage = localStorage.getItem("favItem" + job.title || "0");
    if (storage == null) {
      localStorage.setItem("favItem" + job.title, JSON.stringify(job));
      localStorage.setItem("color", "green");
    } else {
      localStorage.removeItem("favItem" + job.title);
    }
  };
  function handleEdit(job) {
    history.push({
      pathname: `/candidate/details/${job._id}`,
      state: {
        job: job,
      },
    });
  }
  return (
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

            <li class="date">{job.date}</li>
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
              {favorites.includes(i) ? (
                <button
                  className="bg-gray-200 text-black active:bg-gray-600 font-bold uppercase 
                  text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => addFav({ job, i })}
                  style={{ color: "green" }}
                >
                  Unsave{" "}
                </button>
              ) : (
                <button
                  className="bg-gray-200 text-black active:bg-gray-600 font-bold uppercase 
                  text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => addFav({ job, i })}
                  style={{ color: "black" }}
                >
                  Save job{" "}
                </button>
              )}
            </div>
          </ul>
        </div>
        <div class="description">
          <h1>{job.title}</h1>
          <h2>{job.requirement}</h2>
          <p> {job.description}</p>
          <p class="read-more">
            <button
              className="bg-gray-200 text-black active:bg-gray-600 font-bold uppercase 
                  text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
              type="button"
              onClick={() => handleEdit(job)}
            >
              details job{" "}
            </button>
          </p>
        </div>
      </div>
    </>
  );
};
export default JobCandidate;
