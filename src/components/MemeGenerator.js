import React, { useRef, useState } from "react";
import { Stage, Layer, Image as KImage, Text } from "react-konva";
import useImage from "use-image";
import app_config from "../config";

const { api_url, templates } = app_config;

const MyImage = ({ x, y, width, height, imgPath }) => {
  const [image] = useImage(imgPath);
  return <KImage image={image} />;
};
const URLImage = ({ src, x, y, width, height }) => {
  const [image, setImage] = useState(null);
  const imageNode = useRef(null);

  const loadImage = () => {
    // save to "this" to remove "load" handler on unmount
    let img = new Image();
    img.src = src;
    img.addEventListener("load", setImage(img));
  };

  return (
    <KImage
      x={x}
      y={y}
      width={width}
      height={height}
      image={image}
      ref={imageNode}
    />
  );
};

const MemeText = ({ text, x, y }) => {
  return (
    <Text x={x} y={y} text={text} fontFamily={"Montserrat"} fontSize={50} />
  );
};

const MemeGenerator = () => {
  const [selTemplate, setSelTemplate] = useState(null);

  const updateText = (value, index) => {
    // console.log(value, index);
    let newTemplate = {...selTemplate};
    newTemplate.texts[index].text = value;
    setSelTemplate(newTemplate);

  }

  const exportImage = () => {
    let stage = document.getElementsByTagName("canvas")[0];
    let image = stage.toDataURL("image/png");
    let link = document.createElement("a");
    link.download = "meme.png";
    link.href = image;
    link.click();
  }

  return (
    <div className="py-4">
      <div className="row">
        <div className="col-md-2">
          <div className="card">
            <div
              className="card-body"
              style={{ height: "80vh", overflow: "auto" }}
            >
              {templates.map((template) => (
                <div className="mb-3">
                  <img
                    className="d-block w-100"
                    src={"/memetemplates/" + template.file}
                    alt=""
                  />
                  <div className="d-flex justify-content-between mt-2">
                    <h4>{template.name}</h4>
                    <button
                      onClick={(e) => setSelTemplate(template)}
                      className="d-block btn btn-primary btn-sm ml-auto"
                    >
                      Use
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">
              <button onClick={exportImage}>Export Your Meme</button>
            </div>
            <div className="card-body">
              <Stage width={window.innerWidth} height={window.innerHeight}>
                <Layer>
                  {/* <URLImage src="https://konvajs.org/assets/yoda.jpg" x={150} y={150} width={800} height={600} /> */}
                  {selTemplate !== null && (
                    <MyImage
                      x={150}
                      y={150}
                      width={800}
                      height={600}
                      imgPath={"/memetemplates/" + selTemplate.file}
                    />
                  )}
                  {
                    selTemplate !== null && selTemplate.texts.map(({coords, text}, index) => (
                      <MemeText x={coords[0]} y={coords[1]} text={text} />
                    ))
                  }
                </Layer>
              </Stage>
            </div>
          </div>
        </div>
        <div className="col-md-2">
          <div className="card">
            <div className="card-header">Add Text to Meme</div>
            <div className="card-body">
              {selTemplate !== null &&
                selTemplate.texts.map(({coords, text}, index) => (
                  <div className="mb-3">
                    <label>Text : {index+1}</label>
                    <input type="text" className="form-control" value={text} onChange={e => updateText(e.target.value, index)} />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemeGenerator;
