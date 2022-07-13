import { useRef, useEffect, useState } from 'react'
import { ArcGISMap, MapView, Point, FeatureLayer, esriConfig } from './widget/library'
import '../App.css'
import WidgetPad from './widget/widgetPad'
// import { ViewContext } from './context/ViewContext'
interface mapContainer extends React.ComponentPropsWithRef<'div'> {
    basemap: string
    zoom?: string
}

const MapViewConatainer: React.FC<mapContainer> = ({ basemap, zoom }) => {
    const mapDiv = useRef(null)
    const apikey = '584b2fa686f14ba283874318b3b8d6b0'
    esriConfig.request.interceptors?.push({
        before: function (params) {
            if (params.url.indexOf('api.hkmapservice.gov.hk') >= 0) {
                if (params.requestOptions.query) {
                    params.requestOptions.query.key = apikey
                } else {
                    params.requestOptions.query = {
                        key: apikey,
                    }
                }
            }
        },
    })
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
                url: 'https://api.hkmapservice.gov.hk/ags/map/layer/ib1000/utilities/utilitypolygon',
                layerId: undefined,
                // url: 'https://hsksht1pappw072.as.aecomnet.com/server/rest/services/Hosted/Editor_test/FeatureServer/0',
                outFields: ['*'],
            })
            map.add(layer)

            const eventHandler = (event: any) => {
                view.hitTest(event).then(function (response) {
                    if (response.results.length) {
                        const graphic = response.results[0].graphic
                        const attributes = graphic.attributes
                        console.log(attributes)
                        view.popup.open({
                            // Set the popup
                        })
                    }
                })
            }
            view.on('click', eventHandler)
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
            <WidgetPad esri_map={view}></WidgetPad>
        </>
    )
}

export default MapViewConatainer
