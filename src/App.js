import RoutesApp from "./routes";
import { ToastContainer } from "react-toastify";

import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div>
      <ToastContainer autoClose={4000} position="bottom-right" />
      <RoutesApp />
    </div>
  );
}

export default App;
