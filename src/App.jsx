import Sidebar from "./Sidebar";
import Feed from "./Feed";
import Suggestions from "./Suggestions";

function App() {
  return (
    <div className="container">
      <div className="row">

        {/* Sidebar - Hidden on Mobile */}
        <div className="d-none d-md-block col-md-3">
          <Sidebar />
        </div>

        {/* Feed - Full width on Mobile */}
        <div className="col-12 col-md-9 col-lg-6">
          <Feed />
        </div>

        {/* Suggestions - Only Desktop */}
        <div className="d-none d-lg-block col-lg-3">
          <Suggestions />
        </div>

      </div>
    </div>
  );
}

export default App;
