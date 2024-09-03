import React, { useState } from 'react';
import PhotoDetails from './PhotoDetails';
import { Button } from 'flowbite-react';
import { MdAdd } from 'react-icons/md';

function AddPhotoButton({ onAddPhoto, disabled }) {
  return (
    <Button
      color="light"
      className="w-full lg:w-3/5 shadow-lg"
      onClick={onAddPhoto}
      disabled={disabled}
    >
      <MdAdd className="mr-2 h-5 w-5" />
      ADD A PHOTO
    </Button>
  );
}

function Editor() {
  const [photoDetailsList, setPhotoDetailsList] = useState([
    { id: Date.now(), hasFile: false },
  ]);

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

  return (
    <div className="lg:w-1/2 w-full overflow-y-auto flex flex-col justify-center items-center gap-5 p-4 lg:bg-camera-pattern lg:bg-contain">
      {photoDetailsList.map((photo, index) => (
        <PhotoDetails
          key={photo.id}
          id={photo.id}
          onDelete={() => handleDeletePhoto(photo.id)}
          updateHasFile={(hasFile) => updatePhotoHasFile(photo.id, hasFile)}
        />
      ))}
      {/* Only enable the button if the last PhotoDetails component has a file */}
      <AddPhotoButton
        onAddPhoto={handleAddPhoto}
        disabled={!photoDetailsList[photoDetailsList.length - 1]?.hasFile}
      />
    </div>
  );
}

export default Editor;
