"use client"

import { useEffect, useState } from "react"
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from "wagmi"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { GUESTBOOK_ABI, GUESTBOOK_ADDRESS } from "@/lib/contract"
import { Loader2, PenLine } from "lucide-react"

export function SignForm({ onConfirmed }: { onConfirmed?: () => void }) {
  const { isConnected } = useAccount()
  const [message, setMessage] = useState("")

  const { data: hash, writeContract, isPending, error, reset } = useWriteContract()

  const {
    isLoading: isConfirming,
    isSuccess: isConfirmed,
  } = useWaitForTransactionReceipt({ hash })

  // Clear input and notify parent once the tx is confirmed on-chain.
  useEffect(() => {
    if (isConfirmed) {
      setMessage("")
      onConfirmed?.()
      reset()
    }
  }, [isConfirmed, onConfirmed, reset])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!message.trim()) return
    writeContract({
      address: GUESTBOOK_ADDRESS,
      abi: GUESTBOOK_ABI,
      functionName: "sign",
      args: [message.trim()],
    })
  }

  const busy = isPending || isConfirming

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <Textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder={isConnected ? "방명록에 남길 메시지를 입력하세요…" : "먼저 지갑을 연결해주세요"}
        disabled={!isConnected || busy}
        rows={3}
        className="resize-none"
      />

      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground" aria-live="polite">
          {isPending && "지갑에서 서명을 기다리는 중…"}
          {isConfirming && "트랜잭션 확정 대기 중…"}
          {!busy && error && <span className="text-destructive">전송에 실패했어요. 다시 시도해주세요.</span>}
        </p>

        <Button type="submit" disabled={!isConnected || busy || !message.trim()}>
          {busy ? <Loader2 className="size-4 animate-spin" /> : <PenLine className="size-4" />}
          {isPending ? "전송 중" : isConfirming ? "확정 중" : "남기기"}
        </Button>
      </div>
    </form>
  )
}
