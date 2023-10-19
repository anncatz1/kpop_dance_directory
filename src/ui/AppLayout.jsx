import { Outlet } from "react-router-dom";
import Header from "./Header";
import styled from "styled-components";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

const StyledAppLayout = styled.div`
  display: grid;
  height: 100vh;
  grid-template-columns: 17.5rem 1fr;
  grid-template-rows: auto 1fr;
  grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
    grid-template-areas:
      "header"
      "main"
      "footer";
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

const FooterContainer = styled.div`
  grid-area: footer;
`;

const Main = styled.main`
  grid-area: main;
  background-color: var(--color-grey-50);
  padding: 2rem 3rem 3.2rem;
  overflow: scroll;

  @media (max-width: 1600px) {
    padding: 1.5rem 1rem;
  }

  @media (max-width: 1250px) {
    padding: 2rem 2rem;
  }

  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }
`;

const Container = styled.div`
  max-width: 120rem;
  margin: 0rem auto 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  /* padding: 0rem 5rem; */

  @media (min-width: 2360px) {
    padding: 0rem 6rem;
  }
  @media (max-width: 1600px) {
    padding: 0rem 1rem;
  }

  @media (max-width: 768px) {
    padding: 0px;
  }
`;

function AppLayout({
  filterArtists,
  setFilterArtists,
  filterDifficulty,
  setFilterDifficulty,
  searchField,
  setSearchField,
}) {
  return (
    <StyledAppLayout>
      <HeaderContainer>
        <Header
          filterArtists={filterArtists}
          setFilterArtists={setFilterArtists}
          filterDifficulty={filterDifficulty}
          setFilterDifficulty={setFilterDifficulty}
          searchField={searchField}
          setSearchField={setSearchField}
        />
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

      <FooterContainer>
        <Footer />
      </FooterContainer>
    </StyledAppLayout>
  );
}

export default AppLayout;
