import React, { useEffect, useState } from 'react'
import './NavigationBar.css'

export default function NavigationBar() {
  const [shownav,setshownav] = useState(false)
  const [screensize, setScreensize] = useState(window.innerWidth);

  useEffect(() => {
    
    const handleResize = () => setScreensize(window.innerWidth);

    
    window.addEventListener("resize", handleResize);

    
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    
      <div class="navigation">
            <div class="logo">
            <img src="/file (5).png" alt="error" />
            </div>
            {
              screensize > 480 ? (<ul>
                <li >
                    Home
                </li>
                <li id="aboutMEid" onClick={() => document.getElementById("aboutME").scrollIntoView({ behavior: "smooth" })}>
                       About Me
               </li>
                <li id="skillsid" onClick={() => document.getElementById("skills").scrollIntoView({ behavior: "smooth" })}>
                    Skills
                </li>
                <li id="experienceid" onClick={() => document.getElementById("projects").scrollIntoView({ behavior: "smooth" })}>
                    Projects
                </li>
                <li id="projectsid" onClick={() => document.getElementById("certificates").scrollIntoView({ behavior: "smooth" })}>
                    Certificates
                </li>
               <li>
          <a
            href="/Ankush_Dhull_Full_Stack_Web_Developer_Resume (1).pdf"
            download="Ankush_Dhull_Resume.pdf"
            
          >
            Download Resume
          </a>
        </li>
            </ul>) : ''
            }


            
            

            
           

        </div>
    
  )
}
