import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import React from 'react';

function Document() {

    const docSize = "a4";
    const docOrientation = "portrait";
    const imgSrcs1x1 = [
        "src/assets/image-1.JPG",
        "src/assets/image-1.JPG",
        "src/assets/image-1.JPG",
        "src/assets/image-1.JPG",
        "src/assets/image-1.JPG",
        "src/assets/image-1.JPG",
        "src/assets/image-1.JPG"
    ]
    const imgSrcs2x2 = [
        "src/assets/image-1.JPG",
        "src/assets/image-1.JPG",
        "src/assets/image-1.JPG",
        "src/assets/image-1.JPG",
        "src/assets/image-1.JPG"
    ]

    const exportToPDF = () => {
        const input = document.getElementById('document');
        html2canvas(input).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF({
                orientation: docOrientation,
                unit: 'mm',
                format: docSize
            });
            pdf.addImage(imgData, 'PNG', 0, 0, 210, 297);
            pdf.save('images.pdf');
        });
    };
    return ( 
        <div className='relative min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4'>
            <div id='document' className='flex flex-wrap content-start bg-white shadow-lg p-6' style={{width: '210mm', height: '297mm'}}>
                {imgSrcs2x2.map((src, index) => (
                    <img 
                        key={index}
                        src={src}
                        alt={`2x2 ID ${index + 1}`}
                        className='border border-black'
                        style={{width: '48mm', height: '48mm'}}
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
                            style={{width: '24mm', height: '24mm'}}
                        />
                    ))}
                </div>
            </div>

            <button onClick={exportToPDF} className='mt-6 bg-blue-500 text-white px-4 py-2 rounded shadow'>
                EXPORT AS PDF
            </button>

        </div>
     );
}

export default Document;