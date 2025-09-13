import React, { useState, useEffect } from 'react';
import PhotoDetails from './PhotoDetails';
import { Button, Dropdown, Label } from 'flowbite-react';
import { MdAdd } from 'react-icons/md';

function AddPhotoButton({ onAddPhoto, disabled }) {
  return (
    <Button
      color="light"
      className="w-full lg:w-1/4 border-0 shadow-lg shadow-zinc-400"
      onClick={onAddPhoto}
      disabled={disabled}
    >
      <MdAdd className="mr-2 h-5 w-5" />
      ADD A PHOTO
    </Button>
  );
}

function Editor({ onInput, onSet }) {
  const [photoDetailsList, setPhotoDetailsList] = useState([
    { id: Date.now(), hasFile: false },
  ]);

  const [pageSize, setPageSize] = useState({
    size: "a4",
    width: 210,
    height: 297
  });

  useEffect (() => {
    console.log("Page size updated:", pageSize.size);
  }, [pageSize]);

  // Function containing dropdwon component to set the page size of the document
  function ConfigPaperSettings({ defaultPageSizeLabel }) {
    const customTheme = {
      floating: {
        target: 'bg-[#30323d] text-white hover:bg-blue-600',
      },
    };

    return (
      <div className="flex items-center space-x-2 w-1/2 px-1">
        <Label htmlFor="paper-size">Paper Size:</Label>

        {/* Dropdown with selected option as label */}
        <Dropdown label={defaultPageSizeLabel} theme={customTheme}>
          <Dropdown.Item onClick={() => setPageSize({size: "a4", width: 210, height: 297})}>A4</Dropdown.Item>
          <Dropdown.Item onClick={() => setPageSize({size: "letter", width: 216, height: 279})}>Letter</Dropdown.Item>
          <Dropdown.Item onClick={() => setPageSize({size: "legal", width: 216, height: 356})}>Legal</Dropdown.Item>
        </Dropdown>
      </div>
    );
  }

  // Function to add a new PhotoDetails component
  const handleAddPhoto = () => {
    const lastPhoto = photoDetailsList[photoDetailsList.length - 1];
    if (lastPhoto.hasFile) {
      const newPhoto = {
        id: Date.now(),
        hasFile: false,
      };
      setPhotoDetailsList((prevList) => [...prevList, newPhoto]);
    }
  };

  // Function to delete a PhotoDetails component by ID
  const handleDeletePhoto = (id) => {
    setPhotoDetailsList((prevList) => prevList.filter((photo) => photo.id !== id));
  };

  // Function to update whether a PhotoDetails component has a file
  const updatePhotoHasFile = (id, hasFile) => {
    setPhotoDetailsList((prevList) =>
      prevList.map((photo) => (photo.id === id ? { ...photo, hasFile } : photo))
    );
  };
  
  const removeBackground = async (image) => {
    const formData = new FormData();
    formData.append('image_file', image);
  
    try {
      const response = await fetch('https://api.remove.bg/v1.0/removebg', {
        method: 'POST',
        headers: {
          'X-Api-Key': 'CEnivjw7f74M16uTdLxnNxmB',
        },
        body: formData,
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.errors[0].title);
      }
  
      const blob = await response.blob();
      return URL.createObjectURL(blob);
    } catch (error) {
      console.error('Remove.bg API error:', error);
      throw error;
    }
  };

  // Function to save the inputs taken form PhotoDetails components into the Editor component
  const handleSavePhoto = async(id, image) => {
    try {
      // console.log("Data received from PhotoDetails component: ", image);

      let file = image.file;

      // Create a copy of the image data
      let processedImage = { ...image };

      // Check if background removal is requested
      if (image.removeBg) {
        // Perform background removal and wait for result
        const bgRemovedUrl = await removeBackground(image.imgFile);
        processedImage = {
          ...processedImage,  // Keep existing properties
          file: bgRemovedUrl  // Update the file property
        };
        file = bgRemovedUrl;
      }

      let numOf1x1 = parseInt(image.numOf1x1);
      let numOf2x2 = parseInt(image.numOf2x2);
      let numOf1p5x3 = parseInt(image.numOf1p5x3);
      let numOf3p5x5 = parseInt(image.numOf3p5x5);
      let removeBg = image.removeBg;
      setPhotoDetailsList((prevList) =>
        prevList.map((photo) => (photo.id === id ? { ...photo, file, numOf1x1, numOf2x2, numOf1p5x3, numOf3p5x5, removeBg } : photo))
      );

      console.log("Photo saved successfully!", {
        id,
        file: file instanceof File ? file.name : "Processed URL",
        numOf1x1,
        numOf2x2,
        numOf1p5x3,
        numOf3p5x5,
        removeBg
      });
    }
    catch (error) {
      console.error("Error saving photo:", error)
    }
  }

  // console.log("This is the new PhotoDetailsList: ", photoDetailsList);

  // passes the data to Foot
  useEffect(() => {
    onInput([photoDetailsList]);
  }, [photoDetailsList]);

  // passes the page size data to Foot
  useEffect(() => {
    onSet(pageSize);
  });

  return (
    <div className=" w-full flex flex-col overflow-y-auto items-center gap-5 p-4 lg:bg-camera-pattern lg:bg-cover">
      
      <div className='w-full lg:w-1/3 lg:text-sm lg:p-4 flex flex-col bg-white items-start justify-start p-2 rounded-xl shadow-lg shadow-zinc-400'>
        <ConfigPaperSettings
          defaultPageSizeLabel={pageSize.size.charAt(0).toUpperCase() + pageSize.size.substring(1).toLowerCase()}
        />
      </div>

      {photoDetailsList.map((photo, index) => (
        <PhotoDetails
          key={photo.id}
          id={photo.id}
          onDelete={() => handleDeletePhoto(photo.id)}
          updateHasFile={(hasFile) => updatePhotoHasFile(photo.id, hasFile)}
          onSave={(id, image) => handleSavePhoto(id, image)}
          isDeletable={photoDetailsList.length > 1}
        />
      ))}
      <AddPhotoButton
        onAddPhoto={handleAddPhoto}
        disabled={!photoDetailsList[photoDetailsList.length - 1]?.hasFile}
      />
    </div>
  );
}

export default Editor;
