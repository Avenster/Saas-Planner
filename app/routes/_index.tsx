import type { MetaFunction } from "@remix-run/node";
import Header from "~/components/Header";
import Hero from "~/components/Hero";
import PricingPage from "~/components/PricingPage";
import AuthPage from "~/routes/Login";
import Features from "~/components/Feature";
import Footer from "~/components/Footer";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className="bg-black h-[200vh]">
      <Header/>
      <Hero/>
      <Features/>
      <Footer/>

      {/* <AuthPage /> */}


    </div>
  );
}

