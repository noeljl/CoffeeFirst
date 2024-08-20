import React, { useContext } from 'react'
import { Button, ConfigProvider } from 'antd'
import { css } from '@emotion/css'

const GradientButton = ({ children, icon, ...props }) => {
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext)
  const rootPrefixCls = getPrefixCls()

  //   Zielt auf ein Element ab, das die Klasse btn-primary hat (z. B. einen primären Button).
  // Der Button darf nicht das disabled-Attribut haben (er muss aktiv sein).
  // Der Button darf nicht die Klasse btn-dangerous haben (er darf keine gefährliche Aktion darstellen).
  const linearGradientButton = css`
    &.${rootPrefixCls}-btn-primary:not([disabled]):not(
        .${rootPrefixCls}-btn-dangerous
      ) {
      border-width: 0;

      > span {
        position: relative;
      }

      &::before {
        content: '';
        background: linear-gradient(135deg, #6253e1, #04befe);
        position: absolute;
        inset: 0;
        opacity: 1;
        transition: all 0.3s;
        border-radius: inherit;
      }

      &:hover::before {
        opacity: 0;
      }
    }
  `

  return (
    <Button className={linearGradientButton} {...props} icon={icon}>
      {children}
    </Button>
  )
}

// Korrekt als default exportieren
export default GradientButton
