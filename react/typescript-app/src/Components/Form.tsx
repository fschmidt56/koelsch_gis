import React, { ChangeEvent } from 'react';
import Button from './Button';
import { FeatureLike } from 'ol/Feature';

interface KoelschState {
  // name: string;
  // bier: string;
  // preis: number;
  // dirty: boolean;
}

interface KoelschProps {
  feature: FeatureLike
}

class Form extends React.Component<KoelschProps, KoelschState> {
  // static getDerivedStateFromProps(props: KoelschProps, state: KoelschState): KoelschState {
  //   if (!state.dirty) {
  //     return {
  //       name: props.feature.get('gastro'),
  //       bier: props.feature.get('bier'),
  //       preis: props.feature.get('preis'),
  //       dirty: false
  //     }
  //   } else {
  //     return {
  //       name: state.name,
  //       bier: state.bier,
  //       preis: state.preis,
  //       dirty: true
  //     }
  //   }
  // }

  constructor(props: KoelschProps) {
    super(props);
    // this.state = {
    //   name: '',
    //   bier: '',
    //   preis: 0,
    //   dirty: true
    // }
  }
    
  // handleChange = ({ target }: ChangeEvent): void => {
  //   this.setState({ [(target as HTMLTextAreaElement).name]: (target as HTMLTextAreaElement).value as string | number, dirty: true } as { [K in keyof KoelschState]: KoelschState[K] })
  // }

  onSubmitClick = (event: any) => {
    // TODO Get values from event
    console.log(event)
    event.preventDefault();
  }

  render(): JSX.Element {
    return (
      <React.Fragment>
        <form 
          className="form"
          onSubmit={this.onSubmitClick} 
        >
          <input
            id="name"
            type="text"
            name="name"
            placeholder="Name"
            defaultValue={this.props.feature.get('gastro')}
            //value={this.state.name}
            //onChange={this.handleChange}
            required
          /><br></br>
          <input
            id="bier"
            type="text"
            name="bier"
            placeholder="Kölsch"
            defaultValue={this.props.feature.get('bier')}
            //value={this.state.bier}
            //onChange={this.handleChange}
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
            defaultValue={this.props.feature.get('preis')}
            //value={this.state.preis}
            //onChange={this.handleChange}
            required
          /><br></br>
          {/* <p>{this.state.name} <br></br> {this.state.bier} <br></br> {this.state.preis} EUR </p> */}
          <input type="submit" value="Submit" />
          <Button onSubmit={this.onSubmitClick} id="sendData" fai="fa fa-arrow-right fa-2x" />
        </form>
      </React.Fragment>
    )
  }
}

export default Form;