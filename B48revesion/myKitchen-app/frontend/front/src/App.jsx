import { Routes, Route } from 'react-router-dom';
import Hme from './pages/Home';
import Favorites from './pages/Favorites';
import RecipeDetail from './pages/RecipeDetail';
import Layout from './components/Layout';
import PrivateRouter from './utils/PrivateRoute';

function App(){

  return(
    <Layout>
      <Router>
        <Route path="/" element = {<Home />}/>
        <Route path="/meal/:id" element={
          <PrivateRoute><RecipeDatail/> </PrivateRoute>
        } />
        <Route path="/favorites"element={
          <PrivateRoute><Favorites/></PrivateRoute>
        }/>
      </Router>
    </Layout>
  );
}

export default App;
