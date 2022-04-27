import { useEffect, useRef } from 'react'
import { Legend } from '../library'
import { BaseWigetOption } from '../BaseWidget'

const LegendDiv: React.FC<BaseWigetOption> = ({ esri_map }) => {
    const legendDiv = useRef(null)
    useEffect(() => {
        let view = esri_map
        let legendWgt: Legend | undefined
        if (view && !legendWgt && legendDiv.current) {
            legendWgt = new Legend({
                view: view,
                container: legendDiv.current,
            })
        }
    }, [esri_map])
    return (
        <>
            <div id="BasemapGallery" ref={legendDiv}></div>
        </>
    )
}
export default LegendDiv
