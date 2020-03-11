import { datasource } from './vectorlayer';
import { Map } from 'ol';
import BaseLayer from 'ol/layer/Base';
import SimpleGeometry from 'ol/geom/SimpleGeometry';

//check Input fields for letters whitespaces only
export function checkInputLetters(value: string): boolean {
    return /^[A-zäöüÄÖÜß ]+$/.test(value);
}
//check Input fields for numbers only
export function checkInputNumbers(number: string): boolean {
    return /^\d+(\.\d+)?$/.test(number);
}

export function refreshData() {
    datasource!.clear()
    datasource!.refresh()
}
//zoom to last created layer
export function zoomToLayer(map: Map | null): void {
    const activeLayers: BaseLayer[] = map!.getLayers().getArray();
    const lastActive: BaseLayer | undefined = activeLayers[activeLayers.length - 1];
    const lastExtent: number[] | SimpleGeometry | undefined = lastActive!.getExtent();
    //@ts-ignore
    map!.getView().fit(lastExtent, { duration: 2000 });
}
//delete last created route
export function deleteLastRoute(map: Map | null): void {
    if (map!.getLayers().getArray().length >= 3) {
        const activeLayers: BaseLayer[] = map!.getLayers().getArray();        
        const removedRoute: BaseLayer = activeLayers[activeLayers.length - 2]
        const removedWaypoints: BaseLayer = activeLayers[activeLayers.length - 1]
        map!.removeLayer(removedRoute);
        map!.removeLayer(removedWaypoints);
    }
}

