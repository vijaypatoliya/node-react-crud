import { Fragment } from "react"
import Header from "./Header"
import Sidebar from "./Sidebar"
import Container from "./Container"

const Layout = () => {
return(
    <Fragment>
    <Header />
    <Sidebar />
    <Container />
    </Fragment>
)
}

export default Layout