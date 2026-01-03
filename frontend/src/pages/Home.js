import { useState,useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Api from '../components/Api';
export default function Home()
{   const {http} = Api();
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [loader,setLoader] = useState("on");
    const [loader2,setLoader2] = useState(null);
    const [find,setFind] = useState("");
    useEffect(() => {
    fetch();
    }, []);
    
    const goToDetails = (id) => {
        navigate("/Edit-Details", { state: id });
    };

    const fetch = () => {
        http.post('/read').then(res=>{
        if (res.data.status==200) {
            setUsers(res.data.data) 
        }
        setLoader("off");
        });
    }

    const deletedata = async (id) => {
        if (window.confirm("Are you sure you want to delete?"))
        {  setLoader2(id);
           http.post('/delete',{id:id}).then(res=>{
           if (res.data.status==200) {
               alert(res.data.msg);
               setLoader2(null);
               setLoader("on");
               fetch();
           }
           });  
        }
    }

    const search = () =>{
        setLoader("on");
        if (find!="") {
            http.post('/read',{typ:"ser",find:find}).then(res=>{
                if (res.data.status==200) {
                    setUsers(res.data.data) 
                }
                setLoader("off");
            })     
        }
        if(find==""){
            fetch();
        }
    }
    return(
        
        <div className="container mt-5">
            <h3 className="text-center">Display</h3>
            <form className="d-flex mb-3 md-2">
                <input className="form-control" type="search" onChange={e=>setFind(e.target.value)} placeholder="Search Using Mob" aria-label="Search"/>
                <button className="btn btn-outline-success" onClick={search} type="button">      
                    <span>Search</span>
                </button>
            </form>
                <table className="table table-hover">
                    <thead>
                    <tr>
                        <th>Sl No.</th>
                        <th>Profile Pic</th>
                        <th>Name</th>
                        <th>Contact</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    { 
                      loader=="off" ? (
                      users.length > 0 ? (
                            users.map((user,sl) => (
                            <tr key={user.id}>
                                <td>{sl + 1}</td>
                                <td><img src={`http://localhost:8000/uploads/${user.image ?? 'blank_img.gif'}`} width="80"/></td>
                                <td>{user.name}</td>
                                <td>{user.mob}</td>
                                <td>{user.email}</td>
                                <td>{user.address}</td>
                                <td>
                                    <button type="button" onClick={() => goToDetails(user.id)} className="btn btn-outline-info">Edit</button>
                                    <button type="button" onClick={() => deletedata(user.id)} className="btn btn-outline-danger">
                                        { loader2!=user.id &&
                                          <span>Delete</span>
                                        }
                                        { loader2==user.id &&
                                          <div className="spinner-border spinner-border-sm" role="status"></div>
                                        }
                                    </button>
                                </td>
                            </tr>
                        ))
                        ) : (
                          <tr>
                            <td colSpan="6"><div className="d-flex justify-content-center align-items-center">No data found</div></td>
                          </tr>
                        )
                        ):(
                            <tr>
                                <td colSpan="6"><div className="d-flex justify-content-center align-items-center"><div className="spinner-grow" role="status"></div></div></td>
                            </tr>
                        )
                    }
                    </tbody>
                </table>
        </div>
    );
}