import WFS from 'ol/format/WFS';
import GeometryType from 'ol/geom/GeometryType';
import { CredentialsGeoserver, TransactionsGeoserver } from '../types/interfaces';

//Geoserver
export const credentials: CredentialsGeoserver<string> = {
    username: 'admin',
    password: 'geoserver',
    connectionString: 'admin:geoserver'
};

export const typenameLayer: string = 'bier:koelsch_test';

export const transactionParameters: TransactionsGeoserver<string, object[]> = {
    featureNS: 'bier',
    featurePrefix: 'bier',
    featureType: typenameLayer,
    nativeElements: [],
    srsName: 'EPSG:3857',
};


//transactions
export const requestHeaders = new Headers({
    'Content-Type': 'text/plain',
    'Authorization': 'Basic ' + btoa(credentials.connectionString)  
});
export const wfsTransaction: WFS = new WFS();

//URLs
export const geoserverTransactionURL: string = 'http://10.133.7.119/geoserver/wfs?service=wfs&version=1.1.0';
export const baseLayerURL = 'https://{1-4}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';

//map-properties
export const mapCenter = [774444.5768, 6611028.9864];
export const mapZoom = 11;
export const rotationStatus = false;

//edit properties
export const geometryType: GeometryType = GeometryType.POINT;



