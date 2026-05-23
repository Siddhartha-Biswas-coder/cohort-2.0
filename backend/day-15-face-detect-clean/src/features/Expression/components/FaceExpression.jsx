import { useEffect, useRef, useState } from "react";
import {
  FaceLandmarker,
  FilesetResolver,
} from "@mediapipe/tasks-vision";

export default function FaceExpression() {
  const videoRef = useRef(null);
  const [expression, setExpression] = useState("Neutral 😐");

  useEffect(() => {
    let faceLandmarker;
    let animationId;

    async function setup() {
      const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/wasm"
      );

      faceLandmarker = await FaceLandmarker.createFromOptions(
        vision,
        {
          baseOptions: {
            modelAssetPath:
              "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
          },
          outputFaceBlendshapes: true,
          runningMode: "VIDEO",
          numFaces: 1,
        }
      );

      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });

      videoRef.current.srcObject = stream;

      await videoRef.current.play();

      detect();
    }

    function detect() {
      if (!videoRef.current || !faceLandmarker) return;

      const results = faceLandmarker.detectForVideo(
        videoRef.current,
        performance.now()
      );

      if (
        results.faceBlendshapes &&
        results.faceBlendshapes.length > 0
      ) {
        const blendshapes =
          results.faceBlendshapes[0].categories;

        const smile =
          blendshapes.find(
            (b) => b.categoryName === "mouthSmileLeft"
          )?.score || 0;

        const mouthOpen =
          blendshapes.find(
            (b) => b.categoryName === "jawOpen"
          )?.score || 0;

        if (smile > 0.5) {
          setExpression("Happy 😀");
        } else if (mouthOpen > 0.6) {
          setExpression("Surprised 😲");
        } else {
          setExpression("Neutral 😐");
        }
      }

      animationId = requestAnimationFrame(detect);
    }

    setup();

    return () => {
      cancelAnimationFrame(animationId);

      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject
          .getTracks()
          .forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        width="600"
      />

      <h2>{expression}</h2>
    </div>
  );
}