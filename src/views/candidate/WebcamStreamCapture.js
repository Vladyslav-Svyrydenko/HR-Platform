import React, { useState } from "react";
import Input from "react-validation/build/input";
import { useDispatch, useSelector } from "react-redux";

import Webcam from "react-webcam";
import { uploadFile } from "../../Redux/actions/hr/hr";
import { AddtestResponse } from "../../Redux/actions/hrtest/hrtest";

const WebcamStreamCapture = () => {
  const [Photos, setPhotos] = useState("");
  const dispatch = useDispatch();

  const webcamRef = React.useRef(null);
  const mediaRecorderRef = React.useRef(null);
  const [capturing, setCapturing] = React.useState(false);
  const [recordedChunks, setRecordedChunks] = React.useState([]);

  const handleStartCaptureClick = React.useCallback(() => {
    setCapturing(true);
    mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
      mimeType: "video/webm",
    });
    mediaRecorderRef.current.addEventListener(
      "dataavailable",
      handleDataAvailable
    );
    mediaRecorderRef.current.start();
  }, [webcamRef, setCapturing, mediaRecorderRef]);

  const handleDataAvailable = React.useCallback(
    ({ data }) => {
      if (data.size > 0) {
        setRecordedChunks((prev) => prev.concat(data));
      }
    },
    [setRecordedChunks]
  );

  const handleStopCaptureClick = React.useCallback(() => {
    mediaRecorderRef.current.stop();
    setCapturing(false);
  }, [mediaRecorderRef, webcamRef, setCapturing]);

  const handleDownload = React.useCallback(() => {
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, {
        type: "video/webm",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      document.body.appendChild(a);
      a.style = "display: none";
      a.href = url;
      a.download = "react-webcam-stream-capture.webm";
      a.click();
      window.URL.revokeObjectURL(url);
      setRecordedChunks([]);
    }
  }, [recordedChunks]);

  const [video, setVideo] = useState("");

  const onChangeVideo = (e) => {
    const file = e.target.files[0]; // accesing file
    console.log(file);
    setVideo(file);
  };
  const onChangePhotos = (e) => {
    const file = e.target.files[0]; // accesing file
    setPhotos(file);
  };

  const clickEnvoyer = (e) => {
    e.preventDefault();

    dispatch(uploadFile(Photos))
      .then(() => {})
      .catch(() => {
        //setSuccessful(false);
      });

    console.log("user ", JSON.parse(localStorage.getItem("user")).id);

    dispatch(
      AddtestResponse(
        Photos.name,
        JSON.parse(localStorage.getItem("user")).id,
        localStorage.getItem("idTestc")
      )
    )
      .then(() => {})
      .catch(() => {
        //setSuccessful(false);
      });
  };

  return (
    <>
      <Webcam audio={false} ref={webcamRef} />

      <div class="space-y-8 mb-6">
        <div class="m-6 space-x-3 space-y-3"></div>
        {capturing ? (
          <button
            className="bg-red-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            onClick={handleStopCaptureClick}
          >
            Stop Capture
          </button>
        ) : (
          <button
            className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            onClick={handleStartCaptureClick}
          >
            Start Capture
          </button>
        )}
        {recordedChunks.length > 0 && (
          <button onClick={handleDownload}> Download </button>
        )}

        <button
          className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
          onClick={clickEnvoyer}
        >
          Envoyer{" "}
        </button>
        <input type="file" onChange={onChangePhotos}></input>
      </div>
    </>
  );
};

export default WebcamStreamCapture;

// https://www.npmjs.com/package/react-webcam
