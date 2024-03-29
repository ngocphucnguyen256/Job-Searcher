import React from "react";
import Header from "../partials/Header";
import PageIllustration from "../partials/PageIllustration";
import Footer from "../partials/Footer";
import img from "../images/404.jpg";

function PageNotFound() {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Header />

      <main className="flex-grow">
        <h1>404</h1>

        <div
          className="relative max-w-6xl mx-auto h-0 pointer-events-none"
          aria-hidden="true"
        >
          <PageIllustration />
        </div>

        <section className="relative">
          <img className="rounded-full" src={img} alt="404" />
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default PageNotFound;
