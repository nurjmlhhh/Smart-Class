// export default function About() {
//     return (
//         <>
        
//         </>
//     )
// }

import '../pages/about.css'; // Import CSS file for styling
import logoImage from '../assets/images/SmartClass.png';  // Sesuaikan path sesuai dengan direktori Anda

const About = () => {
  return (
    <div className="about-container">
      <div className="content-wrapper">
        <div className="circle-container">
          <div className="rotating-circle"></div>
          <div className="circle-text">
          <img src={logoImage} alt="Smart Class Logo" className="log" />
            {/* <p className='rot'>Smart Class</p> */}
          </div>
        </div>
        <div className="about-content">
          <h2>Hello Guys</h2>
          <p>
            <strong>Smart Class</strong> adalah projek yang dibuat oleh seorang calon programmer dari jurusan Akuntansi, projek ini sebagai syarat untuk memenuhi tahap terakhir dalam pembelajaran REACT.
          </p>
          <p>
            Terimakasih.....
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
