import React from 'react';
import "./loader.css";
import { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";


function Loader() {
    const [loading, setLoading] = useState(true);

    return (
        <div>
            <ClipLoader
                color='#4CAF50'
                loading={loading}
                size={60}
            />
        </div>
    )
}

export default Loader;