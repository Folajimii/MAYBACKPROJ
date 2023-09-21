import Routespath from "./routes/Routespath";
import { StateContext } from "./config/store";
import { Toaster } from "react-hot-toast";
import{PayPalScriptProvider} from '@paypal/react-paypal-js'

function App() {
  return (
    <StateContext>
      <PayPalScriptProvider deferLoading={true}>
      <Toaster />
      <Routespath />
      </PayPalScriptProvider>
    </StateContext>
  );
}

export default App;
