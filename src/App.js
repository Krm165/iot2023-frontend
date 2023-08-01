import HomePage from "./HomePage";
import Header from "./component/header";
import FirebaseHome  from "./firebase.Home"
import "./App.css"
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="app">
      <Header/>
      <div className="app">
        <HomePage />
        {/* <FirebaseHome/> */}
      </div>
    </div>
  );
}

export default App;
