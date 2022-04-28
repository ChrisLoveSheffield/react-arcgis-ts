import { useEffect, useRef } from 'react'
import { BasemapGallery } from '../library'
import { BaseWigetOption } from '../BaseWidget'

const BasemapDiv: React.FC<BaseWigetOption> = ({ esri_map }) => {
    const basemapGalleryyDiv = useRef(null)
    useEffect(() => {
        let view = esri_map
        let basemapWgt: BasemapGallery | undefined
        if (view && !basemapWgt && basemapGalleryyDiv.current) {
            basemapWgt = new BasemapGallery({
                view: view,
                container: basemapGalleryyDiv.current,
            })
        }
    }, [esri_map])
    return (
        <>
            <div id="BasemapGallery" ref={basemapGalleryyDiv}></div>
        </>
    )
}
export default BasemapDiv
