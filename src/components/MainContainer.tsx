import styled from "@emotion/styled";
import BackgroundImg from "../images/background.jpg";

const AppContainer = styled.div`
  min-height: 100vh;
  height: 100vh;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: black;
  background-image: url(${BackgroundImg});
  background-repeat: no-repeat;
  background-size: cover;
`;

export const MainContainer = ({ children }: any) => {
  return <AppContainer>{children}</AppContainer>;
};
