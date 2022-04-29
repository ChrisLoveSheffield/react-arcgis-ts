import { Component } from 'react'
import { Button, Form } from 'react-bootstrap'
import './css/loginPage.scss'

interface LoginInterface {
    name?: string
    id?: number
    token?: string
}
let loginData: LoginInterface = {}

function logout() {
    localStorage.removeItem('LoginData')
    console.log(localStorage.getItem('LoginData'))
}
function loginAction() {
    loginData.name = 'testUser'
    loginData.id = 1
    loginData.token = 'test'
    localStorage.setItem('LoginData', JSON.stringify(loginData))
}

function ckeckLogin(): false | LoginInterface {
    let data = localStorage.getItem('LoginData')
    if (!data) return false
    else return JSON.parse(data) as LoginInterface
}

class EntryPage extends Component {
    state: {
        currentView: string
    }
    constructor(props: {} | Readonly<{}>) {
        super(props)
        this.state = {
            currentView: 'logIn',
        }
    }

    changeView = (view: string) => {
        this.setState({
            currentView: view,
        })
    }

    currentView = () => {
        switch (this.state.currentView) {
            case 'signUp':
                return (
                    <form>
                        <h2>Create Account</h2>
                        <fieldset>
                            <ul>
                                <li>
                                    <label htmlFor="username">Username:</label>
                                    <input type="text" id="username" required />
                                </li>
                                <li>
                                    <label htmlFor="email">Email:</label>
                                    <input type="email" id="email" required />
                                </li>
                                <li>
                                    <label htmlFor="password">Password:</label>
                                    <input type="password" id="password" required />
                                </li>
                            </ul>
                        </fieldset>
                        <button>Submit</button>
                        <button type="button" onClick={() => this.changeView('logIn')}>
                            Have an Account?
                        </button>
                    </form>
                )
            case 'logIn':
                return (
                    <form onSubmit={() => loginAction()}>
                        <h2>Welcome!</h2>
                        <fieldset>
                            <ul>
                                <li>
                                    <label htmlFor="username">Username:</label>
                                    <input type="text" id="username" required />
                                </li>
                                <li>
                                    <label htmlFor="password">Password:</label>
                                    <input type="password" id="password" required />
                                </li>
                                <li>
                                    <i />
                                    {
                                        // eslint-disable-next-line jsx-a11y/anchor-is-valid
                                        <a onClick={() => this.changeView('PWReset')}>Forgot Password?</a>
                                    }
                                </li>
                            </ul>
                        </fieldset>
                        <button>Login</button>
                        <button type="button" onClick={() => this.changeView('signUp')}>
                            Create an Account
                        </button>
                    </form>
                )
            case 'PWReset':
                return (
                    <form>
                        <h2>Reset Password</h2>
                        <fieldset>
                            <ul>
                                <li>
                                    <em>A reset link will be sent to your inbox!</em>
                                </li>
                                <li>
                                    <label htmlFor="email">Email:</label>
                                    <input type="email" id="email" required />
                                </li>
                            </ul>
                        </fieldset>
                        <button>Send Reset Link</button>
                        <button type="button" onClick={() => this.changeView('logIn')}>
                            Go Back
                        </button>
                    </form>
                )
            default:
                break
        }
    }

    render() {
        return <section id="entry-page">{this.currentView()}</section>
    }
}

function LoginPage() {
    return (
        <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
                <Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    )
}
export { logout, ckeckLogin, LoginPage, EntryPage }
