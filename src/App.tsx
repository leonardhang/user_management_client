// App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import Login from './pages/login/login';
import { routes } from './router/routes';

const renderRoutes = (routes: any) =>
  routes.map((route: any) =>
    route.children ? renderRoutes(route.children) : (
      <Route path={route.path} element={route.element} key={route.path} />
    )
  );

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} /> 
      <Route path="/" element={<MainLayout />}>
        {renderRoutes(routes)}
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;
