import { useState } from "react";
import Editor from "./components/addPhoto/Editor";
import Document from "./components/Document";
import Foot from "./components/Foot";
import NavigationBar from "./components/NavigationBar";

function App() {

  const [data, setData] = useState();

  return (
    <div className='flex flex-col items-center justify-between lg:items-start min-h-screen max-h-screen w-screen bg-camera-pattern bg-cover lg:bg-none'>
      <NavigationBar />
      <div className="flex flex-grow overflow-y-auto w-full">
        <Editor onInput={setData}></Editor>
      </div>
      <Foot data={data}/>
    </div>
  )
}

export default App