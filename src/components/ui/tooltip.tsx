import { Tooltip as ChakraTooltip, Portal } from "@chakra-ui/react"
import * as React from "react"

export interface TooltipProps {
  showArrow?: boolean
  portalled?: boolean
  portalRef?: React.RefObject<HTMLElement>
  content: React.ReactNode
  children: React.ReactNode
  disabled?: boolean
  placement?: "top" | "bottom" | "left" | "right"
}

export const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(
  function Tooltip(props, ref) {
    const {
      showArrow,
      children,
      disabled,
      portalled = true,
      content,
      placement = "top",
      portalRef,
      ...rest
    } = props

    if (disabled) return <>{children}</>

    return (
      <ChakraTooltip
        label={content}
        placement={placement}
        hasArrow={showArrow}
        {...rest}
      >
        {children}
      </ChakraTooltip>
    )
  },
)