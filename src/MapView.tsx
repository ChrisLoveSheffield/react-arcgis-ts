import { useRef, useEffect, useState } from 'react'
import { ArcGISMap, MapView, Basemap } from './widget/library'
import './App.css'

declare global {
    interface Window {
        esriMap: ArcGISMap
    }
}

interface mapContainer extends React.ComponentPropsWithRef<'div'> {
    basemap?: string
    zoom?: string
}

const MapViewConatainer = (props: mapContainer) => {
    const mapDiv = useRef(null)
    const createMapView = () => {
        if (mapDiv.current) {
            const map = new ArcGISMap({
                basemap: props.basemap,
            })

            const view = new MapView({
                map,
                container: mapDiv.current,
                extent: {
                    spatialReference: {
                        wkid: 102100,
                    },
                    xmax: -13581772,
                    xmin: -13584170,
                    ymax: 4436367,
                    ymin: 4435053,
                },
            })
            window.esriMap = map
            return view
        }
    }
    const [view, setView] = useState<MapView | undefined | null>(null)
    useEffect(() => {
        setView(createMapView())
    }, [])

    useEffect(() => {
        if (view) {
            view.map.basemap = Basemap.fromId(props.basemap ?? 'topo-vector')
        }
    }, [props.basemap, view])
    useEffect(() => {
        if (!view) return
        const handle = view.on('click', (e) => console.log(e))
        return () => {
            handle && handle.remove()
        }
    }, [view])
    return (
        <>
            <div className="mapDiv" ref={mapDiv}></div>
        </>
    )
}

export default MapViewConatainer
