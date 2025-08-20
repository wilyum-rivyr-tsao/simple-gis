// src/app/Components/SideBar.tsx
'use client'
import { useMap } from '../context/MapContext';

const SideBar = () => {
  const { flyToLocation } = useMap();
  
  const goToBeijing = () => {
    // 北京的坐标 - 向下调整纬度值
    flyToLocation(38.7, 116.4074, 100000);
  };
  
  return (
    <aside className="w-40 bg-gray-100 shadow-inner">
      <div className="px-3 py-4">
        <div className="pl-2 mb-2 font-medium text-gray-800">导航菜单</div>
        <nav>
          <ul>
            <li className="mb-1">
              <a href="#" className="flex items-center px-2 py-2 text-gray-700 rounded-md hover:bg-gray-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                首页
              </a>
            </li>
            <li className="mb-1">
              <button 
                onClick={goToBeijing}
                className="flex items-center w-full px-2 py-2 text-blue-600 rounded-md hover:bg-blue-100"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                去北京
              </button>
            </li>
            <li className="mb-1">
              <a href="#" className="flex items-center px-2 py-2 text-gray-700 rounded-md hover:bg-gray-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                探索
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default SideBar;
