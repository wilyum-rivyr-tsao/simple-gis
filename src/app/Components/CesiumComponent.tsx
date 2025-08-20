'use client'

import React from 'react'
import type { CesiumType } from '../types/cesium'
import { Cesium3DTileset, type Entity, type Viewer } from 'cesium';
import type { Position } from '../types/position';
//NOTE: It is important to assign types using "import type", not "import"
import { dateToJulianDate } from '../example_utils/date';
//NOTE: This is required to get the stylings for default Cesium UI and controls
import 'cesium/Build/Cesium/Widgets/widgets.css';
import { useMap } from '../context/MapContext';


export const CesiumComponent: React.FunctionComponent<{
    CesiumJs: CesiumType,
    positions: Position[]
}> = ({
    CesiumJs,
    positions
}) => {
    const cesiumViewer = React.useRef<Viewer | null>(null);
    const cesiumContainerRef = React.useRef<HTMLDivElement>(null);
    const addedScenePrimitives = React.useRef<Cesium3DTileset[]>([]);
    const [isLoaded, setIsLoaded] = React.useState(false);
    const { setViewer } = useMap();

    // 在创建viewer后设置到context
    React.useEffect(() => {
        if (cesiumViewer.current === null && cesiumContainerRef.current) {
            //OPTIONAL: Assign access Token here
            //Guide: https://cesium.com/learn/ion/cesium-ion-access-tokens/
            CesiumJs.Ion.defaultAccessToken = `${process.env.NEXT_PUBLIC_CESIUM_TOKEN}`;

            // 创建查看器，避免使用错误的属性
            cesiumViewer.current = new CesiumJs.Viewer(cesiumContainerRef.current, {
                terrain: CesiumJs.Terrain.fromWorldTerrain(),
                baseLayerPicker: false, // 禁用底图选择器
                sceneMode: CesiumJs.SceneMode.SCENE3D
            } as any); // 使用类型断言解决TypeScript错误
            
            // 异步加载影像
            const setupImagery = async () => {
                try {
                    // 使用异步方法加载影像
                    const worldImagery = await CesiumJs.createWorldImageryAsync({
                        style: CesiumJs.IonWorldImageryStyle.AERIAL_WITH_LABELS
                    });
                    
                    // 清除默认图层并添加我们的图层
                    cesiumViewer.current?.imageryLayers.removeAll();
                    cesiumViewer.current?.imageryLayers.addImageryProvider(worldImagery);
                } catch (error) {
                    console.error("加载卫星影像失败:", error);
                }
            };
            
            setupImagery();

            //NOTE: Example of configuring a Cesium viewer
            cesiumViewer.current.clock.clockStep = CesiumJs.ClockStep.SYSTEM_CLOCK_MULTIPLIER;
            
            // 设置viewer到context
            setViewer(cesiumViewer.current);
        }
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [CesiumJs, setViewer]);


    const resetCamera = React.useCallback(async () => {
        // Set the initial camera to look at Seattle
        // No need for dependancies since all data is static for this example.
        if (cesiumViewer.current !== null) {
            cesiumViewer.current.scene.camera.setView({
                destination: CesiumJs.Cartesian3.fromDegrees(-122.3472, 47.598, 370),
                orientation: {
                  heading: CesiumJs.Math.toRadians(10),
                  pitch: CesiumJs.Math.toRadians(-10),
                },
              });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const cleanUpPrimitives = React.useCallback(() => {
        //On NextJS 13.4+, React Strict Mode is on by default.
        //The block below will remove all added primitives from the scene.
        addedScenePrimitives.current.forEach(scenePrimitive => {
            if (cesiumViewer.current !== null) {
                cesiumViewer.current.scene.primitives.remove(scenePrimitive);
            }
        });
        addedScenePrimitives.current = [];
    }, []);
    
    const initializeCesiumJs = React.useCallback(async () => {
        if (cesiumViewer.current !== null) {
            //Using the Sandcastle example below
            //https://sandcastle.cesium.com/?src=3D%20Tiles%20Feature%20Styling.html
            const osmBuildingsTileset = await CesiumJs.createOsmBuildingsAsync();
            
            //Clean up potentially already-existing primitives.
            cleanUpPrimitives();

            //Adding tile and adding to addedScenePrimitives to keep track and delete in-case of a re-render.
            const osmBuildingsTilesetPrimitive = cesiumViewer.current.scene.primitives.add(osmBuildingsTileset);
            addedScenePrimitives.current.push(osmBuildingsTilesetPrimitive);
            
            //Position camera per Sandcastle demo
            resetCamera();

            //We'll also add our own data here (In Philadelphia) passed down from props as an example
            positions.forEach(p => {
                cesiumViewer.current?.entities.add({
                    position: CesiumJs.Cartesian3.fromDegrees(p.lng, p.lat),
                    ellipse: {
                        semiMinorAxis: 50000.0,
                        semiMajorAxis: 50000.0,
                        height: 0,
                        material: CesiumJs.Color.RED.withAlpha(0.5),
                        outline: true,
                        outlineColor: CesiumJs.Color.BLACK,
                    }
                });
            });

            //Set loaded flag
            setIsLoaded(true);

            // eslint-disable-next-line react-hooks/exhaustive-deps
        }
    }, [positions]);

    // 此useEffect已合并到上面的useEffect中

    React.useEffect(() => {
        if (isLoaded) return;
        initializeCesiumJs();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [positions, isLoaded]);

    //NOTE: Examples of typing... See above on "import type"
    const entities: Entity[] = [];
    //NOTE: Example of a function that utilizes CesiumJs features
    const julianDate = dateToJulianDate(CesiumJs, new Date());

    return (
        <div
            ref={cesiumContainerRef}
            id='cesium-container'
            className='w-full h-full'
        />
    )
}

export default CesiumComponent
