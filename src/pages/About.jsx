import { Outlet } from 'react-router-dom';

const About = () => {
  return (
    <main style={{ minHeight: '625px' }}>
      <div>
        <Outlet />
      </div>
    </main>
  );
};
export default About;
