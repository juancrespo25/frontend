import { Toaster, toast } from 'sonner';

const App = () => {
  return (
    <div>
      <Toaster />
      <button onClick={() => toast('My first toast')}>Give me a toast</button>
    </div>
  )
}
export default App