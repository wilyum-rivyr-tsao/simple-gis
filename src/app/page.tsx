import React from "react";
import styles from "./page.module.css";
import MainPage from "./main/page";

export default function Home() {
  return (
    <main>
      <a
        className="fixed z-10 p-4 text-white bg-black rounded-lg cursor-pointer top-1 left-1"
        href='https://github.com/hyundotio/nextjs-ts-cesium-example'
        target='_blank'
        rel='noreferrer noopener'
      >
        GitHub Source link
      </a>
      <MainPage />
    </main>
  );
}
