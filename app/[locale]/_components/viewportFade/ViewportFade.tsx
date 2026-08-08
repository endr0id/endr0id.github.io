import clsx from "clsx";

/**
 * 画面上下に固定（fixed）のフェードオーバーレイを配置し、
 * 中央コンテンツへ視線を集中させる視覚コンポーネント
 *
 * @component
 * @description
 * `children` を受け取らない独立したオーバーレイとして設計
 *
 * - **fixed位置の保護**: 囲い込みによる CSS `transform` / `filter` 等の描画文脈崩れを防止
 * - **単一責任**: レイアウト構造を変更せず、視覚効果のレイヤー定義に専念
 * - **RSC最適化**: クライアント演出 (`"use client"`) を追加した際も本体レンダリングへ影響させないため
 *
 * @returns JSX.Element 画面上下に配置される固定オーバーレイ要素
 */
const ViewportFade = () => {
  return (
    <>
      {/* 画面上部のぼかし */}
      <div
        className={clsx(
          // Position
          "fixed inset-x-0 top-0 z-40",

          // Size
          "h-28",

          // Interaction
          "pointer-events-none",

          // Visual
          "bg-gradient-to-b from-background/90 via-background/40 to-transparent",
          "[mask-image:linear-gradient(to_bottom,black_0%,black_30%,rgba(0,0,0,0.5)_60%,transparent_100%)]",
        )}
      />

      {/* 画面下部のぼかし */}
      <div
        className={clsx(
          // Position
          "fixed inset-x-0 bottom-0 z-40",

          // Size
          "h-20",

          // Interaction
          "pointer-events-none",

          // Visual
          "bg-gradient-to-t from-background/90 via-background/40 to-transparent",
          "[mask-image:linear-gradient(to_top,black_0%,black_30%,rgba(0,0,0,0.5)_60%,transparent_100%)]",
        )}
      />
    </>
  );
};

export default ViewportFade;
