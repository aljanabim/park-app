const cameraSelect = document.getElementById("camera-select");
const videoHolder = document.querySelector("video");
const snapBtn = document.getElementById("snap");
const clearBtn = document.getElementById("clear");
const sendBtn = document.getElementById("send");
const video = document.querySelector("video");
const canvas = document.getElementById("canvas");
const capturedImg = document.getElementById("capturedImg");
let streamWidth, streamHeight;
snapBtn.style.display = "none";
clearBtn.style.display = "none";
sendBtn.style.display = "none";
// navigator.mediaDevices.enumerateDevices().then((devices) => {
//   console.log(devices);
//   const cameras = devices.filter((device) => {
//     return device.kind === "videoinput";
//   });

//   console.log(cameras);
// });

const cameras = [
  { deviceId: "none", label: "Select Camera" },
  { deviceId: "front", label: "FrontCam" },
  { deviceId: "rear", label: "RearCam" },
];

const cameraOptions = cameras.map((cameraDevice) => {
  return `<option value="${cameraDevice.deviceId}">${cameraDevice.label}</option>`;
});

cameraSelect.innerHTML = cameraOptions.join("");

const constraintsNone = { audio: false, video: false };
const constraintsFront = { audio: false, video: { facingMode: "user" } };
const constraintsRear = {
  audio: false,
  video: {
    facingMode: {
      exact: "environment",
    },
  },
};

cameraSelect.addEventListener("change", (e) => {
  const cameraType = e.target.value;
  videoHolder.style.display = "block";
  snapBtn.style.display = "none";
  if (cameraType === "front") {
    activateCamera(constraintsFront);
  } else if (cameraType === "rear") {
    activateCamera(constraintsRear);
  } else {
    videoHolder.style.display = "none";
  }
});

const activateCamera = (constraints) => {
  navigator.mediaDevices
    .getUserMedia(constraints)
    .then((stream) => {
      console.log(stream);
      video.srcObject = stream;
    })
    .catch((err) => {
      videoHolder.style.display = "none";
      console.log(err);
    });
};

video.addEventListener("canplay", (e) => {
  snapBtn.style.display = "inline";
  clear.style.display = "none";
  send.style.display = "none";
});

snapBtn.addEventListener("click", (e) => {
  snapBtn.style.display = "none";
  clear.style.display = "inline";
  send.style.display = "inline";
  const imgData = snapPicture();
  console.log(imgData);
  e.preventDefault();
});
clearBtn.addEventListener("click", (e) => {
  snapBtn.style.display = "inline";
  clear.style.display = "none";
  send.style.display = "none";
  clearPicture();
  e.preventDefault();
});

const snapPicture = () => {
  const context = canvas.getContext("2d");
  canvas.width = 120;
  canvas.height = 120;
  console.log(video.width);
  context.drawImage(video, 0, 0, canvas.width, canvas.height);
  const imgData = canvas.toDataURL("image/png");
  return imgData;
  //   capturedImg.setAttribute("src", imgData);
};

const clearPicture = () => {
  const context = canvas.getContext("2d");
  context.clearRect(0, 0, canvas.width, canvas.height);
};
