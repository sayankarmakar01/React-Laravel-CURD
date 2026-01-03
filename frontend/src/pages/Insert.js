import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Api from '../components/Api';
export default function Insert()
{
    const {http} = Api();
    const [image, setImage] = useState(null);
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

    const submitform = () => {
        setLoader("on");
        const formData = new FormData();
        formData.append("name", name);
        formData.append("mob", mob);
        formData.append("email", email);
        formData.append("address", address);
        formData.append("image", image);
        http.post('/insert',formData).then(res=>{
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
            <h3 className="text-center">Insert</h3>
            <div className="mb-3">
                <label  className="form-label">Select Profile Pic</label>
                <input type="file" className="form-control" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
                <span className="text-danger">{errorimg}</span>
            </div>
            
            <div className="mb-3">
                <label  className="form-label">Name</label>
                <input type="text" className="form-control" onChange={e=>setName(e.target.value)} id="exampleFormControlInput1" placeholder="Full Name"/>
                <span className="text-danger">{errorname}</span>
            </div>
            <div className="mb-3">
                <label  className="form-label">Contact No</label>
                <input type="tel" className="form-control" onChange={e=>setContact(e.target.value)} id="exampleFormControlInput1" placeholder="Contact No"/>
                <span className="text-danger">{errormob}</span>
            </div>
            <div className="mb-3">
                <label  className="form-label">Email</label>
                <input type="email" className="form-control" onChange={e=>setEmail(e.target.value)} id="exampleFormControlInput1" placeholder="Email"/>
                <span className="text-danger">{erroremail}</span>
            </div>
            <div className="mb-3">
                <label className="form-label">Address</label>
                <textarea className="form-control" onChange={e=>setAddress(e.target.value)} id="exampleFormControlTextarea1" rows="3"></textarea>
                <span className="text-danger">{erroradd}</span>
            </div>
            <button type="button" onClick={submitform} className="btn btn-primary">
                { loader=="off" &&
                  <span>Submit</span>
                }
                { loader=="on" &&
                  <div className="spinner-border spinner-border-sm" role="status"></div>
                }
            </button>
        </div>
        </>
    );
}