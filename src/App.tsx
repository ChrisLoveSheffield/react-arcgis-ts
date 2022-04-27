import MapViewConatainer from './MapView'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@esri/calcite-components/dist/calcite/calcite.css'

const App = () => {
    return (
        <>
            <MapViewConatainer basemap="topo-vector" zoom="12" />
        </>
    )
}

export default App
