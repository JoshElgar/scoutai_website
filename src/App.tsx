import Layout from "./components/Layout";
import TopBar from "./components/TopBar";
import MainContent from "./components/MainContent";
import SoundEffect from "./components/SoundEffect";

function App() {
  return (
    <Layout>
      <div className="w-full h-full">
        <TopBar />
        <MainContent />
        <SoundEffect />
      </div>
    </Layout>
  );
}

export default App;
