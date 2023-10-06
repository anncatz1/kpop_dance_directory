import { Outlet } from "react-router-dom";
// import Sidebar from "./Sidebar";
import Header from "./Header";
import styled from "styled-components";

const StyledAppLayout = styled.div`
  display: grid;
  height: 100vh;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr;
`;

const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 2rem 3rem 3.2rem;
  overflow: scroll;
`;

const Container = styled.div`
  /* max-width: 120rem; */
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  /* gap: 3.2rem; */
  @media (min-width: 2360px) {
    padding: 0rem 6rem;
  }
  @media (max-width: 1250px) {
    padding: 0rem 5rem;
  }
  /*
  @media (min-width: 1000px) {
    padding: 0rem 3rem;
  } */
`;

function AppLayout() {
  return (
    <StyledAppLayout>
      <Header />

      <Main>
        <Container>
          <Outlet />
        </Container>
      </Main>
    </StyledAppLayout>
  );
}

export default AppLayout;
