
import React, { useEffect, useState } from 'react';
import { db } from '../firebase/index';
import { collection, getDocs } from 'firebase/firestore';
import './dataTable.css'; // Import the CSS file
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

const DataTable = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
   const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'applicants'));
                const dataList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setData(dataList);
            } catch (error) {
                console.error('Error fetching data: ', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <IoMdArrowRoundBack onClick={() => navigate("/")} style={{ marginTop: "2rem",
            fontSize: "30px", cursor: 'pointer'
}}/>
        <div className="data-table-container">
            <table className="data-table">
                <thead>
                    <tr>
                        <th>Full Name</th>
                        <th>Skills</th>
                        <th>Years of Experience</th>
                        <th>Mobile</th>
                        <th>Email</th>
                        <th>Notice Period</th>
                        <th>Current CTC</th>
                        <th>Expected CTC</th>
                        <th>Resume</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.id}>
                            <td>{item.fullName}</td>
                            <td>{item.skills}</td>
                            <td>{item.yearsOfExp}</td>
                            <td>{item.mobile}</td>
                            <td>{item.email}</td>
                            <td>{item.noticePeriod}</td>
                            <td>{item.currentCTC}</td>
                            <td>{item.expectedCTC}</td>
                            <td><a href={item.resume} target="_blank" rel="noopener noreferrer">View Resume</a></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </div>
    );
};

export default DataTable;
