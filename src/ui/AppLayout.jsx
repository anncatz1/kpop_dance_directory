import { Outlet } from "react-router-dom";
import Header from "./Header";
import styled from "styled-components";
import Sidebar from "./Sidebar";

const StyledAppLayout = styled.div`
  display: grid;
  height: 100vh;
  grid-template-columns: 16rem 1fr;
  grid-template-rows: auto 1fr;
  grid-template-areas:
    "header header"
    "sidebar main";
`;

const HeaderContainer = styled.div`
  grid-area: header;
`;

const SidebarContainer = styled.div`
  grid-area: sidebar;
`;

const Main = styled.main`
  grid-area: main;
  background-color: var(--color-grey-50);
  padding: 2rem 3rem 3.2rem;
  overflow: scroll;
`;

const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
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

function AppLayout({ filterArtists, setFilterArtists }) {
  return (
    <StyledAppLayout>
      <HeaderContainer>
        <Header />
      </HeaderContainer>
      <SidebarContainer>
        <Sidebar
          filterArtists={filterArtists}
          setFilterArtists={setFilterArtists}
        />
      </SidebarContainer>

      <Main>
        <Container>
          <Outlet />
        </Container>
      </Main>
    </StyledAppLayout>
  );
}

export default AppLayout;
