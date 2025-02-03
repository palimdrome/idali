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

  // Function containing dropdwon component to set the page size of the document
  function ConfigPaperSettings({ defaultPageSizeLabel }) {
    return (
      <div className="flex items-center space-x-2 w-1/2 px-1">
        <Label htmlFor="paper-size">Paper Size:</Label>

        {/* Dropdown with selected option as label */}
        <Dropdown label={defaultPageSizeLabel}>
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

  // Function to save the inputs taken form PhotoDetails components into the Editor component
  const handleSavePhoto = (id, image) => {
    console.log("Data received from PhotoDetails component: ", image);
    let file = image.file;
    let numOf1x1 = parseInt(image.numOf1x1);
    let numOf2x2 = parseInt(image.numOf2x2);
    let numOfPassport = parseInt(image.numOfPassport);
    let removeBg = image.removeBg;
    setPhotoDetailsList((prevList) =>
      prevList.map((photo) => (photo.id === id ? { ...photo, file, numOf1x1, numOf2x2, numOfPassport, removeBg } : photo))
    );
  }

  console.log("This is the new PhotoDetailsList: ", photoDetailsList);

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
