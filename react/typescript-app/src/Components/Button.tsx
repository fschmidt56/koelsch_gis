import React from 'react';

interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
  fai: string;
  name?: string;
  onHover?: void;
}

const Button = (props: ButtonProps): JSX.Element => {
  const {
    fai,
    name,
    type,
    ...passThroughProps
  } = props;

  return (
    <button id='Button'
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