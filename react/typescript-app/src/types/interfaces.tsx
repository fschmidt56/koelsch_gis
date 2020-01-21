import { Map } from 'ol';
import Feature from 'ol/Feature';

export interface CredentialsGeoserver<T> {
  username: T,
  password: T,
  connectionString: T
}

export interface TransactionsGeoserver<T, U> {
  featureNS: T,
  featurePrefix: T,
  featureType: T,
  nativeElements: U,
  srsName: T,
}

export interface fillColor<T> {
  color: T,
}

export interface strokeColor<T, U> {
  color: T,
  width: U,
}

export interface MapProps {
  mapStore?: MapState
}

export type ActiveButton = 'draw' | 'modify' | 'delete' | 'info' | undefined

export type OverlayNames = 'draw' | 'modify' | 'delete' | 'info' | undefined

export interface MapState {
  map: BasemapState,
}

export interface KoelschState {
}

export interface KoelschProps {
  feature?: Feature;
  name: OverlayNames;
  map: Map | null;
  onSaveClick?: (feature: Feature) => void;
}

export interface DigitizeButtonProps {
  map: Map | null,
  isActive: boolean,
  onActiveChange: (status: boolean) => void,
}

export interface ModifyProps extends DigitizeButtonProps {
}

export interface DrawProps extends DigitizeButtonProps {
}

export interface SelectProps extends DigitizeButtonProps {
}

export interface InfoProps extends React.HTMLProps<HTMLButtonElement>, DigitizeButtonProps{
}

export interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
  fai: string;
  name?: string;
}

export interface ButtonGroupProps {
  map: BasemapState,
  mapStore?: MapState
}

export interface ButtonGroupState {
  activeButton: ActiveButton
}

export interface OverlayProps {
  map: Map | null;
  name: OverlayNames;
  feature?: Feature;
  onSaveClick?: (feature: Feature) => void | undefined;
}

export type BasemapState = null | Map;

export type InteractionType = null | JSX.Element;

export interface IEditStore {
  overlay: InteractionType
  showOverlay: (overlayName: InteractionType) => void
}

export interface IInfoStore {
  selectedFeature: Feature
  setSelectedFeature: (feature: Feature) => void
}

