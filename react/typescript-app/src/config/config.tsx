import WFS from 'ol/format/WFS';
import { CredentialsGeoserver, TransactionsGeoserver } from '../types/geoserver';

export const typenameLayer: string = 'bier:koelsch_test';

export const credentials: CredentialsGeoserver<string> = {
    username: 'admin',
    password: 'geoserver'
};

export const transactionParameters: TransactionsGeoserver<string, object[]> = {
    featureNS: 'bier',
    featurePrefix: 'bier',
    featureType: typenameLayer,
    nativeElements: [],
    srsName: 'EPSG:3857',
};

export const xhr: XMLHttpRequest = new XMLHttpRequest();
export const geoserverTransactionURL: string = 'http://10.133.7.119/geoserver/wfs?service=wfs&version=1.1.0';
export const wfsTransaction: WFS = new WFS();
