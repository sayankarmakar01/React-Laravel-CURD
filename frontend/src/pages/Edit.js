import { useState,useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Api from '../components/Api';
import { useLocation } from "react-router-dom";
export default function Edit()
{   const location = useLocation();
    const id = location.state;
    const [loader2,setLoader2] = useState("on");
    const {http} = Api();
    const [image, setImage] = useState(null);
    const [image_old, setImage_old] = useState(null);
    const [name,setName] = useState();
    const [mob,setContact] = useState();
    const [email,setEmail] = useState();
    const [address,setAddress] = useState();
    const [errorimg,setImgrror] = useState();
    const [errorname,setNameerror] = useState();
    const [errormob,setMoberror] = useState();
    const [erroremail,setEmailerror] = useState();
    const [erroradd,setAdderror] = useState();
    const [loader,setLoader] = useState("off");
    const navigate = useNavigate();

    useEffect(() => {
    fetch();
    }, []);

    const fetch = () => {
        http.post('/read',{typ:"ser",id:id}).then(res=>{
            if (res.data.status==200) {
                setImage_old(res.data.data[0].image); 
                setName(res.data.data[0].name); 
                setContact(res.data.data[0].mob);
                setEmail(res.data.data[0].email); 
                setAddress(res.data.data[0].address); 
            }
            setLoader2("off");
        })  
    }
    

    const submitform = () => {
        setLoader("on");
        const formData = new FormData();
        formData.append("id", id);
        formData.append("name", name);
        formData.append("mob", mob);
        formData.append("email", email);
        formData.append("address", address);
        formData.append("image", image);
        http.post('/update',formData).then(res=>{
           if(res.data.status==422){
                setImgrror(res.data.error.image);
                setNameerror(res.data.error.name);
                setMoberror(res.data.error.mob);
                setEmailerror(res.data.error.email);
                setAdderror(res.data.error.address);
           }
           if (res.data.status==200) {
              navigate("/");
           }
           setLoader("off");
        });
    }
    return(
        <>
        <div className="container mt-5">
            <h3 className="text-center">Update</h3>
            { loader2=="off" &&
            <div className="container mt-5">
                <div className="mb-3 w-25 p-3">
                    <label  className="form-label">Profile Pic</label>
                    <img className="form-control" src={`http://localhost:8000/uploads/${image_old ?? 'blank_img.gif'}`} width="80"/>
                </div>
                <div className="mb-3">
                    <label  className="form-label">Select Profile Pic</label>
                    <input type="file" className="form-control" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
                    <span className="text-danger">{errorimg}</span>
                </div>
                <div className="mb-3">
                    <label  className="form-label">Name</label>
                    <input type="text" value={name || ""} className="form-control" onChange={e=>setName(e.target.value)} id="exampleFormControlInput1" placeholder="Full Name"/>
                    <span className="text-danger">{errorname}</span>
                </div>
                <div className="mb-3">
                    <label  className="form-label">Contact No</label>
                    <input type="tel" value={mob || ""} className="form-control" onChange={e=>setContact(e.target.value)} id="exampleFormControlInput1" placeholder="Contact No"/>
                    <span className="text-danger">{errormob}</span>
                </div>
                <div className="mb-3">
                    <label  className="form-label">Email</label>
                    <input type="email" value={email || ""} className="form-control" onChange={e=>setEmail(e.target.value)} id="exampleFormControlInput1" placeholder="Email"/>
                    <span className="text-danger">{erroremail}</span>
                </div>
                <div className="mb-3">
                    <label className="form-label">Address</label>
                    <textarea className="form-control" onChange={e=>setAddress(e.target.value)} id="exampleFormControlTextarea1" rows="3">{address || ""}</textarea>
                    <span className="text-danger">{erroradd}</span>
                </div>
                <button type="button" onClick={submitform} className="btn btn-primary">
                    { loader=="off" &&
                        <span>Update</span>
                    }
                    { loader=="on" &&
                        <div className="spinner-border spinner-border-sm" role="status"></div>
                    }
                </button>
            </div>
            }
            { loader2=="on" &&                 
              <div className="d-flex justify-content-center align-items-center"><div className="spinner-grow" role="status"></div></div>         
            }
            
        </div>
        </>
    );
}