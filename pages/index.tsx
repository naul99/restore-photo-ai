import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Chip from "../components/Chip";
import Footer from "../components/Footer";
import Header from "../components/Header";
import SquigglyLines from "../components/SquigglyLines";

const Home: NextPage = () => {
  return (
    <div className="flex max-w-6xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
      <Head>
        <title>Khôi phục ảnh cũ chất lượng cao - khoiphucanh.com</title>
      </Head>

      <Header />
      <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 sm:mt-28 mt-20">
        <h1 className="mx-auto max-w-4xl font-display text-5xl font-bold tracking-normal text-slate-900 sm:text-7xl">
          Khôi phục ảnh cũ{" "}
          <span className="relative whitespace-nowrap">
            <SquigglyLines />
            <span className="relative text-transparent bg-clip-text bg-gradient-to-br to-[#6A3DE8] from-[#536DFE]">
              sử dụng AI
            </span>
          </span>{" "}
          miễn phí.
        </h1>

        <p className="mx-auto mt-12 max-w-xl text-lg text-slate-700 leading-7">
          Công cụ khôi phục những hình ảnh bị mờ và lưu giữ lại những kỷ niệm
          với chất lượng tốt hơn. Hoàn toàn miễn phí - Khôi phục ảnh của bạn
          ngay hôm nay.
        </p>
        <div className="flex justify-center space-x-4">
          <a
            className="bg-white rounded-xl text-black font-medium px-4 py-3 sm:mt-10 mt-8 hover:bg-gray-100 border"
            href="#example"
          >
            Xem ví dụ
          </a>

          <Link
            className="bg-gradient-to-br to-[#6A3DE8] from-[#536DFE] rounded-xl text-white font-medium px-4 py-3 sm:mt-10 mt-8 hover:bg-indigo-700"
            href="/khoi-phuc-khuon-mat"
          >
            Bắt đầu khôi phục ảnh
          </Link>
        </div>
        <div
          id="example"
          className="flex justify-between items-center w-full flex-col sm:mt-10 mt-6"
        >
          <div className="flex flex-col space-y-10 mt-4 mb-16">
            <div className="flex sm:space-x-2 sm:flex-row flex-col">
              <div>
                <h2 className="mb-1 font-medium text-lg">Ảnh gốc</h2>
                <Image
                  alt="Ảnh gốc"
                  src="/original.jpeg"
                  className="w-96 h-96 rounded-2xl"
                  width={400}
                  height={400}
                />
              </div>
              <div className="sm:mt-0 mt-8">
                <h2 className="mb-1 font-medium text-lg">Sau khi khôi phục</h2>
                <Image
                  alt="Ảnh đã khôi phục"
                  width={400}
                  height={400}
                  src="/restored.jpeg"
                  className="w-96 h-96 rounded-2xl sm:mt-0 mt-2"
                />
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* <Testimonials /> */}
      <Footer />
    </div>
  );
};

export default Home;
