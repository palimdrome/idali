import React, { useState, useRef, useEffect } from 'react';
import { FileInput, Label, TextInput, Button, Select, Tooltip } from 'flowbite-react';
import { MdOutlineSave, MdOutlineDelete } from 'react-icons/md';

function PhotoDetails({ id, onDelete, updateHasFile, onSave, isDeletable }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileAsImgSrc, setFileAsImgSrc] = useState(null);
  const [hasFile, setHasFile] = useState(false);
  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState(null);

  const [formValues, setFormValues] = useState({
    numOf1x1: 0,
    numOf2x2: 0,
    numOfPassport: 0,
  })

  const fileInputHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setHasFile(true);
      updateHasFile(true);

      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        setPreview(null);
      }
    } else {
      setSelectedFile(null);
      setPreview(null);
      setHasFile(false);
      updateHasFile(false);
    }
  };

  const deleteFileHandler = (e) => {
    e.preventDefault();
    setSelectedFile(null);
    setHasFile(false);
    setPreview(null);
    updateHasFile(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      fileInputHandler({ target: { files: [file] } });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value
    })
  }

  useEffect(() => {
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFileAsImgSrc(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setFileAsImgSrc(null);
    }
  }, [selectedFile])

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("This is the File format of File: ", selectedFile);
    console.log("This is the URL format of File: ", fileAsImgSrc);
    const image = {
      id: id,
      file: fileAsImgSrc,
      numOf1x1: formValues.numOf1x1,
      numOf2x2: formValues.numOf2x2,
      numOfPassport: formValues.numOfPassport
    };
    onSave(id, image);
  };

  return (
    <form className="w-full lg:w-1/3 lg:text-sm lg:p-6 flex flex-col bg-white items-center justify-center gap-4 p-4 rounded-xl shadow-lg shadow-zinc-400" onSubmit={handleSubmit}>
      {!hasFile ? (
        <Label
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          htmlFor={`dropzone-file-${id}`}
          className="flex h-48 w-full lg:h-28 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          <div className="flex flex-col items-center justify-around px-4 py-2 h-full">
            <div className="flex flex-col items-center justify-between gap-4">
              <svg
                className="h-8 w-8 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <div className="flex flex-col items-center justify-between gap-1">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  SVG, PNG, JPG, or GIF (MAX. 800x400px)
                </p>
              </div>
            </div>
            <FileInput
              ref={fileInputRef}
              id={`dropzone-file-${id}`}
              className="hidden"
              onChange={fileInputHandler}
              accept='.jpg, .jpeg, .jfif, .pjpeg, .pjp, .png, .ico, .svg, .gif'
            />
          </div>
        </Label>
      ) : null}

      {preview && (
        <div className="mt-4">
          <img src={preview} alt="Preview" className="max-h-40 rounded-lg shadow-md" />
        </div>
      )}

      {hasFile && (
        <div className="flex flex-row gap-4 items-center justify-center">
          <div className="text-sm text-gray-700">
            <p>
              <span className="font-bold inline">Selected File:</span> {selectedFile.name}
            </p>
          </div>
          <Tooltip content="Delete file">
            <Button
              size="xs"
              color="failure"
              className="text-white"
              onClick={deleteFileHandler}
              pill
            >
              <MdOutlineDelete className="h-4 w-4" />
            </Button>
          </Tooltip>
        </div>
      )}

      {/* ID Size inputs */}
      {hasFile && (
        <div className="flex flex-row gap-2">
          <div>
            <Label htmlFor="small" value="1x1 ID" />
            <TextInput id="small" name="numOf1x1" type="number" sizing="sm" value={formValues.numOf1x1} onChange={handleInputChange} />
          </div>
          <div>
            <Label htmlFor="small" value="2x2 ID" />
            <TextInput id="small" name="numOf2x2" type="number" sizing="sm" value={formValues.numOf2x2} onChange={handleInputChange} />
          </div>
          <div>
            <Label htmlFor="small" value="Passport" />
            <TextInput id="small" name="numOfPassport" type="number" sizing="sm" value={formValues.numOfPassport} onChange={handleInputChange} />
          </div>
        </div>
      )}

      {/* Document preferences inputs */}
      {/* {hasFile && (
        <div className="flex flex-row gap-2">
          <div className="w-1/2">
            <Label htmlFor="small" value="Document size" />
            <Select id="paper-sizes" sizing="sm">
              <option>A4</option>
              <option>Letter</option>
              <option>Legal</option>
            </Select>
          </div>
          <div className="w-1/2">
            <Label htmlFor="small" value="No. of copies" />
            <TextInput id="small" type="number" sizing="sm" />
          </div>
        </div>
      )} */}

      {hasFile && (
        <div className="flex flex-row w-full gap-2 items-center justify-around px-8 mt-4 mb-2">
          <Button size="xs" className="bg-[#E6AF2E] w-1/2" type="submit">
            SAVE
            <MdOutlineSave className="ml-1 h-4 w-4" />
          </Button>
          <Button size="xs" className="bg-[#30323D] w-1/2" onClick={onDelete} disabled={!isDeletable}>
            DELETE
            <MdOutlineDelete className="ml-1 h-4 w-4" />
          </Button>
        </div>
      )}
    </form>
  );
}

export default PhotoDetails;
