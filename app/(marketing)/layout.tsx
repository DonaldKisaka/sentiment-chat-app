import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const MarketingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
        <Nav />
        <main className="flex-1">
            {children}
        </main>
        <Footer />
    </>
  );
};

export default MarketingLayout;