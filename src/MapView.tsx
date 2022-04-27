import EditorDiv from './widget/Editor/Editor'

import { useRef, useEffect, useState } from 'react'
import { ArcGISMap, MapView, Point, FeatureLayer } from './widget/library'
import './App.css'
import BasemapWidget from './widget/Basemap/Basemap'
// import { ViewContext } from './context/ViewContext'
interface mapContainer extends React.ComponentPropsWithRef<'div'> {
    basemap: string
    zoom?: string
}

const MapViewConatainer: React.FC<mapContainer> = ({ basemap, zoom }) => {
    const mapDiv = useRef(null)

    const createMapView = () => {
        if (mapDiv.current) {
            const map = new ArcGISMap({
                basemap: basemap,
            })
            const view = new MapView({
                container: mapDiv.current,
                map: map,
                center: new Point({
                    spatialReference: {
                        wkid: 102140,
                    },
                    x: 831398.6389631587,
                    y: 840747.2377068244,
                }),
                zoom: 13,
            })
            const layer = new FeatureLayer({
                // URL to the service
                url: 'https://hsksht1pappw072.as.aecomnet.com/server/rest/services/Hosted/Editor_test/FeatureServer/0',
            })
            map.add(layer)
            return view
        }
    }
    let [view, setView] = useState<MapView>()
    useEffect(() => {
        if (!view) setView(createMapView())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [view])
    return (
        <>
            <div className="mapDiv" ref={mapDiv}></div>
            <EditorDiv esri_map={view} />
            <BasemapWidget basemap={basemap} esri_map={view}></BasemapWidget>
        </>
    )
}

export default MapViewConatainer
