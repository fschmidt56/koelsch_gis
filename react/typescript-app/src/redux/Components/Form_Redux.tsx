import React, { FormEvent } from 'react';
import { KoelschProps } from '../../types/interfaces';
import { useSelector } from 'react-redux';
import { RootState } from '../stores/store';

const Form = (props: KoelschProps): JSX.Element => {

  const selectedFeature = useSelector((state: RootState) => state.currentFeatureState.selectedFeature)

  const {
    name,
    feature,
    onSaveClick
  } = props

  const onSubmitClick = (event: FormEvent) => {
    event.preventDefault();
    if (onSaveClick)
      if (feature) {
        onSaveClick(feature);
      }
  }

  if (name === 'draw') {
    return (
      <React.Fragment>
        <form
          className="form"
          onSubmit={onSubmitClick}
        >
          <input
            id="name"
            type="text"
            name="name"
            placeholder="Name"
            defaultValue={feature && feature.get('gastro')}
            onChange={(changeEvent: any) => {
              if (feature) {
                feature.set('gastro', changeEvent.target.value)
              }
            }}
            required
          />
          <br></br>
          <input
            id="bier"
            type="text"
            name="bier"
            placeholder="Kölsch"
            defaultValue={feature && feature.get('bier')}
            onChange={(changeEvent: any) => {
              if (feature) {
                feature.set('bier', changeEvent.target.value)
              }
            }}
            required
          />
          <br></br>
          <input
            id="preis"
            type="number"
            name="preis"
            placeholder="Preis"
            min="1"
            max="5"
            step="0.05"
            defaultValue={feature && feature.get('preis')}
            onChange={(changeEvent: any) => {
              if (feature) {
                feature.set('preis', changeEvent.target.value)
              }
            }}
            required
          />
          <br></br>
          <input id="submitData" type="submit" value="Create" />
        </form>
      </React.Fragment>
    )
  }

  if (name === 'modify') {
    return (
      <React.Fragment>
        <form
          className="form"
          onSubmit={onSubmitClick}
        >
          <input
            id="name"
            type="text"
            name="name"
            placeholder="Name"
            defaultValue={selectedFeature && selectedFeature.get('gastro')}
            onChange={(changeEvent: any) => {
              if (feature) {
                feature.set('gastro', changeEvent.target.value)
              }
            }}
            required
          /><br></br>
          <input
            id="bier"
            type="text"
            name="bier"
            placeholder="Kölsch"
            defaultValue={selectedFeature && selectedFeature.get('bier')}
            onChange={(changeEvent: any) => {
              if (feature) {
                feature.set('bier', changeEvent.target.value)
              }
            }}
            required
          /><br></br>
          <input
            id="preis"
            type="number"
            name="preis"
            placeholder="Preis"
            min="1"
            max="5"
            step="0.05"
            defaultValue={selectedFeature && selectedFeature.get('preis')}
            onChange={(changeEvent: any) => {
              if (feature) {
                feature.set('preis', changeEvent.target.value)
              }
            }}
            required
          /><br></br>
          <input id="submitData" type="submit" value="Modify" />
        </form>
      </React.Fragment>
    )
  }

  if (name === 'route') {
    return (
      <React.Fragment>
        <form
          className="form"
          onSubmit={onSubmitClick}
        >
          <input
            id="anzahl"
            type="number"
            name="anzahl"
            placeholder="Anzahl"
            min="2"
            max="12"
            step="1"
            onChange={(changeEvent: any) => {
              if (feature) {
                feature.set('anzahl', changeEvent.target.value)
              }
            }}
            required
          /><br></br>
          <input
            id="budget"
            type="number"
            name="budget"
            placeholder="Budget"
            min="5"
            max="30"
            step="0.5"
            onChange={(changeEvent: any) => {
              if (feature) {
                feature.set('budget', changeEvent.target.value)
              }
            }}
            required
          /><br></br>
          <input id="submitData" type="submit" value="Routing..." />
        </form>
      </React.Fragment>
    )
  }
  
  else {
    return (
      <React.Fragment>
        <div className='featureInfos' >
          <b>Name: </b><p>{feature && feature.get('gastro')}</p>
          <br></br>
          <b>Kölsch: </b><p>{feature && feature.get('bier')}</p>
          <br></br>
          <b>Preis: </b><p>{feature && feature.get('preis')} EUR</p>
        </div>
      </React.Fragment >
    )
  }
}

export default Form;