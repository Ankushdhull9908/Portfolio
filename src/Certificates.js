import React from 'react'
import './Certificates.css'

const Certificates = () => {

  var certificates = [{img:'Ankushcertificate.png'}]
  return (
    <div className='certificate' id='certificates'>
      <div class="projectsHeading">
                    <h1> Certificates</h1>
                    <hr id="fifthHR"/>
                </div>
                <div className='allcertificatecollection'>
                  {
                  certificates.map((i)=>{
                    return(<div className='certifcateimage'>
        <img src={i.img} alt="certifcate"/>
        </div>)
                  })
                }

                </div>
                
      
       
    </div>
  )
}

export default Certificates
