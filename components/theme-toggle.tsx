"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()

  // 마운트 전에는 테마를 알 수 없으므로 자리표시 버튼을 렌더해 하이드레이션 불일치를 막는다.
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  if (!mounted) {
    return (
      <Button variant="outline" size="icon" aria-label="테마 전환" disabled>
        <Sun className="size-4" />
      </Button>
    )
  }

  const isDark = resolvedTheme === "dark"

  return (
    <Button
      variant="outline"
      size="icon"
      aria-label={isDark ? "라이트 모드로 전환" : "다크 모드로 전환"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </Button>
  )
}
