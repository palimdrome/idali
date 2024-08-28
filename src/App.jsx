import AddPhoto from "./components/AddPhoto";
import Foot from "./components/Foot";
import NavigationBar from "./components/NavigationBar";

function App() {

  return (
    <div className='flex flex-col items-center justify-between min-h-screen w-screen'>
      <NavigationBar />
      <AddPhoto />
      <Foot />
    </div>
  )
}

export default App
