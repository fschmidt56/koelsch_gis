import React, { FormEvent } from 'react';
import Button from './Button';
import { KoelschProps, KoelschState } from '../types/interfaces';

const Form = (props: KoelschProps, state: KoelschState): JSX.Element => {

  const {
    name,
  } = props


  const onSubmitClick = (event: FormEvent) => {
    // TODO Get values from event
    console.log(event)
    event.preventDefault();
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
            defaultValue={props.feature.get('gastro')}
            required
          /><br></br>
          <input
            id="bier"
            type="text"
            name="bier"
            placeholder="Kölsch"
            defaultValue={props.feature.get('bier')}
            required
          /><br></br>
          <input
            id="preis"
            type="number"
            name="preis"
            placeholder="Preis"
            min="1"
            max="5"
            step="0.1"
            defaultValue={props.feature.get('preis')}
            required
          /><br></br>
          {/* <input type="submit" value="Submit" /> */}
          <Button
            onSubmit={onSubmitClick}
            id="sendData"
            fai="fa fa-arrow-right fa-2x" />
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
            defaultValue={props.feature.get('gastro')}
            required
          /><br></br>
          <input
            id="bier"
            type="text"
            name="bier"
            placeholder="Kölsch"
            defaultValue={props.feature.get('bier')}
            required
          /><br></br>
          <input
            id="preis"
            type="number"
            name="preis"
            placeholder="Preis"
            min="1"
            max="5"
            step="0.1"
            defaultValue={props.feature.get('preis')}
            required
          /><br></br>
          {/* <input type="submit" value="Submit" /> */}
          <Button
            onSubmit={onSubmitClick}
            id="sendData"
            fai="fa fa-arrow-right fa-2x" />
        </form>
      </React.Fragment>
    )
  }
  if (name === 'delete') {
    return (
      <React.Fragment>
        <div className='featureInfos' >
          <b>Name: </b><p>{props.feature.get('gastro')}</p>
          <br></br>
          <b>Kölsch: </b><p>{props.feature.get('bier')}</p>
          <br></br>
          <b>Preis: </b><p>{props.feature.get('preis')} EUR</p>
        </div>
        /><br></br>
        {/* <input type="submit" value="Submit" /> */}
        <Button
          onSubmit={onSubmitClick}
          id="sendData"
          fai="fa fa-arrow-right fa-2x"
        />
      </React.Fragment>
    )
  }
  else {
    return (
      <React.Fragment>
        <div className='featureInfos' >
          <b>Name: </b><p>{props.feature.get('gastro')}</p>
          <br></br>
          <b>Kölsch: </b><p>{props.feature.get('bier')}</p>
          <br></br>
          <b>Preis: </b><p>{props.feature.get('preis')} EUR</p>
        </div>
      </React.Fragment >
    )
  }
}

export default Form;