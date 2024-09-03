import React from 'react';
import { useState, useEffect } from 'react';
import PhotoDetails from './PhotoDetails';
import { Button } from 'flowbite-react';
import { MdAdd } from "react-icons/md";

function AddPhotoButton({ count }) {
    return (
        <Button color='light' className={`w-full ${count > 0? 'lg:w-3/5 shadow-lg': 'hidden'}`}>
            <MdAdd className="mr-2 h-5 w-5" />
            ADD A PHOTO
        </Button>
    )
}

function Editor() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        console.log(`Count has changed to: ${count}`);
    }, [count]);

    return ( 
        <div className='lg:w-1/2 overflow-y-auto flex flex-col justify-center items-center gap-5 p-4 lg:bg-camera-pattern lg:bg-contain'>
            <PhotoDetails count={count} setCount={setCount}></PhotoDetails>
            <AddPhotoButton count={count}></AddPhotoButton>
        </div>
     );
}

export default Editor;