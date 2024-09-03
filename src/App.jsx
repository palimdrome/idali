import Editor from "./components/addPhoto/Editor";
import Document from "./components/Document";
import Foot from "./components/Foot";
import NavigationBar from "./components/NavigationBar";

function App() {

  return (
    <div className='flex flex-col items-center justify-between lg:items-start min-h-screen max-h-screen w-screen bg-camera-pattern bg-cover lg:bg-none'>
      <NavigationBar />

      <div className="flex flex-grow overflow-y-auto w-full">
          <Editor></Editor>

        
        {/* <Document></Document> */}
      </div>
      <Foot />
    </div>
  )
}

export default App