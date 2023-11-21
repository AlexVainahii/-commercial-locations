import styled from 'styled-components';
import img1 from '../images/fon.jpeg';
export const TeamSection = styled.div`
  text-align: center;
  margin-top: 30px;
`;

export const TeamMember = styled.div`
  display: inline-block;
  width: 200px;
  margin: 20px;
`;

export const TeamMemberImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
`;

export const TeamMemberName = styled.h3`
  margin-top: 10px;
  font-size: 18px;
`;

export const TeamMemberRole = styled.p`
  margin-top: 5px;
  font-size: 14px;
  color: #777;
`;

export const Image = styled.div`
  background-image: url(${img1});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  width: 100vw;
  height: 100vh;
`;
