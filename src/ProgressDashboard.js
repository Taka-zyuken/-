import React, { useEffect, useState } from 'react';

function ProgressDashboard() {
    const [progressData, setProgressData] = useState({});

    useEffect(() => {
        const fetchProgress = async () => {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:4000/api/user/progress', {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await response.json();
            setProgressData(data);
        };
        fetchProgress();
    }, []);

    return (
        <div>
            <h2>学習進捗</h2>
            <pre>{JSON.stringify(progressData, null, 2)}</pre>
        </div>
    );
}

export default ProgressDashboard;
