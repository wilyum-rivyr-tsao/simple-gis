'use client'

import dynamic from 'next/dynamic'
import React from 'react';
import type { CesiumType } from '../types/cesium';
import type { Position } from '../types/position';
import { useMap } from '../context/MapContext';

const CesiumDynamicComponent = dynamic(() => import('./CesiumComponent'), {
    ssr: false
});

export const CesiumWrapper:React.FunctionComponent<{
    positions: Position[]
}> = ({
    positions
}) => {
    const [CesiumJs, setCesiumJs] = React.useState<CesiumType | null>(null);
    const {setCesiumInstance } = useMap()
    
    React.useEffect(() => {
        if (CesiumJs !== null) return
        const CesiumImportPromise = import('cesium');
        Promise.all([CesiumImportPromise]).then((promiseResults) => {
            const { ...Cesium } = promiseResults[0];
            setCesiumJs(Cesium);
            setCesiumInstance(Cesium); 
        });
    }, [CesiumJs,setCesiumInstance]);

    return (
        CesiumJs ? <CesiumDynamicComponent CesiumJs={CesiumJs} positions={positions} /> : null
    )
}

export default CesiumWrapper;