import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import '@arcgis/core/assets/esri/themes/light/main.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@esri/calcite-components/dist/calcite/calcite.css'
import { BrowserRouter } from 'react-router-dom'
import { Container, Nav, Navbar } from 'react-bootstrap'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
    <BrowserRouter>
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand className="d-inline-block align-top" href="/">
                    React Arcgis TypeScript
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/About">About</Nav.Link>
                        <Nav.Link href="/pricing">Pricing</Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link href="#deets">More deets</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        <App />
    </BrowserRouter>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
