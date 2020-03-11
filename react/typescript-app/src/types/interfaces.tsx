import { Map } from 'ol';
import Feature from 'ol/Feature';
import { ActionTypes } from '../redux/actions';


//INTERFACES
export interface Action_Button {
  type: typeof Action.AButton,
  payload: ActiveButton,
}

export interface Action_Feature {
  type: typeof Action.AFeature,
  payload: Feature,
}

export interface Action_Map {
  type: typeof Action.AMap,
  payload: BasemapState,
}

export interface Action_Overlay {
  type: typeof Action.AOverlay,
  payload: InteractionType,
}

export interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
  fai: string,
  name?: string,
}

export interface ButtonGroupProps {
  map: BasemapState,
  mapStore?: MapState,
}

export interface ButtonGroupState {
  activeButton: ActiveButton,
}

export interface CredentialsGeoserver<T> {
  username: T,
  password: T,
  connectionString: T,
}

export interface DigitizeButtonProps {
  map: Map | null,
  isActive: boolean,
  onActiveChange: (status: boolean) => void,
}

export interface DrawProps extends DigitizeButtonProps {
}

export interface FillColor<T> {
  color: T,
}

export interface IEditStore {
  overlay: InteractionType
  showOverlay: (overlayName: InteractionType) => void
}

export interface IInfoStore {
  selectedFeature: Feature
  setSelectedFeature: (feature: Feature) => void
}

export interface IRoute<T> {
    bars: T,
    budget: T,
    radius: T,
    startPoint: T[],
    endPoint: T[],
    center: T[],
    distance: T,
    extent: T[]
}

export interface InfoProps extends React.HTMLProps<HTMLButtonElement>, DigitizeButtonProps{
}

export interface InitialButtonState {
  activeButton: ActiveButton,
}

export interface InitialFeatureState {
  selectedFeature: Feature,
}

export interface InitialMapState {
  map: null | Map,
}

export interface InitialOverlayState {
  overlay: InteractionType,
}

export interface KoelschProps {
  feature?: Feature,
  name: OverlayNames,
  map: Map | null,
  onSaveClick?: (feature: Feature) => void,
}

export interface KoelschState {
}

export interface MapProps {
  mapStore?: MapState,
}

export interface MapState {
  map: BasemapState,
}

export interface ModifyProps extends DigitizeButtonProps {
}

export interface OverlayProps {
  map: Map | null,
  name: OverlayNames,
  feature?: Feature,
  onSaveClick?: (feature: Feature) => void | undefined,
}

export interface RouteProps extends DigitizeButtonProps {
}

export interface SelectProps extends DigitizeButtonProps {
}

export interface StrokeColor<T, U> {
  color: T,
  width: U,
}

export interface TransactionsGeoserver<T, U> {
  featureNS: T,
  featurePrefix: T,
  featureType: T,
  nativeElements: U,
  srsName: T,
}


//TYPES
export type Actions = Action_Map | Action_Button | Action_Overlay | Action_Feature;

export type ActiveButton = 'draw' | 'modify' | 'delete' | 'info' | 'route' | undefined;

export type BasemapState = null | Map;

export type InteractionType = null | JSX.Element;

export type OverlayNames = 'draw' | 'modify' | 'delete' | 'info' | 'route' | null;

//CONST ASSERTION
export const Action = {
  AMap: ActionTypes.SET_MAP,
  AButton: ActionTypes.SET_ACTIVE_BUTTON,
  AOverlay: ActionTypes.SHOW_OVERLAY,
  AFeature: ActionTypes.SET_SELECTED_FEATURE
} as const


