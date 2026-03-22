import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Nav from './nav'
import Dashboard from './pages/Dashboard.jsx'
import './App.css'




// function Dashboard()    { return <h2>Dashboard</h2>; }
function Ore()          { return <h2>Ore Lavorative</h2>; }
function Permessi()     { return <h2>Permessi e Ferie</h2>; }
function Report()       { return <h2>Report</h2>; }

function App() {

  return (

       <BrowserRouter>
        <div className="app-layout">
          <Nav />
          <main className="contents">
            <Routes>
              <Route path="/"            element={<Dashboard />} />
              <Route path="/ore"         element={<Ore />} />
              <Route path="/permessi"    element={<Permessi />} />
              <Route path="/report"      element={<Report />} />
            </Routes>
          </main>
        </div>
       </BrowserRouter> 
    
  );
}

export default App
