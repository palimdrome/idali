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
        html2canvas(input, {scale: 2}).then(canvas => {
            const imgData = canvas.toDataURL('image/png'); // the whole canvas as image
            const pdf = new jsPDF({
                orientation: docOrientation,
                unit: 'mm',
                format: docSize
            });

            const pdfWidth = 210;
            const pdfHeight = 297;

            const canvasWidth = canvas.width;
            const canvasHeight = canvas.height;

            const imgWidth = pdfWidth;
            const imgHeight = (canvasHeight * imgWidth) / canvasWidth;

            if (imgHeight > pdfHeight) {
                pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, pdfHeight);
            } else {
                pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
            }
            pdf.save('images.pdf');
        });
    };
    return (
        <div className='relative w-1/2 min-h-screen flex flex-col items-center overflow-auto justify-center bg-gray-100 p-4 hidden lg:block'>
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

            <button onClick={exportToPDF} className='mt-6 bg-blue-500 text-white px-4 py-2 rounded shadow'>
                EXPORT AS PDF
            </button>

        </div>
     );
}

export default Document;