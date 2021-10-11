// import * as faceApi from "face-api.js";
// import React, { useState, useEffect } from 'react';

// class FaceApi extends React.Component {
  

// }
// export default FaceApi;
import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import faceApi from "face-api.js";
import { useMutation } from "react-admin";
import { startOfYesterday } from "date-fns";
//import '@tensorflow/tfjs-node';
import "./styles.css";
//const [refetch] = useListContext()
//useeffect(refetch,[some value that ])
//setInterval(() => alert('째깍'), 10000);
const ImageDetection = ({ record }) => {
  const [mutate, { loading }] = useMutation();
  const [date, setDate] = useState();
  const send = (picture) =>
    mutate({
      type: "create",
      resource: "accessusers",
      payload: {
        data: { photourl: picture, time: date.toISOString() }
      }
    });
    const displayWidth = 450;
    const displayHeight = 360;
    const [pic, setPic] = useState();
    const [initialized, setInitialized] = useState(false);
    const canvasRef = useRef();
    const videoRef = useRef();
  
    const option = new faceApi.TinyFaceDetectorOptions({
      inputSize: 256,
      scoreThreshold: 0.8
    });
    useEffect(() => {
      const models = async () => {
        Promise.all([faceApi.nets.tinyFaceDetector.load("/models/")]).then(
          setupVideo
        );
        setInitialized(true);
      };
      models();
    }, []);
    async function extractFaces(Image, box) {
      if (box) {
        const extractRegions = [
          new faceApi.Rect(box.x, box.y, box.width, box.height)
        ];
        let faceImages = await faceApi.extractFaces(Image, extractRegions);
        faceImages.forEach((canvas) => {
          setPic(canvas.toDataURL());
        });
        send(canvas.toDataURL())
      }
    }
    const setupVideo = () => {
      navigator.mediaDevices
        .getUserMedia({
          video: { facingMode: "user" }
        })
        .then((stream) => (videoRef.current.srcObject = stream));
      // navigator.getUserMedia().then(stream => videoRef.current.srcObject = stream).catch(console.log)
    };
    const videoSize = {
      width: displayWidth,
      height: displayHeight
    };
    const VideoPlay = () => {
      setInterval(async () => {
        if (initialized) {
          setInitialized(false);
        }
        canvasRef.current.innerHTML = faceApi.createCanvasFromMedia(
          videoRef.current
        );
        faceApi.matchDimensions(canvasRef.current, videoSize);
  
        const detections = await faceApi.detectAllFaces(videoRef.current, option);
  
        if (detections[0]) {
          extractFaces(videoRef.current, detections[0].box);
        }
        const resizedDectect = faceApi.resizeResults(detections, videoSize);
        canvasRef.current
          .getContext("2d")
          .clearRect(0, 0, displayWidth, displayHeight);
        faceApi.draw.drawDetections(canvasRef.current, resizedDectect);
        const box = { x: 161, y: 180, width: 128, height: 128 };
        // see DrawBoxOptions below
        const drawOptions = {
          label: "Put Your Face Here",
          lineWidth: 5
        };
        const drawBox = new faceApi.draw.DrawBox(box, drawOptions);
        drawBox.draw(canvasRef.current);
      }, 4000);
    };
    // styling to css file? or other methods
    return (
      <div>
        <h1>Hello</h1>
        <div className="Videodiv">
          <video
            className="Video"
            height={displayWidth}
            width={displayWidth}
            ref={videoRef}
            autoPlay
            muted
            onPlay={VideoPlay}
          />
          <canvas className="Canvas" ref={canvasRef} />
        </div>
        <br></br>
        <img className="Canvas" src={pic} />
      </div>
    );

};

export default ImageDetection;