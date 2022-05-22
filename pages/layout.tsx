import Navbar from "../components/navbar/navbar";
import Footer from "../components/footer";

export default function Layout(props: { children: any }) {
    return (
        <>
            <Navbar />
            <main>{props.children}</main>
            <div className="bg-guilded-slate text-guilded-white py-2">
                <Footer />
            </div>
        </>
    );
}
