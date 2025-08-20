// src/app/context/MapContext.tsx
'use client'

import React, { createContext, useContext, useState } from 'react';
import type { CesiumType } from '../types/cesium';

interface MapContextType {
  flyToLocation: (lat: number, lng: number, height?: number) => void;
  cesiumInstance: CesiumType | null;
  setCesiumInstance: (cesium: CesiumType) => void;
  setViewer: (viewer: any) => void;
  drawFlightPath: () => void;
  isDrawingFlightPath: boolean;
  addPointToFlightPath: (lat: number, lng: number) => void;
  clearFlightPath: () => void;
}

export const MapContext = createContext<MapContextType>({
  flyToLocation: () => {},
  cesiumInstance: null,
  setCesiumInstance: () => {},
  setViewer: () => {},
  drawFlightPath: () => {},
  isDrawingFlightPath: false,
  addPointToFlightPath: () => {},
  clearFlightPath: () => {}
});

export const MapProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [cesiumViewer, setCesiumViewer] = useState<any>(null);
  const [cesiumInstance, setCesiumInstance] = useState<CesiumType | null>(null);
  const [isDrawingFlightPath, setIsDrawingFlightPath] = useState(false);
  const [flightPathPoints, setFlightPathPoints] = useState<{lat: number, lng: number}[]>([]);
  const [flightPathEntity, setFlightPathEntity] = useState<any>(null);

  const flyToLocation = (lat: number, lng: number, height: number = 5000) => {
    if (cesiumViewer && cesiumInstance) {
      cesiumViewer.scene.camera.flyTo({
        destination: cesiumInstance.Cartesian3.fromDegrees(lng, lat, height),
        orientation: {
          heading: cesiumInstance.Math.toRadians(0),
          pitch: cesiumInstance.Math.toRadians(-30),
        },
      });
    }
  };

  const setViewer = (viewer: any) => {
    setCesiumViewer(viewer);
  };

  // 开始绘制航线
  const startDrawingFlightPath = () => {
    setIsDrawingFlightPath(true);
    setFlightPathPoints([]);
    // 如果有现有航线，先清除
    if (flightPathEntity && cesiumViewer) {
      cesiumViewer.entities.remove(flightPathEntity);
      setFlightPathEntity(null);
    }
  };

  // 结束绘制航线
  const endDrawingFlightPath = () => {
    setIsDrawingFlightPath(false);
  };

  // 绘制航线
  const drawFlightPath = () => {
    if (isDrawingFlightPath) {
      // 如果已在绘制模式，则结束绘制
      endDrawingFlightPath();
    } else {
      // 否则开始绘制
      startDrawingFlightPath();
    }
  };

  // 更新航线实体
  const updateFlightPathEntity = (points: {lat: number, lng: number}[]) => {
    if (cesiumViewer && cesiumInstance && points.length > 1) {
      // 如果有现有航线，先清除
      if (flightPathEntity) {
        cesiumViewer.entities.remove(flightPathEntity);
      }

      // 创建坐标数组
      const positions = points.map(p => 
        cesiumInstance.Cartesian3.fromDegrees(p.lng, p.lat)
      );

      // 创建新的航线实体
      const entity = cesiumViewer.entities.add({
        polyline: {
          positions: positions,
          width: 3,
          material: cesiumInstance.Color.BLUE,
          clampToGround: true
        }
      });

      setFlightPathEntity(entity);
    }
  };

  // 添加点到航线
  const addPointToFlightPath = (lat: number, lng: number) => {
    if (isDrawingFlightPath) {
      const newPoints = [...flightPathPoints, {lat, lng}];
      setFlightPathPoints(newPoints);
      updateFlightPathEntity(newPoints);
    }
  };

  // 清除航线
  const clearFlightPath = () => {
    if (cesiumViewer && flightPathEntity) {
      cesiumViewer.entities.remove(flightPathEntity);
      setFlightPathEntity(null);
    }
    setFlightPathPoints([]);
    setIsDrawingFlightPath(false);
  };

  return (
    <MapContext.Provider value={{ 
      flyToLocation, 
      cesiumInstance, 
      setCesiumInstance,
      setViewer,
      drawFlightPath,
      isDrawingFlightPath,
      addPointToFlightPath,
      clearFlightPath
    }}>
      {children}
    </MapContext.Provider>
  );
};

export const useMap = () => useContext(MapContext);
