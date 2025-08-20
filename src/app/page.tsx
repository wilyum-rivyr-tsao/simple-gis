import React from "react";
import styles from "./page.module.css";
import MainPage from "./main/page";
import SideBar from './Components/SideBar';
import { MapProvider } from './context/MapContext';

export default function Home() {
  return (
    <MapProvider>
      <main className="flex flex-col h-screen">
      {/* Header - 更美观的设计 */}
      <header className="flex items-center justify-between w-full px-6 py-4 text-white shadow-lg bg-gradient-to-r from-black to-gray-800">
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="text-xl font-bold">3D地图应用</span>
        </div>
        <a
          href="https://github.com/hyundotio/nextjs-ts-cesium-example"
          target="_blank"
          rel="noreferrer noopener"
          className="flex items-center px-4 py-2 text-sm transition-colors duration-300 bg-gray-700 rounded-md hover:bg-gray-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 mr-2"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
          GitHub Source
        </a>
      </header>

      <div className="flex flex-1 overflow-hidden">
        
        {/* 使用新的SideBar组件 */}
          <SideBar />
          
        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <MainPage />
        </div>
      </div>
      </main>
    </MapProvider>
  );
}
