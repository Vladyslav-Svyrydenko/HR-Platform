import React, { useEffect, Fragment, useState } from "react";
import useForm from "./useForm";
import * as actions from "../../Redux/actions/team/TeamAction";
import { connect } from "react-redux";
import ButterToast, { Cinnamon } from "butter-toast";
import axios from "axios";
//import { AssignmentTurnedIn } from "@material-ui/icons";


const initialFieldValues = {
  teamName: "",
  participantNumber: "",
  description: "",
};

const AffectTeam = ({ ...props }) => {
  useEffect(() => {
    if (props.currentIdc != 0) {
      setValues({
        ...props.List.find((x) => x._id == props.currentIdc),
      });
      setErrors({});
    }
  }, [props.currentIdc]);

/*  
  var [idc, setIdc] = useState(0);

    const affect = (id)=>{

        idc=id;
        const result = axios.post('http://localhost:8082/teams/affect/'+ idc +'/'+values._id)
            .then(response => setIdc(response.data._id));  

        console.log(result.data); 
          
      }
*/

const validate = () => {
  let temp = { ...errors };
  temp.teamName = values.teamName ? "" : "This field is required.";
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
  } = useForm(initialFieldValues, props.setCurrentIdc);


  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      // eslint-disable-next-line eqeqeq
      if (props.currentIdc == 0 ) {
        props.affectCand(props.currentIdc);
        ButterToast.raise({
          content: (
            <Cinnamon.Crisp
              title="Affected Successfully"
              content="Candidate to Team"
              scheme={Cinnamon.Crisp.SCHEME_PURPLE}
              //icon={<AssignmentTurnedIn />}
            />
          ),
        });
        window.location.reload();
        resetForm();
      } else {
        console.log("NOP");
      }
    }
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
              Affect candidate to a team
            </h6>
          </div>
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <form  onSubmit={handleSubmit} >
            <div className="flex flex-wrap">
              <div className="w-full lg:w-12/12 px-4">
                <div className="relative w-full mb-3">
                  <br></br>
                  <label
                    className="block uppercase text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Team Name
                  </label>
                  <input
                    type="text"
                    name="teamName"
                    value={values._id}
                    onChange={handleInputChange}
                    className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                  />
                </div>
              </div>
  
            </div>

            <div className="flex flex-wrap">
              <div className="w-full lg:w-12/12 px-4">
                <div className="relative w-full mb-3">
                  <br></br>
                  <label
                    className="block uppercase text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Candidate
                  </label>
                  <input
                    type="text"
                    name="teamName"
                    value=""
                    onChange={handleInputChange}
                    className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                  />
                </div>
              </div>
  
            </div>

            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <button
                    type="submit"
                    
                    className="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-3 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                  >
                    Affect 
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
  List: state.teamsReducer.list,
});

const mapActionToProps = {
  affectCand: actions.AffectCand
};

export default connect(mapStateToProps, mapActionToProps)(AffectTeam);
