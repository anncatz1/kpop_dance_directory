import { Outlet } from "react-router-dom";
import Header from "./Header";
import styled from "styled-components";
import Sidebar from "./Sidebar_2";

const StyledAppLayout = styled.div`
  display: grid;
  height: 100vh;
  grid-template-columns: 17.5rem 1fr;
  grid-template-rows: auto 1fr;
  grid-template-areas:
    "header header"
    "sidebar main";

  @media (max-width: 768px) {
    // Adjusted breakpoint to 768px
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
    grid-template-areas:
      "header"
      "main";
  }
`;

const HeaderContainer = styled.div`
  grid-area: header;
`;

const SidebarContainer = styled.div`
  grid-area: sidebar;

  @media (max-width: 768px) {
    // Hide sidebar on mobile screens
    display: none;
  }
`;

const Main = styled.main`
  grid-area: main;
  background-color: var(--color-grey-50);
  padding: 2rem 3rem 3.2rem;
  overflow: scroll;

  @media (max-width: 1250px) {
    padding: 2rem 2rem;
  }

  @media (max-width: 768px) {
    // Hide sidebar on mobile screens
    padding: 2rem 1rem;
    /* overflow: hidden; */
  }
`;

const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  @media (min-width: 2360px) {
    padding: 0rem 6rem;
  }
  @media (max-width: 1250px) {
    padding: 0rem 2rem;
  }

  @media (max-width: 768px) {
    // Hide sidebar on mobile screens
    padding: 0px;
  }
`;

function AppLayout({
  filterArtists,
  setFilterArtists,
  filterDifficulty,
  setFilterDifficulty,
}) {
  return (
    <StyledAppLayout>
      <HeaderContainer>
        <Header />
      </HeaderContainer>
      <SidebarContainer>
        <Sidebar
          filterArtists={filterArtists}
          setFilterArtists={setFilterArtists}
          filterDifficulty={filterDifficulty}
          setFilterDifficulty={setFilterDifficulty}
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
