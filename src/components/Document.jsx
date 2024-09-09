import React from 'react';

function Document({ images }) {

    // Restructures user input to get the image sources and the number of 2x2 and 1x1 for each image source
    // Example: 2x2: [["src/image.png", 3]] (Meaning: 3 2x2 copies of image.png)
    // Example: 1x1: [["src/image.png", 6]] (Meaning: 6 1x1 copies of image.png)

    console.table("These are the images passed from Foot to Document: ", images);

    const imageSrcs = (images) => {
        try {
            var collectionOf2x2 = [];
            var collectionOf1x1 = [];
            images[0].forEach((image) => {
                if (image.file) {
                    console.log("More than 1 2x2 and 1x1...");
                    if (image.numOf2x2 > 0) {
                        console.log("More than 1 2x2...");
                        let foo = [image.file, image.numOf2x2];
                        collectionOf2x2.push(foo);
                    };
                    if (image.numOf1x1 > 0) {
                        console.log("More than 1 1x1...");
                        let bar = [image.file, image.numOf1x1];
                        collectionOf1x1.push(bar);
                    };
                };
            });
            console.log("Restructured 2x2 collection: ", collectionOf2x2);
            console.log("Restructured 1x1 collection: ", collectionOf1x1);
            
            return [collectionOf2x2, collectionOf1x1];
        } catch (error) {
            console.error("Error in restructuring user input to get the image sources: ", error);
            return [[], []];
        }
    };

    const [image2x2Srcs, image1x1Srcs] = imageSrcs(images);

    // Dynamically creates image elements of 2x2 images
    const images2x2 = image2x2Srcs.flatMap(([src, count], index) => Array.from({ length: count }, (_, j) => (
        <img
            key={`image2x2-${index}-${j}`}
            src={src}
            alt={`2x2 ID ${index}-${j}`}
            className='border border-black'
            style={{width: '48mm', height: '48mm', borderWidth:'0.0078125mm'}}
        />
    )));

    // Dynamically creates image elements of 1x1 images
    const images1x1 = image1x1Srcs.flatMap(([src, count], index) => Array.from({ length: count }, (_, j) => (
        <img
            key={`image1x1-${index}-${j}`}
            src={src}
            alt={`1x1 ID ${index}-${j}`}
            className='border border-black'
            style={{width: '24mm', height:'24mm', borderWidth: '0.0078125mm'}}
        />
    )));
    
    // Groups 1x1 images into 4 (square)
    const images1x1By4 = [];
    for (let i = 0; i < Math.ceil(images1x1.length / 4); i++) {
        const innerElements = images1x1.slice(i * 4, i * 4 + 4);
        images1x1By4.push(
            <div key={`imageGroup1x1-${i}`} className='flex flex-wrap content-start' style={{ width: '48mm', height: '48mm' }}>
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