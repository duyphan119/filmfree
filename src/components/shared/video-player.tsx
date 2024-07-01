"use client";

import dynamic from "next/dynamic";

const Player = dynamic(() => import("@vime/react").then((mod) => mod.Player), {
  ssr: false,
});
const Hls = dynamic(() => import("@vime/react").then((mod) => mod.Hls), {
  ssr: false,
});

export default function VideoPlayer({
  url,
  thumbnail,
}: {
  url: string;
  thumbnail: string;
}) {
  return (
    <Player controls>
      <Hls version="latest" config={{}} poster={thumbnail}>
        <source data-src={url} type="application/x-mpegURL" />
      </Hls>
    </Player>
  );
}
