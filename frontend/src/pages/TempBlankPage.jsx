import React from "react";
import { useEffect, useState} from "react";
import axios from "axios";
import { use } from "react";
import API from '../apis/client.js'; // Adjust the import path as needed

function TempBlankPage() {
    const [data, setData] = useState('Loading...');

    useEffect(() => {
        // Fetch data from the backend API
        const fetchData = async () => {
            try {
                const response = await API.get('hello'); // Adjust the endpoint as needed
                setData(response.data.activity);
            } catch (error) {
                console.error('Error fetching data:', error);
                setData('Error loading data');
            }
        }
        fetchData();
    }, []);

    return (
        <div>
            <h1>{data}</h1>
            <p>This page is under construction. Please check back later.</p>
            <p>Feel free to explore other sections of the application.</p>
        </div>
    );
}

export default TempBlankPage;