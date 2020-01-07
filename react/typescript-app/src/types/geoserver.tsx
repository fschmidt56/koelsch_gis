export interface CredentialsGeoserver<T> {
    username: T,
    password: T
}

export interface TransactionsGeoserver<T, U> {
    featureNS: T,
    featurePrefix: T,
    featureType: T,
    nativeElements: U,
    srsName: T,
}

export const typenameLayer: string = 'bier:koelsch_test';

// TODO Move to separate config file
