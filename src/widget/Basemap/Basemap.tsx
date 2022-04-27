import BasmapSelection from './basemapSelect'
import { Form } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import { Basemap } from '../library'
import { BaseWigetOption } from '../BaseWidget'

interface BasemapOption extends BaseWigetOption {
    basemap: string
}
const BasemapWidget: React.FC<BasemapOption> = ({ basemap, esri_map }) => {
    const [basemapSetting, setBasemap] = useState<BasemapOption['basemap']>(basemap)
    useEffect(() => {
        let view = esri_map
        if (view) {
            view.map.basemap = Basemap.fromId(basemapSetting)
        }
    }, [basemapSetting, esri_map])
    return (
        <Form.Select
            id="basemapSeletor"
            value={basemapSetting}
            aria-label="Default select example"
            onChange={(event) => setBasemap((prevBaseMap) => event.target.value)}
        >
            <BasmapSelection />
        </Form.Select>
    )
}
export default BasemapWidget
