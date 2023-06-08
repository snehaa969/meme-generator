import React, { useRef, useState } from 'react';
import { Stage, Layer, Image as KImage } from 'react-konva';
import useImage from 'use-image';

const MyImage = () => {
    const [image] = useImage('/1bhk.jpg');
    return <KImage image={image} />;
};



const URLImage = ({ src, x, y }) => {

    const [image, setImage] = useState(null);
    const imageNode = useRef(null);

    const loadImage = () => {
        // save to "this" to remove "load" handler on unmount
        let img = new Image();
        img.src = src;
        img.addEventListener('load', setImage(img));
    }

    return <KImage
        x={x}
        y={y}
        image={image}
        ref={imageNode}
    />
}

const Generator = () => {
    return (
        <div>
            <Stage width={window.innerWidth} height={window.innerHeight}>
                <Layer>
                    <URLImage src="https://konvajs.org/assets/yoda.jpg" x={150} />
                    <MyImage />
                </Layer>
            </Stage>
        </div>
    )
}

export default Generator