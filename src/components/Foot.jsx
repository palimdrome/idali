import { Footer, FooterCopyright, Button } from "flowbite-react";

function Foot(props) {
    return (
        <Footer className="bg-[#30323d] px-5 py-8 lg:py-4 m-0 rounded-none flex flex-row justify-center gap-3 w-full">
            <Button size='md' className="bg-white text-[#30323d] w-1/2">PREVIEW</Button>
            <Button size='md' className="bg-[#e6af2e] text-[#30323d] w-1/2">EXPORT TO PDF</Button>
        </Footer>

    );
}

export default Foot;