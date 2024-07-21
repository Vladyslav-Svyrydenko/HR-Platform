import React, { useEffect, useState, Fragment } from "react";
import { connect } from "react-redux";
import { AllEvents, DeleteEvents } from "../../Redux/actions/event/EventAction";
import AddEvents from "./AddEvents";
import ButterToast, { Cinnamon } from "butter-toast";
import AliceCarousel from "react-alice-carousel";
import { forwardRef } from 'react';

const ViewEvent = (props) => {
  const [currentId, setCurrentId] = useState(0);

  useEffect(() => {
    props.fetchAllEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onDelete = (id) => {
    const onSuccess = () => {
      ButterToast.raise({
        content: (
          <Cinnamon.Crisp
            title="Delete Notification"
            content="Deleted successfully"
            scheme={Cinnamon.Crisp.SCHEME_PURPLE}
            //icon={<DeleteSweep />}
          />
        ),
      });
    };
    if (window.confirm("Are you sure to delete this event ?"))
      props.deleteEvents(id, onSuccess);
  };

  return (
    <>
      <div className="flex flex-wrap">
      

        
  <div className="w-full lg:w-8/12 px-4">
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-200 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-gray-800 text-xl font-bold">
              Events
            </h6>
          </div>
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          
            <div className="flex flex-wrap">
            <AliceCarousel>
              {props.EventsList.map((event, index) => {
                    return (
                      <Fragment key={index}>
                      <Card>
                        <Card.Body>
                          <Card.Title>{event.eventName} : {event.eventDate.substring(0, 10)}</Card.Title>
                          <Card.Text>
                            {event.description}
                          </Card.Text>
                          <br></br>
                          <div className="space-x-4 mb-4 md:space-x-6 space-y-3 pd">
                            <Button color="primary" size="sm" rounded onClick={() => setCurrentId(event._id)}>Edit</Button>  
                            <Button color="danger"  size="sm"  rounded onClick={() => onDelete(event._id)}>Delete</Button>  
                          </div>

                          <div className="space-x-2 mb-4 md:space-x-6 space-y-3">
                            
                          </div>
                          
                        </Card.Body>
                      </Card>
                      </Fragment>
                    );
                  })}
                
              </AliceCarousel>
            </div>


      
        </div>
      </div>
    </div>

        <div className="w-full lg:w-4/12 px-4">
          <AddEvents {...{ currentId, setCurrentId }} />
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  EventsList: state.eventsReducer.list,
});

const mapActionToProps = {
  fetchAllEvents: AllEvents,
  deleteEvents: DeleteEvents,
};

const style = {
  card: `relative flex flex-col border-2 border-gray-200 rounded-lg`,
  cardBody: `block flex-grow flex-shrink p-5`,
  cardTitle: `font-medium text-gray-700 mb-3`,
  cardText: `text-black-500`,
};
const inlineStyle = {
  boxShadow: '0 2px 5px 0 rgb(0 0 0 / 16%), 0 2px 10px 0 rgb(0 0 0 / 12%)',
};
const Card = ({ children }) => (
  <div className={style.card} style={inlineStyle}>
    {children}
  </div>
);

Card.Body = ({ children }) => <div className={style.cardBody}>{children}</div>;
Card.Title = ({ children }) => (<div className={style.cardTitle}>{children}</div>);
Card.Text = ({ children }) => <div className={style.cardText}>{children}</div>;

const Button = forwardRef(({ children, color,size,rounded, ...props }, ref) => (
  <button
    {...props}
    ref={ref}
    className={`
                ${colors[color]} ${ size ? sizes[size] : sizes.md} text-black focus:outline-none shadow rounded font-medium transition ease-in duration-200,
                ${colors[color]} ${ rounded ? 'rounded-full' : 'rounded' } text-white focus:outline-none shadow px-4 py-2 font-medium transition ease-in duration-200 `}
  >
    {children}
  </button>
));
const colors = {
  primary: `bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 focus:ring-offset-blue-100`,
  success: `bg-green-700 focus:ring-2 focus:ring-offset-2 focus:ring-green-700 focus:ring-offset-green-100`,
  danger: `bg-red-600 focus:ring-2 focus:ring-offset-2 focus:ring-red-600 focus:ring-offset-red-100`,
  dark: `bg-black focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 focus:ring-offset-gray-100`,
  warning: `bg-yellow-500 focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 focus:ring-offset-yellow-100`,
  indigo: `bg-indigo-900 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-900 focus:ring-offset-indigo-100`,
};
const sizes = {
  sm: 'px-6 py-1 text-sm',
  md: 'px-6 py-2',
  lg: 'px-6 py-3 text-lg',
};

export default connect(mapStateToProps, mapActionToProps)(ViewEvent);