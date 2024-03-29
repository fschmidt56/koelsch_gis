import React from 'react';
import 'ol/ol.css';

const BeerCap = (props: any) => {

    return (
        <>
            <svg className="shadow" viewBox="0 0 500 500">
                <circle cx="250" cy="250" r="200" stroke="#E0D3AF" stroke-width="15" fill="#E0D3AF" />
                <circle cx="250" cy="250" r="190" stroke="#6b0002" stroke-width="10" fill="transparent" />
                <circle cx="250" cy="250" r="170" stroke="#6b0002" stroke-width="2.5" fill="transparent" />
                <text x="250" y="150" fontSize="10" textAnchor="middle">Gaffel am Dom - Gaffel - 1.8</text>
                <foreignObject x="350" y="138" width="15" height="15">
                    <input type="checkbox" name="" value="" checked />
                </foreignObject>
                <line x1="300" y1="350" x2="320" y2="370" stroke="#474a51" stroke-width="1.25" />
                <line x1="304" y1="350" x2="325" y2="370" stroke="#474a51" stroke-width="1.1" />
                <line x1="300" y1="355" x2="320" y2="381" stroke="#474a51" stroke-width="1.1" />
                <line x1="320" y1="360" x2="304" y2="385" stroke="#474a51" stroke-width="1.2" />
                <line x1="290" y1="360" x2="322" y2="390" stroke="#474a51" stroke-width="1.3" />
            </svg>
        </>
    )
}

export default BeerCap;