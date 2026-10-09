import AllTask from "../Other/AllTask";
import CreateTask from "../Other/CreateTask";
import Header from "../Other/Header";

const AdminDashboard = ({userData, changeUser}) => {
  return (
    <div className="min-h-screen w-full bg-[#1C1C1C] p-10 text-white">
        <Header userData={userData} changeUser={changeUser}/>
        <CreateTask/>
        <AllTask/>
    </div>
  );
};

export default AdminDashboard;
