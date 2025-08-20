// src/app/Components/SideBar.tsx
'use client'
import { useMap } from '../context/MapContext';

const SideBar = () => {
  const { flyToLocation, drawFlightPath, isDrawingFlightPath } = useMap();
  
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
              <button 
                onClick={goToBeijing}
                className="flex items-center w-full px-2 py-2 rounded-md hover:bg-blue-100"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                去北京
              </button>
            </li>

            <li className="mb-1">
              <button 
                onClick={drawFlightPath}
                className={`flex items-center w-full px-2 py-2  rounded-md hover:bg-blue-100`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                {isDrawingFlightPath ? '完成航线' : '画航线'}
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default SideBar;
