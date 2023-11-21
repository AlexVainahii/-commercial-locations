import { Image } from 'components/Team.styled';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Cont = styled.div`
  position: absolute;
  top: 0;
`;
export const Title = styled.h1`
  font-size: 2.5em;
  margin-top: 150px;
  margin-left: 200px;
  margin-bottom: 100px;
  text-shadow: -1px 1px 0 #ddd, -2px 2px 0 #c8c8c8, -3px 3px 0 #ccc,
    -4px 4px 0 #b8b8b8, -4px 4px 0 #bbb, 0px 1px 1px rgba(0, 0, 0, 0.4),
    0px 2px 2px rgba(0, 0, 0, 0.3), -1px 3px 3px rgba(0, 0, 0, 0.2),
    -1px 5px 5px rgba(0, 0, 0, 0.1), -2px 8px 8px rgba(0, 0, 0, 0.1),
    -2px 13px 13px rgba(0, 0, 0, 0.1);
`;

export const Subtitle = styled.p`
  margin-left: 550px;
  font-size: 1.85em;
  text-shadow: -1px 1px 0 #ddd, -2px 2px 0 #c8c8c8, -3px 3px 0 #ccc,
    -4px 4px 0 #b8b8b8, -4px 4px 0 #bbb, 0px 1px 1px rgba(0, 0, 0, 0.4),
    0px 2px 2px rgba(0, 0, 0, 0.3), -1px 3px 3px rgba(0, 0, 0, 0.2),
    -1px 5px 5px rgba(0, 0, 0, 0.1), -2px 8px 8px rgba(0, 0, 0, 0.1),
    -2px 13px 13px rgba(0, 0, 0, 0.1);
  margin-bottom: 120px;
`;
export const Subtit = styled.p`
  margin-left: 150px;
  font-size: 1.8em;
  margin-bottom: 80px;
  text-shadow: -1px 1px 0 #ddd, -2px 2px 0 #c8c8c8, -3px 3px 0 #ccc,
    -4px 4px 0 #b8b8b8, -4px 4px 0 #bbb, 0px 1px 1px rgba(0, 0, 0, 0.4),
    0px 2px 2px rgba(0, 0, 0, 0.3), -1px 3px 3px rgba(0, 0, 0, 0.2),
    -1px 5px 5px rgba(0, 0, 0, 0.1), -2px 8px 8px rgba(0, 0, 0, 0.1),
    -2px 13px 13px rgba(0, 0, 0, 0.1);
`;

export const Button = styled(Link)`
  margin-left: 900px;

  display: inline-block;
  padding: 10px 20px;
  background-color: #3498db;
  color: #fff;
  text-decoration: none;
  font-size: 1.5em;
  border-radius: 5px;
  box-shadow: -1px 1px 0 #ddd, -2px 2px 0 #c8c8c8, -3px 3px 0 #ccc,
    -4px 4px 0 #b8b8b8, -4px 4px 0 #bbb, 0px 1px 1px rgba(0, 0, 0, 0.4),
    0px 2px 2px rgba(0, 0, 0, 0.3), -1px 3px 3px rgba(0, 0, 0, 0.2),
    -1px 5px 5px rgba(0, 0, 0, 0.1), -2px 8px 8px rgba(0, 0, 0, 0.1),
    -2px 13px 13px rgba(0, 0, 0, 0.1);
  &:hover {
    background-color: #217dbb;
  }
`;
const Home = () => {
  return (
    <div>
      <Image />
      <Cont>
        <Title>
          Інтелектуальна система <br /> <Subtit>Комерційні локації</Subtit>
        </Title>
        <Subtitle>Де кожна локація - це новий світ для бізнесу</Subtitle>
        <Button to="/dashboard/">Почати роботу</Button>
      </Cont>
    </div>
  );
};
export default Home;
