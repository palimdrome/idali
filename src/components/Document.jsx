import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import React from 'react';

function Document() {

    const docSize = "a4";
    const docOrientation = "portrait";
    const imgSrcs = [
        "src/assets/image-1.JPG",
        "src/assets/image-2.JPG",
        "src/assets/image-3.JPG",
        "src/assets/image-3.JPG"
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
        <div className='w-1/2 lg:w-1/2 flex flex-col items-center overflow-auto justify-center p-4 hidden lg:block'>
            <div id='document' className='relative bg-white shadow-lg' style={{width: '210mm', height: '297mm'}}>
                {imgSrcs.map((src, index) => (
                    <img 
                        key={index}
                        src={src}
                        alt={`2x2 ID ${index + 1}`}
                        className='absolute border border-black'
                        style={{width: '48mm',
                                height: '48mm',
                                left: `${index *48}mm`,
                                top: '10mm'
                            }}
                    />
                ))}
            </div>

            <button onClick={exportToPDF} className='mt-6 bg-blue-500 text-white px-4 py-2 rounded shadow'>
                EXPORT AS PDF
            </button>

        </div>
     );
}

export default Document;