import Editor from "./components/addPhoto/Editor";
import Document from "./components/Document";
import Foot from "./components/Foot";
import NavigationBar from "./components/NavigationBar";

function App() {

  return (
    <div className='flex flex-col items-center justify-between min-h-screen max-h-screen w-screen bg-camera-pattern bg-contain'>
      <NavigationBar />

      <div className="flex flex-row h-auto overflow-y-auto w-full">
        <Editor></Editor>
        {/* <Document></Document> */}
      </div>
      <Foot />
    </div>
  )
}

export default App