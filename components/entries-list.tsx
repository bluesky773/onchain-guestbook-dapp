"use client"

import { forwardRef, useImperativeHandle } from "react"
import { useReadContract } from "wagmi"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { GUESTBOOK_ABI, GUESTBOOK_ADDRESS, type GuestbookEntry } from "@/lib/contract"
import { shortenAddress, formatTimestamp } from "@/lib/format"
import { Loader2, MessageSquare } from "lucide-react"

export type EntriesListHandle = { refetch: () => void }

export const EntriesList = forwardRef<EntriesListHandle>(function EntriesList(_, ref) {
  const { data, isLoading, isError, refetch } = useReadContract({
    address: GUESTBOOK_ADDRESS,
    abi: GUESTBOOK_ABI,
    functionName: "getEntries",
  })

  // Expose refetch so the parent can refresh after a confirmed tx.
  useImperativeHandle(ref, () => ({ refetch: () => void refetch() }), [refetch])

  const entries = (data as readonly GuestbookEntry[] | undefined) ?? []
  // Newest first.
  const sorted = [...entries].sort((a, b) => Number(b.timestamp - a.timestamp))

  if (isLoading) {
    return (
      <div className="flex items-center justify-center gap-2 py-12 text-muted-foreground">
        <Loader2 className="size-4 animate-spin" />
        목록을 불러오는 중…
      </div>
    )
  }

  if (isError) {
    return (
      <p className="py-12 text-center text-sm text-destructive">
        목록을 불러오지 못했어요. 컨트랙트 주소와 네트워크(Sepolia)를 확인해주세요.
      </p>
    )
  }

  if (sorted.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 py-12 text-muted-foreground">
        <MessageSquare className="size-6" />
        <p className="text-sm">아직 남겨진 방명록이 없어요. 첫 번째로 남겨보세요!</p>
      </div>
    )
  }

  return (
    <ul className="flex flex-col gap-3">
      {sorted.map((entry, i) => (
        <li key={`${entry.sender}-${entry.timestamp.toString()}-${i}`}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between gap-2 pb-2">
              <span className="font-mono text-sm font-medium">{shortenAddress(entry.sender)}</span>
              <time className="text-xs text-muted-foreground">{formatTimestamp(entry.timestamp)}</time>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-wrap text-pretty leading-relaxed">{entry.message}</p>
            </CardContent>
          </Card>
        </li>
      ))}
    </ul>
  )
})
