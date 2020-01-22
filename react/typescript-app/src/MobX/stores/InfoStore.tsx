import { observable, action } from 'mobx';
import { Feature } from 'ol';
import { IInfoStore } from '../../types/interfaces';

export class InfoStore implements IInfoStore {
    @observable selectedFeature: Feature = new Feature()

    @action setSelectedFeature = (feature: Feature) => {
        this.selectedFeature = feature
    }
};
