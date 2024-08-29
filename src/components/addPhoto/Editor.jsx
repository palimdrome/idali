import React from 'react';
import PhotoDetails from './PhotoDetails';
import { Button } from 'flowbite-react';
import { MdAdd } from "react-icons/md";

function AddPhotoButton() {
    return (
        <Button color="white" className='w-full shadow-lg'>
            <MdAdd className="mr-2 h-5 w-5" />
            ADD A PHOTO
        </Button>
    )
}

function Editor() {
    return ( 
        <div className='w-[85%] flex flex-col items-center gap-5'>
            <PhotoDetails></PhotoDetails>
            <AddPhotoButton></AddPhotoButton>
        </div>
     );
}

export default Editor;