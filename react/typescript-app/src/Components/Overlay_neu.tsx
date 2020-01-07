import React, { useState, useEffect } from 'react';
import { Map, MapBrowserEvent } from 'ol';
import { default as KoelschForm } from './Form';
import ShowInfo from './ShowInfo';
import Feature, { FeatureLike } from 'ol/Feature';

interface OverlayProps {
    map: Map | null;
}

const Overlay = (props: OverlayProps): JSX.Element => {
    const [style, setStyle] = useState({ width: '0%' })
    const [selectedFeature, setSelectedFeature] = useState<FeatureLike>(new Feature())

    if (props.map) {
        props.map.on('click', function (e: MapBrowserEvent): void {
            props.map!.forEachFeatureAtPixel(e.pixel, function showBeer(feature: FeatureLike): void {
                console.log(feature.get('gastro'));
                console.log(feature.get('bier'));
                console.log(feature.get('preis'));
                setSelectedFeature(feature);
                // //const nameInput = (document.getElementById('name') as HTMLTextAreaElement);
                // const bierInput = (document.getElementById('bier') as HTMLTextAreaElement);
                // const preisInput = (document.getElementById('preis') as HTMLTextAreaElement);
                // nameInput.value = feature.get('gastro');
                // bierInput.value = feature.get('bier');
                // preisInput.value = feature.get('preis');
            })
        })
    }
    

    function hideOverlay(): void {
        const style = { width: '0%' };
        setStyle(style)
    }

    function showOverlay(): void {
        const style = { width: '100%' }
        setStyle(style)
    }

    return (
        <div>
            <ShowInfo onClick={showOverlay} id="infoButton" />
            <div id="overlay" className="overlay" style={style}>
                <KoelschForm feature={selectedFeature}/>
                <a id="closeBtn" className="closebtn" onClick={hideOverlay}>×</a>
            </div>
        </div>
    )
}

export default Overlay;