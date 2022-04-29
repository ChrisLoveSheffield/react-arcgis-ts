import MapViewConatainer from './MapView/MapView'
import { Route, Routes } from 'react-router-dom'
import HomePage from './HomePage/HomePage'

const App = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<HomePage></HomePage>} />
                <Route
                    path="/Map"
                    element={
                        <div id="MapBody">
                            <MapViewConatainer basemap="gray-vector" zoom="12" />
                        </div>
                    }
                />
                <Route path="/About" element={123} />
            </Routes>
        </>
    )
}

export default App
