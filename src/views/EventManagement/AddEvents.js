import React, { useEffect } from "react";
import useForm from "./useForm";
import {
  CreateEvents,
  UpdateEvents,
} from "../../Redux/actions/event/EventAction";
import { connect } from "react-redux";
import ButterToast, { Cinnamon } from "butter-toast";
//import { AssignmentTurnedIn } from "@material-ui/icons";

const initialFieldValues = {
  eventName: "",
  eventDate: "",
  description: "",
};

const AddEvent = ({ ...props }) => {
  useEffect(() => {
    if (props.currentId != 0) {
      setValues({
        ...props.EventsList.find((x) => x._id == props.currentId),
      });
      setErrors({});
    }
  }, [props.currentId]);

  const validate = () => {
    let temp = { ...errors };
    temp.eventName = values.eventName ? "" : "This field is required.";
    temp.eventDate = values.eventDate ? "" : "This field is required.";
    temp.description = values.description ? "" : "This field is required.";
    setErrors({
      ...temp,
    });
    // eslint-disable-next-line eqeqeq
    return Object.values(temp).every((x) => x == "");
  };

  var {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm,
  } = useForm(initialFieldValues, props.setCurrentId);

  const handleSubmit = (e) => {
    e.preventDefault();
    const onSuccess = () => {
      ButterToast.raise({
        content: (
          <Cinnamon.Crisp
            title="Event Notification"
            content="Submitted successfully"
            scheme={Cinnamon.Crisp.SCHEME_PURPLE}
            //icon={<AssignmentTurnedIn />}
          />
        ),
      });
      resetForm();
    };
    if (validate()) {
      // eslint-disable-next-line eqeqeq
      if (props.currentId == 0) {
        props.createEvents(values, onSuccess);
        ButterToast.raise({
          content: (
            <Cinnamon.Crisp
              title="Add Event Notification"
              content="Submitted successfully"
              scheme={Cinnamon.Crisp.SCHEME_PURPLE}
              //icon={<AssignmentTurnedIn />}
            />
          ),
        });
        resetForm();
      } else props.updateEvents(props.currentId, values, onSuccess);
    }
    window.location.reload();
  };

  const reset = (e) => {
    resetForm();
  };

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-200 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-gray-800 text-xl font-bold">
              Add & Edit Events
            </h6>
          </div>
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <br></br>
                  <label
                    className="block uppercase text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Event Name
                  </label>
                  <input
                    type="text"
                    name="eventName"
                    value={values.eventName}
                    onChange={handleInputChange}
                    className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <br></br>
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Event Date
                  </label>
                  <input
                    type="date"
                    name="eventDate"
                    value={values.eventDate}
                    onChange={handleInputChange}
                    className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-wrap">
              <div className="w-full lg:w-12/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Description
                  </label>
                  <textarea
                    type="text"
                    name="description"
                    value={values.description}
                    onChange={handleInputChange}
                    className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                  ></textarea>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <button
                    type="submit"
                    className="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-1 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                  >
                    Confirm
                  </button>
                </div>
              </div>

              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <button
                    type="submit"
                    onClick={() => reset()}
                    className="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-1 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  EventsList: state.eventsReducer.list,
});

const mapActionToProps = {
  createEvents: CreateEvents,
  updateEvents: UpdateEvents,
};

export default connect(mapStateToProps, mapActionToProps)(AddEvent);
