import { Map } from 'ol';
import { FeatureLike } from 'ol/Feature';

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
}

export type ActiveButton = 'draw' | 'modify' | 'delete' | undefined

export type OverlayNames = 'draw' | 'modify' | 'delete' | 'info' | undefined

export interface MapState {
  map: Map | null,
  activeButton: ActiveButton,
}

export interface KoelschState {
}

export interface KoelschProps {
  feature: FeatureLike
  name: OverlayNames
}

export interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
  fai: string;
  name?: string;
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

export interface OverlayProps {
  map: Map | null;
  style: Object;
  onClick?: () => void,
  name: OverlayNames,
}

export interface ButtonGroupProps {
  map: Map | null,
  activeButton: ActiveButton
}

export interface InfoProps extends React.HTMLProps<HTMLButtonElement> {
  map: Map | null
}

export interface CloseBtnProps {
  
}
