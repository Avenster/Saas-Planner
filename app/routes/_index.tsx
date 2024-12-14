import type { MetaFunction } from "@remix-run/node";
import Header from "~/components/Header";
import Hero from "~/components/Hero";
import PricingPage from "~/components/PricingPage";
import AuthPage from "~/components/AuthPage";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className="bg-black h-[200vh]">
      {/* <Header/> */}
      {/* <Hero/> */}
      <AuthPage />


    </div>
  );
}

