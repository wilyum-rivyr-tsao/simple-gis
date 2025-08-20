// src/app/context/MapContext.tsx
'use client'

import React, { createContext, useContext, useState } from 'react';
import type { CesiumType } from '../types/cesium';

interface MapContextType {
  flyToLocation: (lat: number, lng: number, height?: number) => void;
  cesiumInstance: CesiumType | null;
  setCesiumInstance: (cesium: CesiumType) => void;
  setViewer: (viewer: any) => void;
}

export const MapContext = createContext<MapContextType>({
  flyToLocation: () => {},
  cesiumInstance: null,
  setCesiumInstance: () => {},
  setViewer: () => {}
});

export const MapProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [cesiumViewer, setCesiumViewer] = useState<any>(null);
  const [cesiumInstance, setCesiumInstance] = useState<CesiumType | null>(null);

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

  return (
    <MapContext.Provider value={{ 
      flyToLocation, 
      cesiumInstance, 
      setCesiumInstance,
      setViewer 
    }}>
      {children}
    </MapContext.Provider>
  );
};

export const useMap = () => useContext(MapContext);
