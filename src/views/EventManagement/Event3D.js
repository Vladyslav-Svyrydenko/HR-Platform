import React, { useState, useRef, useEffect, Fragment } from "react";
import { Canvas, useFrame, extend, useThree } from "react-three-fiber";
import { Link, useHistory } from "react-router-dom";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useTransition, useSpring, a } from "react-spring";
import { connect } from "react-redux";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { AllEvents, DeleteEvents } from "../../Redux/actions/event/EventAction";
import * as THREE from "three";
import "../../assets/styles/Event3D.css";
import DarkMode from "../../components/Theme/Dark";

import IndexNavbar from "components/Navbars/IndexNavbar.js";

extend({ OrbitControls });

//Rooms------------------
const Room = () => {
  const [model, setModel] = useState();

  useEffect(() => {
    new GLTFLoader().load("./Stand1/scene.gltf", setModel);
  }, []);

  return model ? <primitive object={model.scene} /> : null;
};

const Room2 = () => {
  const [model, setModel] = useState();

  useEffect(() => {
    new GLTFLoader().load("./Stand2/scene.gltf", setModel);
  }, []);

  return model ? <primitive object={model.scene} /> : null;
};

//Contols---------------------------
const Controls = () => {
  const { camera, gl } = useThree();
  const orbitRef = useRef();

  useFrame(() => {
    orbitRef.current.update();
  });

  return (
    <orbitControls
      autoRotate
      maxPolarAngle={Math.PI / 3}
      minPolarAngle={Math.PI / 3}
      args={[camera, gl.domElement]}
      ref={orbitRef}
    />
  );
};


const EventView = (props) => {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  useEffect(() => {
    props.fetchAllEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
       <nav className="top-0 fixed z-50 w-full flex flex-wrap items-center justify-between px-1 py-0 navbar-expand-lg bg-white shadow">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <Link
              className="text-gray-700 text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-no-wrap uppercase"
              to="/candidate/dashboard"
            >
              <img
                alt="logo"
                src={require("../../assets/img/logositebig.png")}
                style={{ width: "40px", height: "40px" }}
                className="mr-4"
              />
            </Link>
            <button
              className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <i className="fas fa-bars"></i>
            </button>
          </div>

          <div
            className={
              "lg:flex flex-grow items-center bg-white lg:bg-transparent lg:shadow-none" +
              (navbarOpen ? " block" : " hidden")
            }
            id="example-navbar-warning"
          >
            
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">

              <li className="flex items-center">
                <DarkMode />
                <Link to="/candidate/dashboard">
                  <button
                    className="bg-blue-500 text-white active:bg-blue-600 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150"
                    type="button"
                  >
                    Back
                  </button>{" "}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <section className="header relative  items-center flex h-screen max-h-860-px">
        <div className="container mx-auto items-center flex flex-wrap">
          <div className="w-full md:w-8/12 lg:w-6/12 xl:w-6/12 px-4">
            <div className="pt-16 sm:pt-0">
              <h2 className=" titlelightmode text-HR-title font-semibold text-4xl">
                Event Display in 3D
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-gray-600">
                You can view our upcoming stands for the events 
              </p>
            </div>
          </div>
        </div>
        <div className="absolute  right-0 sm:w-6/12 ">
          <AliceCarousel>
            <Canvas
              camera={{ position: [0, 0, 150] }}
              onCreated={({ gl }) => {
                gl.shadowMap.enabled = true;
                gl.shadowMap.type = THREE.PCFShadowMap;
              }}
            >
              <ambientLight />
              <spotLight position={[0, 5, 10]} penumbra={1} castShadow />

              <Controls />
              <Room />
            </Canvas>

            <Canvas
              camera={{ position: [0, 0, 300] }}
              onCreated={({ gl }) => {
                gl.shadowMap.enabled = true;
                gl.shadowMap.type = THREE.PCFShadowMap;
              }}
            >
              <ambientLight />
              <spotLight position={[0, 5, 10]} penumbra={1} castShadow />

              <Controls />
              <Room2 />
            </Canvas>
          </AliceCarousel>
        </div>
      </section>

<section className="  pb-16 bg-gray-300 relative pt-32">
  <div className=" container mx-auto">
    <div className=" bannerdarkmode flex flex-wrap justify-center bg-white shadow-xl rounded-lg -mt-64 py-16 px-12 relative z-10">
  
          <AliceCarousel>
            {props.EventsList.map((event, index) => {
                  return (
                    <Fragment key={index}>
                    <Card>
                      <Card.Body>
			
                      <div className="w-full text-center lg:w-12/12">
                          <p className="text-4xl text-center"></p>
                          <h3 className="font-semibold text-3xl">
                            {event.eventName}{" "}
                          </h3>
                          <p className="text-gray-600 text-lg leading-relaxed mt-4 mb-4">
                            {event.eventDate.substring(0, 10)}{" "}
                          </p>
                          <p className="text-gray-600 text-lg leading-relaxed mt-4 mb-4">
                            {event.description}{" "}
                          </p>                  
                      </div>
                        
                      </Card.Body>
                    </Card>
                    </Fragment>
                  );
                })}   
            </AliceCarousel>

              </div>
            </div>
      </section>
    </>
  );
};

const style = {
  card: `relative flex flex-col border-2 border-gray-200 rounded-lg`,
  cardBody: `block flex-grow flex-shrink p-5 center`,
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

const mapStateToProps = (state) => ({
  EventsList: state.eventsReducer.list,
});

const mapActionToProps = {
  fetchAllEvents: AllEvents,
};

export default connect(mapStateToProps, mapActionToProps)(EventView);

