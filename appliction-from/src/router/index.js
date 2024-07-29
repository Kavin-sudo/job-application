import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import RootLayOut from '../layOut/RootLayOut';
import Form from '../Components/Form';
import DataTable from '../Components/DataTable';


const router = createBrowserRouter([

    {
        path: '',
        element: <RootLayOut />,
        children: [
            { index: true, element: <Form /> },
            { path: "table", element: <DataTable /> }
        ],

    }
]);

export default function RouterPage() {
    return <RouterProvider router={router} />;
}

