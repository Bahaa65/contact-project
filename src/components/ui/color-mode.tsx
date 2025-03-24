"use client"

import type { IconButtonProps, SpaceProps } from "@chakra-ui/react" // استخدام SpaceProps بدلاً من SpanProps
import { IconButton, Skeleton, Box } from "@chakra-ui/react" // استخدام Box بدون إعادة التسمية إلى Span
import { ThemeProvider, useTheme } from "next-themes" // استخدام ThemeProvider بشكل صحيح
import * as React from "react"
import { LuMoon, LuSun } from "react-icons/lu"

export interface ColorModeProviderProps {}

export function ColorModeProvider(props: ColorModeProviderProps) {
  return (
    <ThemeProvider attribute="class" disableTransitionOnChange {...props} />
  )
}

export type ColorMode = "light" | "dark"

export interface UseColorModeReturn {
  colorMode: ColorMode
  setColorMode: (colorMode: ColorMode) => void
  toggleColorMode: () => void
}

export function useColorMode(): UseColorModeReturn {
  const { resolvedTheme, setTheme } = useTheme()
  const toggleColorMode = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark")
  }
  return {
    colorMode: (resolvedTheme as ColorMode) || "light",
    setColorMode: setTheme,
    toggleColorMode,
  }
}

export function useColorModeValue<T>(light: T, dark: T) {
  const { colorMode } = useColorMode()
  return colorMode === "dark" ? dark : light
}

export function ColorModeIcon() {
  const { colorMode } = useColorMode()
  return colorMode === "dark" ? <LuMoon /> : <LuSun />
}

interface ColorModeButtonProps extends Omit<IconButtonProps, "aria-label"> {}

export const ColorModeButton = React.forwardRef<
  HTMLButtonElement,
  ColorModeButtonProps
>(function ColorModeButton(props, ref) {
  const { toggleColorMode } = useColorMode()
  return (
    <React.Suspense fallback={<Skeleton boxSize="8" />}>
      <IconButton
        onClick={toggleColorMode}
        variant="ghost"
        aria-label="Toggle color mode"
        size="sm"
        ref={ref}
        {...props}
        sx={{
          '& > svg': {
            width: "20px",
            height: "20px",
          },
        }}
      >
        <ColorModeIcon />
      </IconButton>
    </React.Suspense>
  )
})

export const LightMode = React.forwardRef<HTMLDivElement, SpaceProps>(
  function LightMode(props, ref) {
    return (
      <Box
        color="gray.800"
        display="contents"
        className="chakra-theme light"
        ref={ref}
        {...props}
      />
    )
  },
)

export const DarkMode = React.forwardRef<HTMLDivElement, SpaceProps>(
  function DarkMode(props, ref) {
    return (
      <Box
        color="gray.200"
        display="contents"
        className="chakra-theme dark"
        ref={ref}
        {...props}
      />
    )
  },
)
