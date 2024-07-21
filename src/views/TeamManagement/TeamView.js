import React, { useEffect, useState, Fragment } from "react";
import { connect } from "react-redux";
import * as actions from "../../Redux/actions/team/TeamAction";
import AddTeam from "./AddTeam";
import ButterToast, { Cinnamon } from "butter-toast";
import AffectTeam from "./AffectTeam";
import ViewAllCand from "./ViewAllCand";
import axios from "axios";
import TeamStats from "components/TeamStats/TeamStats";

const ViewTeam = (props) => {
  const [currentId, setCurrentId] = useState(0);


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

  useEffect(() => {
    props.fetchAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onDelete = (id) => {
      const onSuccess = () => {
        ButterToast.raise({
          content: (
            <Cinnamon.Crisp
              title="Team Deleted Successfully"
              content="Delete Notification"
              scheme={Cinnamon.Crisp.SCHEME_PURPLE}
              //icon={<DeleteSweep />}
            />
          ),
        });
      };
      if (window.confirm("Are you sure to delete this Team ?"))
        props.deleteTeams(id, onSuccess);
  };

  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full lg:w-8/12 px-4">

          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
            <div className="rounded-t mb-0 px-4 py-3 border-0">
              <div className="flex flex-wrap items-center">
                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                  <h3 className="font-semibold text-base text-gray-800">
                    Teams
                  </h3>
                </div>
              </div>
            </div>
            <div className="block w-full overflow-x-auto">
              {/* Projects table */}
              <table className="items-center w-full bg-transparent border-collapse">
                <thead>
                  <tr>
                    <th className="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                      Team Name
                    </th>
                    <th className="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                      Numbers
                    </th>
                    <th className="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                      Description
                    </th>
                    <th className="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                    </th>
                    <th className="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left"></th>
                  </tr>
                </thead>
                <tbody>
                  {props.TeamsList.map((team, index) => {
                    return (
                      <Fragment key={index}>
                        <tr>
                          <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-left">
                            {team.teamName}{" "} 
                          </th>
                          <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-left">
                            {team.participantNumber}{" "}
                          </th>
                          <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-left">
                            {team.description}{" "}
                          </th>

                        <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-left">
                          
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"  onClick={() => setCurrentId(team._id)} >
                            <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                            <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
                          </svg>
                          
                          </th>
                          <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-left">

                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"  onClick={() => onDelete(team._id)} >
                              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            
                          </th> 


                        </tr>
                      </Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
            <div className="rounded-t mb-0 px-4 py-3 border-0">
              <div className="flex flex-wrap items-center">
                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                  <h3 className="font-semibold text-base text-gray-800">
                    Teams Chart
                  </h3>
                </div>
              </div>
            </div>
            <div className="block w-full overflow-x-auto">
                  <TeamStats />
            </div>
          </div>
          
        </div>

        <div className="w-full lg:w-4/12 px-4">
          <AddTeam {...{ currentId, setCurrentId }} />
          
        </div>
      </div>
  
    </>
  );
};

const mapStateToProps = (state) => ({
  TeamsList: state.teamsReducer.list,
});

const mapActionToProps = {
  fetchAll: actions.AllTeams,
  deleteTeams: actions.DeleteTeams,
};

export default connect(mapStateToProps, mapActionToProps)(ViewTeam);