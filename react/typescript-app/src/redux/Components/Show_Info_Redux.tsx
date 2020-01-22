import React from 'react';
import Button from '../../Components/Button';
import { InfoProps } from '../../types/interfaces';
import Overlay from '../../Components/Overlay';
import { MapBrowserEvent } from 'ol';
import Feature, { FeatureLike } from 'ol/Feature';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../stores/store';
import { setSelectedFeature } from '../actions';

const mapListeners = [];

const ShowInfo = (props: InfoProps): JSX.Element => {

    const selectedFeature = useSelector((state: RootState) => state.currentMapState.selectedFeature)
    const dispatch = useDispatch()

    const {
        map,
        isActive,
        onActiveChange,
        ...passThroughProps
    } = props;

    let prevSelected: Feature[] = []

    if (map) {
        if (mapListeners.length === 0) {
            const mapListener = map.on('click', function (e: MapBrowserEvent): void {
                map!.forEachFeatureAtPixel(e.pixel, (feature: Feature | FeatureLike): void => {
                    let castedFeature: Feature = feature as Feature;
                    prevSelected.unshift(castedFeature)
                    dispatch(setSelectedFeature(prevSelected[0]));
                    prevSelected[0].set('selected', true);
                    if (prevSelected.length > 1) {
                        prevSelected[1].set('selected', false);
                    }
                    prevSelected.splice(1)
                });
            });
            mapListeners.push(mapListener);
        }
    }

    function handleClick() {
        props.onActiveChange(isActive ? false : true);
    }

    return (
        <>
            <Button
                id="infoButton"
                fai='fa fa-info fa-2x'
                onClick={handleClick}
                className={isActive ? 'Button active' : 'Button'}
                {...passThroughProps}
            />
            {
                isActive ?
                    <Overlay
                        map={map}
                        name='info'
                        feature={selectedFeature}
                    /> :
                    null
            }
        </>
    )
}

export default ShowInfo;