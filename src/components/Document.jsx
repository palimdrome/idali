import React from 'react';

function Document({ images }) {

    // Restructures user input to get the image sources and the number of 2x2 and 1x1 for each image source
    // Example: 2x2: [["src/image.png", 3]] (Meaning: 3 2x2 copies of image.png)
    // Example: 1x1: [["src/image.png", 6]] (Meaning: 6 1x1 copies of image.png)
    const imageSrcs = () => {
        let collectionOf2x2 = [];
        let collectionOf1x1 = [];
        images.map((image) => {
            if (image.numOf2x2 > 0 || image.numOf1x1 > 0) {
                if (image.numOf2x2 > 0) {
                    let foo = [image.url, image.numOf2x2];
                    collectionOf2x2.push(foo);
                };
                if (image.numOf1x1 > 0) {
                    let bar = [image.url, image.numOf1x1];
                    collectionOf1x1.push(bar);
                };
            };
        });
        return [collectionOf2x2, collectionOf1x1];
    };

    // Dynamically creates image elements of 2x2 images
    const images2x2 = [];
    for (let i = 0; i < imageSrcs()[0].length; i++) {
        for (let j = 0; j < imageSrcs()[0][i][1]; j++) {
            images2x2.push(
                <img 
                    key={`image2x2-${i}-${j}`}
                    src={imageSrcs()[0][i][0]}
                    alt={`2x2 ID ${i}-${j}`}
                    className='border border-black'
                    style={{width: '48mm', height: '48mm', borderWidth: '0.0078125mm'}}
                />
            )
        }
    }

    // Dynamically creates image elements of 1x1 images
    const images1x1 = [];
    for (let i = 0; i < imageSrcs()[1].length; i++) {
        for (let j = 0; j < imageSrcs()[1][i][1]; j++) {
            images1x1.push(
                <img 
                    key={`image1x1-${i}-${j}`}
                    src={imageSrcs()[1][i][0]}
                    alt={`2x2 ID ${i}-${j}`}
                    className='border border-black'
                    style={{width: '24mm', height: '24mm', borderWidth: '0.0078125mm'}}
                />
            )
        }
    };
    
    // Groups 1x1 images into 4 (square)
    const images1x1By4 = [];
    for (let i = 0; i < Math.ceil(images1x1.length / 4); i++) {
        const innerElements = [];
        let j = 0;
        while (j < 4 && i * 4 + j < images1x1.length) {
            innerElements.push(images1x1[j]);
            j++;
        };
        images1x1By4.push(
            <div key={`imageGroup1x1-${i}-${j}`} className='flex flex-wrap content-start' style={{width: '48mm', height: '48mm'}}>
                {innerElements}
            </div>
        );
    }

    return (
        <div className='relative w-1/2 min-h-screen flex flex-col items-center overflow-auto justify-center bg-gray-100 p-4 lg:block'
        style={{position: 'absolute', top: '-9999px', left:'-9999px'}}>
            <div id='document' className='flex flex-wrap content-start bg-white shadow-lg p-6' style={{width: '210mm', height: '297mm'}}>
                {images2x2}
                {images1x1By4}
            </div>
        </div>
     );
}

export default Document;