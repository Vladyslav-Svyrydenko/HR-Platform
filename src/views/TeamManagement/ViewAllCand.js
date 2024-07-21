import React, { useEffect, useState, Fragment } from "react";
//import { connect } from "react-redux";
//import * as actions from "../../Redux/actions/team/TeamAction";
import axios from "axios";

const ViewAllCand = (props) => {

  const [currentIdtc, setCurrentIdtc] = useState(0);

  const [data, setData] = useState( [] );

  useEffect (()=>{

    const fetchData = async () => {
      const result = await axios(
        'http://localhost:8082/teams/allcand',
      );
 
      setData(result.data);
      console.log(result.data);

    };
 
    fetchData();

  }, []);


  return (
    <>


          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
            <div className="rounded-t mb-0 px-4 py-3 border-0">
              <div className="flex flex-wrap items-center">
                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                  <h3 className="font-semibold text-base text-gray-800">
                    Candidats
                  </h3>
                </div>
              </div>
            </div>
            <div className="block w-full overflow-x-auto">
            {data.map((cand) => {
                        return (
                          <Fragment key={cand._id}>
                            <option value= {cand._id}>{cand.fullName} </option>
                          </Fragment>
                        );
                      })}
             
            </div>
          </div>
  
    </>
  );
};


export default(ViewAllCand);