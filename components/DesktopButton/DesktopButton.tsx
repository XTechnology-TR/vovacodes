import React, { useCallback } from 'react';
import * as Styled from './DesktopButton.styles';
import Paragraph from '../Typography/Paragraph/Paragraph';
import Image from 'next/image';
import { useActions } from '../../hooks/useActions';

export interface Props extends React.ComponentPropsWithoutRef<'button'> {
  variant: 'desktop' | 'systemTray' | 'pinnedApp' | 'recommendedApp';
  iconSrc: string;
  iconSize: { height: number; width: number };
  text: string;
  details?: string;
  action: null | (() => void);
}

/**
 *Renders desktop button with icon and text
 *@function DesktopButton
 *@param {enum} variant - variant of button
 *@param {string} iconSrc - icon source in assets
 *@param {object} iconSize - object with icon size configuration (height && width)
 *@param {string} text - text to be rendered in button
 *@param {string} details - details used in recommendedApp variant
 *@param {rest} rest - default button params and methods
 *@param {null | function} action - specific onClick action for button, if not specified button will open new window on click
 *@returns {JSX.Element} - Rendered DesktopButton component
 */
const DesktopButton = ({
  variant,
  text,
  iconSize,
  iconSrc,
  details,
  action,
  ...rest
}: Props): JSX.Element => {
  const { openWindow } = useActions();

  const handleOpenWindow = useCallback(() => {
    openWindow({
      windowName: text,
      isOpen: true,
      windowIcon: iconSrc,
      size: { width: 400, height: 400 },
    });
  }, [openWindow, iconSrc, text]);

  return (
    <Styled.ButtonContainer
      onClick={action !== null ? action : handleOpenWindow}
      variant={variant}
      {...rest}
    >
      <Styled.Figure>
        <div>
          <Image
            src={iconSrc}
            alt={text}
            height={iconSize.height}
            width={iconSize.width}
            objectFit={'contain'}
            quality={100}
          />
        </div>
        {['pinnedApp', 'desktop'].includes(variant) && (
          <Styled.Figcaption>
            <Paragraph margin={'0rem'}>{text}</Paragraph>
          </Styled.Figcaption>
        )}

        {variant === 'recommendedApp' && (
          <Styled.RecommendedAppDescription>
            <Styled.FileName>{text}</Styled.FileName>
            <Paragraph margin={'0rem'}>{details}</Paragraph>
          </Styled.RecommendedAppDescription>
        )}
      </Styled.Figure>
    </Styled.ButtonContainer>
  );
};

export default DesktopButton;
