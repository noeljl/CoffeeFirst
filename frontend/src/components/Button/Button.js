import React, { useContext } from 'react'
import { Button, ConfigProvider, Space } from 'antd'
import { AntDesignOutlined } from '@ant-design/icons'
// npm install @emotion/css
import { css } from '@emotion/css'

const GradientButton = ({ children, ...props }) => {
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext)
  const rootPrefixCls = getPrefixCls()

  const linearGradientButton = css`
    &.${rootPrefixCls}-btn-primary:not([disabled]):not(
        .${rootPrefixCls}-btn-dangerous
      ) {
      border-width: 0;
      position: relative;
      overflow: hidden;

      > span {
        position: relative;
        z-index: 1;
      }

      &::before {
        content: '';
        background: linear-gradient(135deg, #6253e1, #04befe);
        position: absolute;
        inset: 0;
        opacity: 1;
        transition: opacity 0.3s;
        border-radius: inherit;
        z-index: 0;
      }

      &:hover::before {
        opacity: 0;
      }
    }
  `

  return (
    <Button {...props} className={linearGradientButton}>
      {children}
    </Button>
  )
}

export default GradientButton
