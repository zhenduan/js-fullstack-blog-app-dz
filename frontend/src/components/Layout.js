import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <div className="text-center bg-gray-100 py-3  flex justify-center items-center">
        <p>
          Blogs may take a moment to load as the App is hosted on free services.
        </p>
      </div>
      <main className="flex-grow container mx-auto p-4 min-h-screen">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
