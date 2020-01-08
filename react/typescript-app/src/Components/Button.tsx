import React from 'react';
import { ButtonProps } from '../types/interfaces'

const Button = (props: ButtonProps): JSX.Element => {
  const {
    fai,
    name,
    type,
    ...passThroughProps
  } = props;

  return (
    <button
      id='Button'
      type="button"
      className='Button'
      {...passThroughProps}
    >
      <i
        className={fai}
      />
      {name}
    </button>
  )
}

export default Button;