import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../App'

const Profile=()=>{
    const [mypics, setMypics] = useState([])
    const {state,dispatch}=useContext(UserContext)
    const [image, setImage] = useState("")
    // const [url, setUrl] = useState("")
    useEffect(()=>{
        fetch("/mypost",{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            setMypics(result.mypost)
        })

    },[])
    useEffect(()=>{
        if(image){
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
            //   setUrl(data.url)
            //   localStorage.setItem("user",JSON.stringify({...state,pic:data.url}))
            //   dispatch({type:"UPDATEPIC",payload:data.url})
              fetch("/updatepic",{
                  method:"put",
                  headers:{
                      "Content-Type":"application/json",
                      "Authorization":"Bearer "+localStorage.getItem("jwt")
                  },
                  body:JSON.stringify({
                      pic:data.url
                  })
              }).then(res=>res.json())
              .then(result=>{
                  console.log(result)
                  localStorage.setItem("user",JSON.stringify({...state,pic:data.pic}))
                  dispatch({type:"UPDATEPIC",payload:result.pic})
              })

            })
            .catch(err=>{
              console.log(err)
            })
        }

    },[image])
    const updatePhoto=(file)=>{
        setImage(file)
        
    }
    return (
        <div style={{maxWidth:"550px",margin:"0px auto"}} >
            <div style={{ margin:"18px 0px",borderBottom:"1px solid grey"}}>
            
                  </div>
                 
            <div className="mob-view" style={{display:"flex",justifyContent:"space-around"}}>
                <div>
                    <img alt="" style={{width:"160px",height:"160px" ,borderRadius:"80px"}}
                    src={state?state.pic:"loading"}
                    />
                    
                </div>
                <div>
                    <h4>{state?state.name:"Loading"}</h4>
                    <h4>{state?state.email:"Loading"}</h4>
                    <div className="mob-view-info" style={{display:"flex",justifyContent:"space-between",width:"108%"}} >
                        <h5>{mypics.length} posts</h5>
                        <h5>{state?state.followers.length:"0"} followers</h5>
                        <h5>{state?state.following.length:"0"} following</h5>
                    </div>
                </div>
            </div>
            
            
        <div className="file-field input-field"
        style={{margin:"10px"}}
        >
        <div className="btn #880e4f pink darken-4">
          <span>Update Pic</span>
          <input type="file"
          onChange={(e)=>updatePhoto(e.target.files[0])}
          />
        </div>
        <div className="file-path-wrapper">
          <input className="file-path validate" type="text" />
        </div>
      </div>
            <div className="gallery">
                {
                    mypics.map(item=>{
                        return(
                            <img key={item._id}  className="item" alt={item.title} src={item.photo} />
                        )
                    })
                }
               
            </div>
        </div>
    )
}

export default Profile;
