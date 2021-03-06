import MapViewConatainer from './MapView/MapView'
import { Route, Routes } from 'react-router-dom'
import HomePage from './HomePage/HomePage'
import Viewer from './Forge/viewer/Viewer'

const App = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<HomePage></HomePage>} />
                <Route
                    path="/map"
                    element={
                        <div id="MapBody">
                            <MapViewConatainer basemap="gray-vector" zoom="12" />
                        </div>
                    }
                />
                <Route path="/forge" element={<Viewer />} />
            </Routes>
        </>
    )
}

export default App
