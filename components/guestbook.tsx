"use client"

import { useCallback, useRef } from "react"
import { WalletButton } from "@/components/wallet-button"
import { SignForm } from "@/components/sign-form"
import { EntriesList, type EntriesListHandle } from "@/components/entries-list"
import { Card, CardContent } from "@/components/ui/card"

export function Guestbook() {
  const listRef = useRef<EntriesListHandle>(null)

  const handleConfirmed = useCallback(() => {
    listRef.current?.refetch()
  }, [])

  return (
    <main className="mx-auto flex min-h-svh w-full max-w-2xl flex-col gap-6 px-4 py-10">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold tracking-tight text-balance">온체인 방명록</h1>
          <p className="text-sm text-muted-foreground">Sepolia 테스트넷에 메시지를 영원히 남겨보세요.</p>
        </div>
        <WalletButton />
      </header>

      <Card>
        <CardContent className="pt-6">
          <SignForm onConfirmed={handleConfirmed} />
        </CardContent>
      </Card>

      <section className="flex flex-col gap-3">
        <h2 className="text-sm font-medium text-muted-foreground">방명록</h2>
        <EntriesList ref={listRef} />
      </section>
    </main>
  )
}
