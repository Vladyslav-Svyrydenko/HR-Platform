import React from "react";

const Job = ({ job, onEdit, onDelete }) => {
  return (
    <>
      <Card className="w-full md:w-4/12">
        <img
          src={require("assets/img/job.jpg")}
          alt="image"
          width={1200}
          height={600}
          className="max-w-full h-auto"
        />
        <Card.Body>
          <Card.Title>{job.title}</Card.Title>
          <Card.Text>{job.description}</Card.Text>
          <button
            className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
            onClick={() => onEdit(job)}
          >
            Edit
          </button>

          <button
            className="bg-red-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
            onClick={() => onDelete(job._id)}
            key={job._id}
          >
            Delete
          </button>
        </Card.Body>
      </Card>
    </>
  );
};

const Card = ({ className, children }) => (
  <div
    className={`${className}  flex flex-col border-2 border-gray-200 rounded-lg`}
    style={style}
  >
    {children}
  </div>
);
Card.Body = ({ children }) => (
  <div className="block flex-grow flex-shrink p-5">{children}</div>
);
Card.Title = ({ className, children }) => (
  <div className={`${className} font-medium text-gray-700 mb-3`}>
    {children}
  </div>
);
Card.Text = ({ children }) => <div className="text-gray-500">{children}</div>;
const style = {
  boxShadow: "0 2px 5px 0 rgb(0 0 0 / 16%), 0 2px 10px 0 rgb(0 0 0 / 12%)",
};
export default Job;
