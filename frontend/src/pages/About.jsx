// export default function About() {
//     return (
//         <>
        
//         </>
//     )
// }

import 'style.css'; // Import CSS file for styling

const AboutPage = () => {
  return (
    <div className="about-container">
      <header className="about-header">
        <h1>About Smart Class</h1>
      </header>
      <section className="about-content">
        <h2>Welcome to Smart Class</h2>
        <p>
          <strong>Smart Class</strong> adalah platform manajemen pembelajaran yang menyederhanakan cara guru dan siswa berinteraksi secara digital. Dengan fitur untuk membuat kelas, membagikan materi, dan mengelola tugas, Smart Class menjadikan pembelajaran lebih efisien dan terorganisir.
        </p>
        <p>
          Kami berkomitmen untuk menyediakan pengalaman belajar yang fleksibel dan terintegrasi, baik untuk pembelajaran jarak jauh maupun di kelas. Bergabunglah dengan <strong>Smart Class</strong> dan tingkatkan pengalaman pendidikan Anda hari ini.
        </p>
      </section>
      <footer className="about-footer">
        <p>&copy; 2024 Smart Class. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AboutPage;
