import styled from "@emotion/styled";
import { Typography } from "@mui/material";

const RGBEffect = styled.div`
  width: 50%;
  height: 90%;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(#14ffe9, #ffeb3b, #ff00e0);
  animation: rotate 1.5s linear infinite;

  @keyframes rotate {
    0% {
      filter: hue-rotate(0deg);
    }
    100% {
      filter: hue-rotate(360deg);
    }
  }
`;

const Container = styled.div`
  width: 98%;
  height: 98%;
  border-radius: 8px;
  background-color: white;
  /* padding: 12px; */
  box-sizing: border-box;
  border: 1px solid black;
`;

const Title = styled(Typography)`
  border-bottom: 1px solid black;
  font-size: 20px;
  font-weight: 600;
  padding: 12px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px;
`;

export const HomePage = () => {
  return (
    <RGBEffect>
      <Container>
        <Title>OBI Playground</Title>
        <Content></Content>
      </Container>
    </RGBEffect>
  );
};
