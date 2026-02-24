import AppRoutes from "./AppRoutes";
import AuthProvider from "./features/auth/store/AuthContext";
import PostProvider from "./features/post/store/postContext";

const App = () => {
  return (
    <div>
      <AuthProvider>
        <PostProvider>
          <AppRoutes />
        </PostProvider>
      </AuthProvider>
    </div>
  );
};

export default App;
