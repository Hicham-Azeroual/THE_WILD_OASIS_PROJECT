import styled from "styled-components";

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 5.6rem;
  width: auto;
`;

function Logo() {
  return (
    <StyledLogo>
      <Img src="https://cdn-icons-png.flaticon.com/512/5167/5167654.png" alt="Logo" />
    </StyledLogo>
  );
}

export default Logo;
