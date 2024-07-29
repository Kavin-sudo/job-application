import React from 'react'
import { Outlet } from 'react-router-dom'


const RootLayOut = () => {


    return (
             <div className="App">
                    <main>
                        < Outlet />
                    </main>
            </div>
    )
}

export default RootLayOut