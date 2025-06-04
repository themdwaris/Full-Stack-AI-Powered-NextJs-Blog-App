import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { BlogContextProvider } from "@/context/BlogContext";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";
import "quill/dist/quill.snow.css"

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  // weight: ["100","200","300","400", "500", "600", "700"],
});

export const metadata = {
  title: "Blogian",
  description: "Blogs website where you can write or add your own blog",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${jakarta.className} `}>
        <BlogContextProvider>
          <div className="w-full min-h-screen bg-black text-slate-200 ">
            <Header />
            <Toaster />
            {children}
            <Footer />
          </div>
        </BlogContextProvider>
      </body>
    </html>
  );
}
