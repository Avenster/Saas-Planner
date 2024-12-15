import type { MetaFunction } from "@remix-run/node";
import Header from "~/components/Header";
import Hero from "~/components/Hero";
import Features from "~/components/Feature";
import Layout from "~/components/Layout";
export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <Layout>
      <div className="bg-black min-h-screen">
        <Hero />
        <Features />
      </div>
    </Layout>
  );
}
