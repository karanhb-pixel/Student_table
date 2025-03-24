import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import StudentTable from "./StudentTable/StudentTable";
import CreateStudent from "./CreateStudent/CreateStudent";
import EditStudent from "./EditStudent/EditStudent";
import ViewStudentDetail from "./VIewStudentDetails/ViewStudentDetail";

function App() {
  return (
    <>
      <div className="container ">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<StudentTable />}></Route>
            <Route path="/student/create" element={<CreateStudent />}></Route>
            <Route path="/student/edit/:id" element={<EditStudent />}></Route>
            <Route
              path="/student/view/:id"
              element={<ViewStudentDetail />}
            ></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
