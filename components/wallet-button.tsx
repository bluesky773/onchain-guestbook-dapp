"use client"

import { useEffect, useState } from "react"
import { useAccount, useConnect, useDisconnect } from "wagmi"
import { injected } from "wagmi/connectors"
import { Button } from "@/components/ui/button"
import { shortenAddress } from "@/lib/format"
import { Wallet, LogOut } from "lucide-react"

export function WalletButton() {
  const { address, isConnected } = useAccount()
  const { connect, isPending } = useConnect()
  const { disconnect } = useDisconnect()

  // 서버와 클라이언트의 첫 렌더 출력을 일치시켜 하이드레이션 불일치를 방지한다.
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  if (!mounted) {
    return (
      <Button size="sm" disabled>
        <Wallet className="size-4" />
        지갑 연결
      </Button>
    )
  }

  if (isConnected && address) {
    return (
      <div className="flex items-center gap-2">
        <span className="rounded-md bg-secondary px-3 py-1.5 font-mono text-sm text-secondary-foreground">
          {shortenAddress(address)}
        </span>
        <Button variant="outline" size="sm" onClick={() => disconnect()}>
          <LogOut className="size-4" />
          연결 해제
        </Button>
      </div>
    )
  }

  return (
    <Button size="sm" onClick={() => connect({ connector: injected() })} disabled={isPending}>
      <Wallet className="size-4" />
      {isPending ? "연결 중…" : "지갑 연결"}
    </Button>
  )
}
