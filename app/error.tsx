"use client";

import { Wrapper } from "@/components/tv/TVNav";
import TVButton from "@/components/tv/TVButton";
import TVStage from "@/components/tv/TVStage";

export default function Error({
  error,
  retry,
}: {
  error: unknown;
  retry: () => void;
}) {
  const buttons: React.ReactNode = (
    <Wrapper>
      <TVButton onClick={() => retry()}>
        <p className="text-background font-mono text-[38px] font-semibold tracking-[-0.015em] text-nowrap uppercase">
          Retry Session
        </p>
      </TVButton>
    </Wrapper>
  );

  return (
    <div className="flex h-screen items-center justify-center bg-[#c4c4c4]">
      <TVStage fastForward buttons={buttons} />
      <p className="text-background font-sans text-[72px] font-medium tracking-[0.015em] uppercase">
        Error
      </p>
    </div>
  );
}
