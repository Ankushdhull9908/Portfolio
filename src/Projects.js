import React from 'react'
import './Projetcs.css'


export default function Projects() {
   

     var projects = [
      {projectname:"Social Media App (MERN + socket)" ,video:'sociamediapp.mp4',link:'https://social-media-till-skeleton.vercel.app/'},
      {projectname:"Music Application Using REACT",video:"screenrecorder3.mp4",link:'https://boo-project-a3f2.vercel.app/'},
      {projectname:"Food Ordering Application (MERN)",video:"screenrecord4.mp4",link:'https://boo-project-a3f2.vercel.app/'},
,
{projectname:"Full Stack Book delivery using JavaScript",video:"screenrecord2.mp4",link:'https://boo-project-a3f2.vercel.app/'}
     ]

   
  return (
    <div className='projects' id='projects'>
        <div class="projectsHeading">
                    <h1> Projects</h1>
                    <hr id="fifthHR"/>
                </div>
                <div class="allprojectsBox">
                  {

                    projects.map((i)=>{
                      return(<div class="react-box1">
                      <video src={i.video} muted loop autoPlay onClick={()=>{
                        window.location.href = i.link;
                      }}/>
                         
                      <h4>{i.projectname}</h4>
                      
                    </div>)
                    })
                  }
                    
                    
                    
                    
                </div>
                

     
    </div>
  )
}
