import { QueryClient, QueryClientProvider } from 'react-query';
import {ContactPage} from "./pages/ContactPage.jsx";

function App() {
    const queryClient = new QueryClient();

    return (
        <>
           <QueryClientProvider client={queryClient}>
               <ContactPage />
           </QueryClientProvider>
        </>
    );
}

export default App;
