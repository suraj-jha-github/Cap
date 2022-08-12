import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import M from 'materialize-css'

const Signup = () => {
  const history =useHistory()
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [image, setImage] = useState("")
  const [url, setUrl] = useState(undefined)

  useEffect(()=>{
    if(url){
      uploadFields()
    }
  },[url])
  const uploadPic =()=>{
    const data=new FormData()
    data.append("file",image)
    data.append("upload_preset","socialmedia")
    data.append("cloud_name","surajjha1234cloud")
    fetch("https://api.cloudinary.com/v1_1/surajjha1234cloud/image/upload",{
      method:"post",
      body:data
    })
    .then(res=>res.json())
    .then(data=>{
      setUrl(data.url)
    })
    .catch(err=>{
      console.log(err)
    })
  }

  const uploadFields=()=>{
    if(!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
      M.toast({html:"Invalid email",classes:"#d50000 red accent-4"})
      return
    }
    fetch("/signup",{
      method:"post",
      headers:{
        "Content-Type":"application/json"

      },
      body:JSON.stringify({
        name,
        password,
        email,
        pic:url

      })
    }).then(res=>res.json())
    .then(data=>{
      if(data.error){
        M.toast({html:data.error,classes:"#d50000 red accent-4"})

      }
      else{
        M.toast({html:data.message,classes:"#1b5e20 green darken-4"})
        history.push('/signin')
      }
    }).catch(err=>{
      console.log(err)
    })

  }
  const PostData=()=>{
    if(image){
      uploadPic()
    }else{
      uploadFields()
    }
    
  }
  return (
    <div className="my-card" >
      <div className="card auth-card input-field">
        <h2>Social Media</h2>
        <input 
        type="text" 
        placeholder="name"
        value={name}
        onChange={(e)=>setName(e.target.value)}
        />
        <input type="text" placeholder="email" 
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        />
        <input type="password" placeholder="password"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
        />
          <div className="file-field input-field">
        <div className="btn #880e4f pink darken-4">
          <span>Upload Pic</span>
          <input type="file"
          onChange={(e)=>setImage(e.target.files[0])}
          />
        </div>
        <div className="file-path-wrapper">
          <input className="file-path validate" type="text" />
        </div>
      </div>
        <button className="btn waves-effect waves-light #880e4f pink darken-4"
        onClick={()=>PostData()}
        >Signup</button>
        <h5 >
        Already have an account?
            <Link to="/signin" >
            <span style={{color:"blue"}} >Click here</span> 
            </Link>
        </h5>
      </div>
    </div>
  );
};

export default Signup;
