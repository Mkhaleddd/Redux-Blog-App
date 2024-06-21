import React from "react"
import { Link } from "react-router-dom"

export default function NotFound() {
    return (
        <div >
            <h1  aria-label="assertive">Sorry, the page you were looking for was not found.</h1>
            <Link to="/" className="link accent-pr" >Return to Home</Link>
        </div>
    )
}
