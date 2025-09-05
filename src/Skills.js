import React from 'react'
import './Skills.css'

export default function Skills() {


  const skills = [
  {
    skilname: 'React Js',
    src: 'react.png',
    desc: 'Experienced in building modern, responsive, and scalable web applications using React JS with strong knowledge of components, hooks, and state management.'
  },
  {
    skilname: 'JavaScript',
    src: 'js.png',
    desc: 'Proficient in JavaScript, with a solid understanding of ES6+ features, DOM manipulation, asynchronous programming, and creating dynamic, interactive web applications.'
  },
  {
    skilname: 'Node Js',
    src: 'nodejs.png',
    desc: 'Skilled in developing fast and efficient backend services with Node.js, including building REST APIs, handling authentication, and working with middleware.'
  },
  {
    skilname: 'MySQL',
    src: 'mysql.png',
    desc: 'Strong knowledge of MySQL for designing relational databases, writing optimized queries, and managing data integrity with structured schemas.'
  },
  {
    skilname: 'MongoDB',
    src: 'mongodb.png',
    desc: 'Proficient in MongoDB for managing NoSQL databases, working with collections, aggregation pipelines, and integrating with Node.js for full-stack development.'
  },
  {
    skilname: 'Python',
    src: 'python.png',
    desc: 'Experienced in Python programming for problem-solving, data structures, backend development, and writing clean, efficient, and maintainable code.'
  }
];

  return (
    
      <div class="skills" id='skills'>
                <div class="projectsHeading">
                    <h1>Skills</h1>
                    <hr id="fifthHR"/>
                </div>
                <div class="allskillsBox">
                  {
                     skills.map((i)=>{
                      return(<div class="react-box">
                      <img src={i.src} alt='error'/>
                      <h4>{i.skilname}</h4>
                      <p>{i.desc}</p>
                    </div>)
                     })
                  }
                    
                    
                </div>
                
                    
                
                
            </div>
  
  )
}
