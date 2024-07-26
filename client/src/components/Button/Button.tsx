import React, { forwardRef } from 'react';
import { Link } from 'react-router-dom';

interface Props {
  children?: React.ReactNode;
  black?: boolean;
  white?: boolean;
  warning?: boolean;
  outline?: boolean;
  success?: boolean;
  error?: boolean;
  info?: boolean;
  text?: boolean;
  target?: string;
  disable?: boolean;
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
  small?: boolean;
  roundedMd?: boolean;
  large?: boolean;
  className?: string;
  to?: string;
  href?: string;
  loading?: boolean;
  left?: boolean;
  right?: boolean;
  onClick?: () => void;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

// eslint-disable-next-line react/display-name
const Button: React.FC<Props> = forwardRef<HTMLButtonElement | HTMLAnchorElement, Props>(
  (
    {
      children,
      black,
      warning,
      outline,
      white,
      success,
      error,
      info,
      text,
      target = '_self',
      disable = false,
      onClick,
      icon,
      iconRight,
      small,
      roundedMd,
      large,
      className = '',
      to,
      href,
      loading = false,
      left,
      right,
      ...pros
    },
    ref,
  ) => {
    let Comp: React.ElementType = 'button';
    let font = 'font-medium ';
    let spacing = 'px-3 py-2';
    let _rounded = '';
    let _outline = '';
    let _color = '';
    // eslint-disable-next-line prefer-const
    let _textColor = '';
    _outline = outline
      ? `border 
  ${black ? 'border-black' : ''}
  ${white ? 'border-white' : ''}
  ${warning ? 'border-warning' : ''}
  ${error ? 'border-error' : ''}
  ${success ? 'border-success' : ''}
  ${info ? 'border-info' : ''}
  `
      : '';
    _rounded = roundedMd ? 'rounded-md' : '';
    // Check if only icon, then border circle
    spacing = children ? spacing : '';
    spacing = children && icon ? 'py-3 pl-7 pr-10' : spacing;
    spacing = text ? 'p-2' : spacing;

    if (small) {
      font = 'font-light';
      spacing = 'p-1';
    }
    _color = !outline
      ? ` 
${black ? 'bg-black text-white' : ''}
${white ? 'bg-white text-black' : ''}
${warning ? 'bg-warning text-white' : ''}
${error ? 'bg-error text-white' : ''}
${success ? 'bg-success text-white' : ''}
${info ? 'bg-info text-white' : ''}
`
      : `${black ? 'text-black' : ''}
    ${white ? 'text-white' : ''}
    ${warning ? 'text-warning' : ''}
    ${error ? 'text-error' : ''}
    ${success ? 'text-success' : ''}
    ${info ? 'text-info' : ''}`;

    const props: React.AnchorHTMLAttributes<HTMLAnchorElement> & React.ButtonHTMLAttributes<HTMLButtonElement> = {
      onClick,
      disabled: disable,
      ...pros,
    };

    if (to) {
      (props as React.ComponentProps<typeof Link>).to = to;
      Comp = Link;
    } else if (href) {
      (props as React.AnchorHTMLAttributes<HTMLAnchorElement>).href = href;
      Comp = 'a';
    }

    if (disable) {
      Object.keys(props).forEach((key) => {
        if (key.startsWith('on') && typeof props[key as keyof typeof props] === 'function') {
          delete props[key as keyof typeof props];
        }
      });
    }

    if (loading) {
      props.disabled = true;
    }

    return (
      <Comp
        ref={ref}
        target={target}
        className={`${_outline} ${_color} ${text ? 'hover:underline' : ''} ${_textColor} ${font} ${spacing} ${className} ${_rounded}  ${large ? 'w-full' : ''}  flex align-middle  ${left ? 'items-start' : 'items-center'} ${right ? 'items-end' : 'items-center'} select-none hover:bg-opacity-80 ${disable ? 'pointer-events-none cursor-not-allowed bg-opacity-50' : ''}`}
        {...props}
      >
        {icon && !loading && <span className={`${children ? 'mr-2' : ''}`}>{icon}</span>}
        <span>{children}</span>
        {iconRight && !loading && <span className={`${children ? 'ml-2' : ''}`}>{iconRight}</span>}
        {loading && <span>Wait</span>}
      </Comp>
    );
  },
);

export default Button;
