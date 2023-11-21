import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import axios from 'axios';

const CustomBarChart = ({ data }) => {
    const [productCountByYear, setProductCountByYear] = useState([])
    const [maxProduct, setMaxProduct] = useState(0);
    const [isLoading, setLoading] = useState(true)
    useEffect(() => {
        getData()
    }, [])
    const getData = async () => {
        await axios.get('https://serverapiecommercefashion.onrender.com/v1/api/admin/statistical', {
            headers: {
                "x-xclient-id": "655992c8b8ffe55cb44e9673",
                "authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTU5OTJjOGI4ZmZlNTVjYjQ0ZTk2NzMiLCJlbWFpbCI6Im5na2hhY2RhaUBnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCRtM1VBWHF5ZTZDZXJ5NHBFNUVHcUZ1M1piOUJtaUhOZFZlUXY0NThZdDNZSlppY1ZwMUlVQyIsImlhdCI6MTcwMDU2OTU4OCwiZXhwIjoxNzAxNDMzNTg4fQ.DiZVBzNFU8zVcYAApG-KQUjLxpQW-AfFouthmOEwiH0"
            }
        }).then((res) => {
            setProductCountByYear(res.data.message.productByYear)
            setMaxProduct(res.data.message.countProducts)
            setLoading(false)
        })
    }
    if (isLoading) {
        return (<>Đợi load dữ liệu</>)
    }
    return (
        <BarChart width={600} height={400} data={productCountByYear}>
            <XAxis dataKey="_id" />
            <YAxis domain={[0, maxProduct]} />
            <Tooltip />
            <Legend />
            <Bar barSize={20} dataKey="productCount" fill="rgba(75,192,192,0.4)" />
        </BarChart>
    );
}

export default CustomBarChart;
