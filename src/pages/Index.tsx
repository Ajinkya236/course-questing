
import { Navigate } from 'react-router-dom';

const Index = () => {
  // Redirect to the Home page
  return <Navigate to="/" replace />;
};

export default Index;
