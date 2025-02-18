import { Footer, FooterCopyright, Button, Modal } from "flowbite-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useEffect, useState } from "react";
import Document from "./Document";

function Foot({ data, pageSize }) {

    const [openModal, setOpenModal] = useState(false);
    const [documentData, setDocumentData] = useState([]); // State to hold images

    const date = new Date();
    const currentDate = String(date.getMonth()+1).padStart(2,"0") + "-" + String(date.getDate()).padStart(2, '0') + "-" + date.getFullYear() + "-" + date.getHours() + date.getMinutes() + date.getSeconds();

    useEffect(() => {
        if (Array.isArray(data) && data.length > 0) {
            setDocumentData(data); // Update state when data changes
        }
    }, [data]);

    // Deconstructuring the pageSize since its values can't be accessed using dot notation
    const {size, width, height} = pageSize || { size: "a4", width: 210, height: 297 };

    const preferences = {
        docSize: size,
        docWidth: width,
        docHeight: height,
        docOrientation: "portrait",
        numOfCopies: 1,
        images: documentData
    }

    const [imgData, setImgData] = useState("");

    const exportToPDF = () => {
        const input = document.getElementById('document');
        html2canvas(input, {scale: 2}).then(canvas => {
            const imgData = canvas.toDataURL('image/png'); // the whole canvas as image
            const pdf = new jsPDF({
                orientation: preferences.docOrientation,
                unit: 'mm',
                format: preferences.docSize
            });

            const pdfWidth = preferences.docWidth;
            const pdfHeight = preferences.docHeight;

            const canvasWidth = canvas.width;
            const canvasHeight = canvas.height;

            const imgWidth = pdfWidth;
            const imgHeight = (canvasHeight * imgWidth) / canvasWidth;

            if (imgHeight > pdfHeight) {
                pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, pdfHeight);
            } else {
                pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
            }
            pdf.save(`${currentDate}.pdf`);
        });
    };

    const previewDocument = () => {
        const input = document.getElementById('document');
        html2canvas(input, {scale: 2}).then(canvas => {
            const imgData = canvas.toDataURL('image/png'); // the whole canvas as image
            setImgData(imgData);
        }).catch(error => console.error(error));
    };

    return (
        <Footer className="lg:justify-start relative bg-[#30323d] px-5 py-8 lg:py-4 m-0 rounded-none flex flex-row justify-center gap-3 w-full">

            {/* To be hidden from view but still accessible for getElementById */}
            {Array.isArray(documentData) && documentData.length > 0 && (<Document images={preferences.images} />)}

            <Button size='md' className="bg-white text-[#30323d] w-1/2" onClick={() => setOpenModal(true)}>PREVIEW</Button>
            <Modal show={openModal} onClose={() => setOpenModal(false)}>
                <Modal.Header>Preview document</Modal.Header>
                <Modal.Body>
                    <div className="bg-[#30323d] p-1">
                            {previewDocument()}
                            <img src={imgData} alt="Preview of the document" />
                    </div>
                </Modal.Body>
            </Modal>

            <Button size='md' className="bg-[#e6af2e] text-[#30323d] w-1/2" onClick={() => {exportToPDF()}}>EXPORT TO PDF</Button>
        </Footer>

    );
}

export default Foot;