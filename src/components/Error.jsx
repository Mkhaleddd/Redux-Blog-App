import React from "react"
import { useRouteError } from "react-router-dom"


export default function Error() {
const error=useRouteError();
    return (
        <>
          <h2  aria-label="assertive">Error:{error.message}</h2>
          <pre  aria-label="assertive">{error.status}-{error.statusText}</pre>
        </>
       
    
    )
}