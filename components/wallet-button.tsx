"use client"

import { useAccount, useConnect, useDisconnect } from "wagmi"
import { injected } from "wagmi/connectors"
import { Button } from "@/components/ui/button"
import { shortenAddress } from "@/lib/format"
import { Wallet, LogOut } from "lucide-react"

export function WalletButton() {
  const { address, isConnected } = useAccount()
  const { connect, isPending } = useConnect()
  const { disconnect } = useDisconnect()

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
