import React from 'react';
import Button from '../../Components/Button';
import { RootState } from '../stores/store';
import { showOverlay } from '../actions/showOverlayAction';
import { RouteProps, IRoute } from '../../types/interfaces';
import { useSelector, useDispatch } from 'react-redux';
import Overlay from '../../Components/Overlay';
import Draw, { DrawEvent } from 'ol/interaction/Draw';
import { MapUtils } from '../../utils/MapUtils';
import { EventsKey, geom } from 'openlayers';
import { refreshData, checkInputNumbers, zoomToLayer, deleteLastRoute } from '../../utils/otherFunctions';
import Point from 'ol/geom/Point';
import { Feature, } from 'ol';
import { destEpsg, srcEpsg, routingURL, orsHeaders, geoJsonURL } from '../../config/config';
import { getDistance } from 'ol/sphere';
import { boundingExtent } from 'ol/extent';

const draw: Draw = MapUtils.createDraw();
let listenerFunctions: EventsKey[] = [];

const CalculateRoute = (props: RouteProps): JSX.Element => {

    let routeArr: number[][] = [];

    const {
        isActive,
        map
    } = props

    const overlay = useSelector((state: RootState) => state.currentOverlayState.overlay);
    const dispatch = useDispatch();

    //neue draw interaction
    if (map) {
        map.addInteraction(draw);
        draw.setActive(isActive);
        if (listenerFunctions.length === 0) {
            let listenerFunction = draw.on('drawend', displayOverlay);
            listenerFunctions.push(listenerFunction);
            console.log('Added route interaction to map.');
        }
    }
    //onClick routeButton
    function getRoutePoints() {
        props.onActiveChange(!isActive ? true : false);
        draw.setActive(isActive);
        refreshData();
    }

    //get Array of Coordinates in EPSG:4326 and display Overlay
    function displayOverlay(e: DrawEvent) {
        let createdFeature: Feature = e.feature;
        //@ts-ignore
        let createdFeatureGeom: Point = createdFeature.getGeometry() as geom.Point;
        //@ts-ignore
        let transformedGeom: Point = createdFeatureGeom.transform(srcEpsg, destEpsg) as geom.Point;
        let transformedCoords: number[] = transformedGeom.getCoordinates();
        routeArr.push(transformedCoords);
        routeArr.length === 2 ?
            dispatch(showOverlay(
                <Overlay
                    map={map}
                    name='route'
                    feature={createdFeature}
                    onSaveClick={onSaveClick}
                />
            ))
            :
            routeArr.length < 2 ? console.log('Add second point.') : routeArr.splice(0, routeArr.length)
    }

    const onSaveClick = (feature: Feature) => {
        deleteLastRoute(map)
        if (checkInputNumbers(feature.get('anzahl')) && checkInputNumbers(feature.get('budget'))) {
            let numberOfBars: number = feature.get('anzahl');
            let budget: number = feature.get('budget');
            let centerX: number = (routeArr[0][0] + routeArr[1][0]) / 2
            let centerY: number = (routeArr[0][1] + routeArr[1][1]) / 2
            let centerArr: number[] = [centerX, centerY]
            let routeDistance = getDistance(routeArr[0], routeArr[1]);
            let extent: number[] = boundingExtent(routeArr);
            routeArr.push(centerArr)
            let body: IRoute<number> = {
                bars: numberOfBars,
                budget: budget,
                radius: routeDistance / 2,
                startPoint: routeArr[0],
                endPoint: routeArr[1],
                center: routeArr[2],
                distance: routeDistance,
                extent: extent
            };
            fetch(routingURL, {
                method: 'POST',
                headers: orsHeaders,
                mode: 'cors',
                body: JSON.stringify(body)
            })
                .then(response => response.json())
                .then(geojson => MapUtils.createVectorSource(geojson))
                .then(source => MapUtils.createVectorLine(source))
                .then(layer => map!.addLayer(layer))      
                .then(() => zoomToLayer(map))          
                .then(() => {
                    return fetch(geoJsonURL, {
                        method: 'GET',
                        headers: orsHeaders,
                        mode: 'cors',
                    })
                        .then(response => response.json())
                        .then(geojson => MapUtils.createVectorSource(geojson))
                        .then(source => MapUtils.createVectorPoint(source))
                        .then(layer => map!.addLayer(layer))
                })
                .catch(error => console.log(error + 'Could not calculate route.'));

        }
        else {
            console.log('Error: No Route calculated. Field "Anzahl" must have value between 2 and 12. Field "Budget" must have value between 5 and 30.');
        }
        refreshData();
        draw.setActive(!draw.getActive());
        props.onActiveChange(draw.getActive());
        dispatch(showOverlay(null));
    }

    return (
        <>
            <Button
                id='routeButton'
                className={isActive ? 'Button active' : 'Button'}
                fai='fa fa-map-signs fa-2x'
                onClick={getRoutePoints}
            />
            {
                isActive ?
                    overlay
                    :
                    null
            }
        </>
    )

};

export default CalculateRoute;