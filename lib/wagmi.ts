import { http, createConfig } from "wagmi";
import { sepolia } from "wagmi/chains";
import { injected } from "wagmi/connectors";

export const config = createConfig({
  chains: [sepolia],
  connectors: [injected()],
  transports: {
    // 공개 RPC. 더 안정적으로 하려면 Alchemy 등 RPC URL 사용(아래 환경변수)
    [sepolia.id]: http(process.env.NEXT_PUBLIC_SEPOLIA_RPC_URL),
  },
});