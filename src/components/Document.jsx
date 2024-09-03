import React from 'react';

function Document({ imgSrcs2x2, imgSrcs1x1 }) {
    return (
        <div className='relative w-1/2 min-h-screen flex flex-col items-center overflow-auto justify-center bg-gray-100 p-4 lg:block'
        style={{position: 'absolute', top: '-9999px', left:'-9999px'}}>
            <div id='document' className='flex flex-wrap content-start bg-white shadow-lg p-6' style={{width: '210mm', height: '297mm'}}>
                {imgSrcs2x2.map((src, index) => (
                    <img 
                        key={index}
                        src={src}
                        alt={`2x2 ID ${index + 1}`}
                        className='border border-black'
                        style={{width: '48mm', height: '48mm', borderWidth: '0.0078125mm'}}
                    />
                ))}
                <div
                    className='flex flex-wrap content-start'
                    style={{width: `${Math.ceil(imgSrcs1x1.length / 4) * 48}mm`, height: '48mm'}}
                >
                    {imgSrcs1x1.map((src, index) => (
                        <img
                            key={index}
                            src={src}
                            alt={`1x1 ID ${index + 1}`}
                            className='border border-black'
                            style={{width: '24mm', height: '24mm', borderWidth: '0.0078125mm'}}
                        />
                    ))}
                </div>
            </div>
        </div>
     );
}

export default Document;