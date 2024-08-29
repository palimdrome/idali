import React from 'react';
import PhotoDetails from './PhotoDetails';
import { Button } from 'flowbite-react';
import { MdAdd } from "react-icons/md";

function AddPhotoButton() {
    return (
        <Button color='light' className='w-full lg:w-3/5 shadow-lg'>
            <MdAdd className="mr-2 h-5 w-5" />
            ADD A PHOTO
        </Button>
    )
}

function Editor() {
    return ( 
        <div className='lg:w-1/2 overflow-y-auto flex flex-col items-center gap-5 p-4'>
            <PhotoDetails></PhotoDetails>
            <AddPhotoButton></AddPhotoButton>
        </div>
     );
}

export default Editor;