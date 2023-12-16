import logo            from './assets/mimir.png'
import { Header }      from "./components/Header"
import { MainContent } from "./components/MainContent"


function App() {
  

  return (
    <>
      <header>

          <Header

            title="MiMiR Search"
            logo={logo}
            subtitle="Busque por repositórios GitHub"
          />

      </header>

      <main>
          <MainContent/>

      </main>
    </>
  )
}

export default App
