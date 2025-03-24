"use client"

import {
  Portal,
  Spinner,
  Stack,
  useToast,
  Box,
} from "@chakra-ui/react"
import { useEffect, useRef } from "react"

export function Toaster() {
  const toast = useToast()
  const toastIdRef = useRef<string | number>()

  useEffect(() => {
    return () => {
      if (toastIdRef.current) {
        toast.close(toastIdRef.current)
      }
    }
  }, [toast])

  return (
    <Portal>
      <Box position="fixed" bottom="4" right="4" zIndex="toast">
        <Stack spacing="4" width={{ base: "full", md: "sm" }}>
          {/* Toast notifications will appear here */}
        </Stack>
      </Box>
    </Portal>
  )
}

export { useToast as useToaster }