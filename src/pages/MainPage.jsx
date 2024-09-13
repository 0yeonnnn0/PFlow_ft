import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      {/* 은하수 애니메이션 배경 */}
      <div className="absolute inset-0">
        <div className="stars"></div>
        <div className="twinkling"></div>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white">
        <h1 className="text-6xl font-bold mb-8 animate-pulse">PFlow</h1>
        <p className="text-xl mb-8 text-center max-w-md">
          Development support app for beginners
        </p>
        <div className="flex space-x-4">
          <Link
            to="/results"
            className="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition duration-300"
          >
            View Projects
          </Link>
          <Link
            to="/login"
            className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition duration-300"
          >
            Login
          </Link>
        </div>
      </div>

      <style jsx>{`
        .stars,
        .twinkling {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          width: 100%;
          height: 100%;
          display: block;
        }

        .stars {
          background: #000 url("https://i.imgur.com/YKY28eT.png") repeat top
            center;
          z-index: 0;
        }

        .twinkling {
          background: transparent url("https://i.imgur.com/XYMF4ca.png") repeat
            top center;
          z-index: 1;
          animation: move-twink-back 200s linear infinite;
        }

        @keyframes move-twink-back {
          from {
            background-position: 0 0;
          }
          to {
            background-position: -10000px 5000px;
          }
        }
      `}</style>
    </div>
  );
};

export default HomePage;
