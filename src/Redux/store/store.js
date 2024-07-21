import { combineReducers, createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { fetchJobs } from "../actions/job.actions";

import userReducer from "../reducers/userReducers";
import hrReducer from "../reducers/hrReducers";
import candidateReducer from "../reducers/candidateReducers";
import { AllEvents } from "../actions/event/EventAction";
import eventsReducer from "../reducers/eventReducers/EventReducer";
import jobs from "../reducers/jobReducers/job.reducer";
import { fetchAllJobs } from "Redux/actions/allJobs/allJobs";
import alljobs from "../reducers/jobReducers/allJobsReducer";
import jobDetail from "../reducers/jobReducers/JobDetail";
import submittedjobs from "../reducers/jobReducers/submitJobReducer";
import { fetchJobDetails } from "Redux/actions/jobDetails/jobDetailsAction";
import { fetchSubmittedJobs } from "Redux/actions/submittedJobs/submittedJob.action";
import { fetchRecomJobs } from "Redux/actions/recomJob/recomJob.action";
import jobRecom from "../reducers/jobReducers/recomJobReducer";
import similarjobs from "../reducers/jobReducers/similarJobReducer";
import { fetchSimilarJobs } from "Redux/actions/smiliarJobs/similar.action";
import teamsReducer from "../reducers/teamReducers/TeamReducer";
import candidate from "../reducers/candidateReducers/candidate";
import testReducers from "../reducers/testReducers";
import { findallHrTest } from "../actions/hrtest/hrtest";

const middleware = [thunk];

const rootReducer = combineReducers({
  testReducers,
  userReducer,
  hrReducer,
  candidateReducer,
  eventsReducer,
  jobData: jobs,
  jobsData: alljobs,
  jobDetailData: jobDetail,
  jobSubmitted: submittedjobs,
  RecomJob: jobRecom,
  SimilarJob: similarjobs,
  teamsReducer,
});
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);
store.dispatch(findallHrTest());
store.dispatch(fetchJobs());

store.dispatch(AllEvents());
store.dispatch(fetchSubmittedJobs());
store.dispatch(fetchRecomJobs());
store.dispatch(fetchSimilarJobs());

store.dispatch(fetchJobs());

store.dispatch(fetchJobDetails());

store.dispatch(fetchAllJobs());

export default store;
