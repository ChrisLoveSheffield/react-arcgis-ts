import MapViewConatainer from './MapView'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@esri/calcite-components/dist/calcite/calcite.css'

const App = () => {
    return (
        <>
            <div id="MapBody">
                <MapViewConatainer basemap="dark-gray-vector" zoom="12" />
            </div>
        </>
    )
}

export default App
