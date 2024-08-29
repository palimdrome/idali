import Editor from "./components/addPhoto/Editor";
import Document from "./components/Document";
import Foot from "./components/Foot";
import NavigationBar from "./components/NavigationBar";

function App() {

  return (
    <div className='flex flex-col items-center justify-between min-h-screen w-screen'>
      <NavigationBar />
      <Editor></Editor>
      <Document></Document>
      <Foot />
    </div>
  )
}

export default App