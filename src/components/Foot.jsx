import { Footer, FooterCopyright, Button } from "flowbite-react";

function Foot(props) {
    return (
        <Footer className="bg-[#30323d] px-5 py-8 rounded-none">
            <div className='flex flex-row justify-center gap-3 w-full'>
                <Button size='lg' className="btn bg-white text-[#30323d] w-1/2">PREVIEW</Button>
                <Button size='lg' className="btn bg-[#e6af2e] text-[#30323d] w-1/2">EXPORT TO PDF</Button>
            </div>
        </Footer>

    );
}

export default Foot;