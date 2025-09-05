import React from 'react'
import './Aboutme.css'

export default function Aboutme() {
  return (
    
       <div class="aboutME" id='aboutME'>
        <div className='aboutmeheading'>
          <p>About Me</p>

        </div>

                <div className='leftimageandpara'>

                  <div className='aboutleft'>
           <img src='/nobg3.png' alt='error'/>
       </div>
            
            
        <div class="aboutPara">
            <p> Hello! I'm Ankush Dhull

                 I'm a recent Bachelor Of Computer graduate from Jagannath Community College,rohini DELHI. and I'm excited to embark on my journey in Web Development. Throughout my studies, I've developed a solid foundation in Javascript,React JS, and I've had the opportunity to work on projects like <span style={{color:'red',fontStyle:'italic',fontFamily:'sans-serif'}}>Social Media App( MERN ), Food Ordering Application ( MERN ), Chat Application ( MERN )</span>.

                 I’m particularly passionate about Full Stack Web Development, and I'm eager to apply my skills to real-world challenges. My approach is characterized by Team Work, creativity, attention to detail, problem-solving, and I'm always ready to learn and grow in my field.

                Thank you for visiting my portfolio! Feel free to explore my work, and don't hesitate to reach out if you have any questions or opportunities.<br/>

            </p>

             <div class="contact">
                 <h1> Contact</h1>
             <div class="phone">
                 <img src="mobile.png" alt='error'/> 
                 <p>+91 7404722365</p>
              </div>
    
            <div class="gmail">
               <img src="gmail.png" alt='error'/>
               <p>ankushdhull9908@gmail.com</p>
            </div>
     
          </div>
       </div>
                </div>
        
          
       
    </div>
    
   

       
  )
}
