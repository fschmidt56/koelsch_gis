import React, { useState } from 'react';
import { MapBrowserEvent } from 'ol';
import { default as KoelschForm } from './Form';
import Feature, { FeatureLike } from 'ol/Feature';
import { OverlayProps } from '../types/interfaces';
import CloseBtn from './closeBtn';

const Overlay = (props: OverlayProps): JSX.Element => {
    const {
        name,
        style
    } = props

    const [selectedFeature, setSelectedFeature] = useState<FeatureLike>(new Feature())

    if (props.map) {
        props.map.on('click', function (e: MapBrowserEvent): void {
            props.map!.forEachFeatureAtPixel(e.pixel, function showBeer(feature: FeatureLike): void {
                setSelectedFeature(feature);
            })
        })
    }

    if (name === 'info') {
        return (
            <div>
                <div
                    id="overlay"
                    className="overlay"
                    style={style}
                >
                    <KoelschForm
                        name={name}
                        feature={selectedFeature}
                    />
                    <CloseBtn />
                </div>
            </div>

        )
    }
    if (name === 'draw') {
        return (
            <div>
                <div
                    id="overlay"
                    className="overlay"
                    style={style}
                >
                    <KoelschForm
                        name={name}
                        feature={selectedFeature}
                    />
                    <CloseBtn />
                </div>
            </div>

        )
    }
    if (name === 'modify') {
        return (
            <div>
                <div
                    id="overlay"
                    className="overlay"
                    style={style}
                >
                    <KoelschForm
                        name={name}
                        feature={selectedFeature}
                    />
                    <CloseBtn />
                </div>
            </div>

        )
    }
    if (name === 'delete') {
        return (
            <div>
                <div
                    id="overlay"
                    className="overlay"
                    style={style}
                >
                    <KoelschForm
                        name={name}
                        feature={selectedFeature}
                    />
                    <CloseBtn />
                </div>
            </div>

        )
    }
    else {
        return (
            <div>
                <div
                    id="overlay"
                    className="overlay"
                    style={style}
                >
                    {/* <KoelschForm
                        feature={selectedFeature}
                    />
                    <CloseBtn /> */}
                </div>
            </div>

        )
    }
}

export default Overlay;