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
import { EntryPage, ckeckLogin, logout } from './LoginTool/LoginPage'
import mainLogo from './logo192.png'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
const loginCheck = () => {
    let loginData = ckeckLogin()
    if (!loginData) return <EntryPage />
    else {
        return (
            <>
                <BrowserRouter>
                    <Navbar bg="dark" variant="dark" role="banner">
                        <Container>
                            <Navbar.Brand className="d-inline-block align-top" href="/">
                                <img
                                    src={mainLogo}
                                    width="30"
                                    height="30"
                                    className="d-inline-block align-top"
                                    alt="React Bootstrap logo"
                                />
                                React TypeScript
                            </Navbar.Brand>
                            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                            <Navbar.Collapse id="responsive-navbar-nav">
                                <Nav className="me-auto">
                                    <Nav.Link href="/map">Map</Nav.Link>
                                    <Nav.Link href="/forge">Forge</Nav.Link>
                                </Nav>
                                <Nav>
                                    <Navbar.Text>{loginData.name}</Navbar.Text>
                                    <Nav.Link href="/" onClick={logout}>
                                        Log Out
                                    </Nav.Link>
                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                    <App />
                </BrowserRouter>
            </>
        )
    }
}
root.render(loginCheck())

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
