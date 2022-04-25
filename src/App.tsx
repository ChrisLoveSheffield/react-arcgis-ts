import { useState } from 'react'
import MapViewConatainer from './MapView'
import BasmapSelection from './basemapSelect'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Form } from 'react-bootstrap'

const App = () => {
    const [basemap, setBasemap] = useState('topo-vector')

    return (
        <>
            <MapViewConatainer basemap={basemap} zoom="12" />
            <Form.Select
                id="basemapSeletor"
                value={basemap}
                aria-label="Default select example"
                onChange={(event) => setBasemap(event.target.value)}
            >
                <BasmapSelection />
            </Form.Select>
        </>
    )
}

export default App
