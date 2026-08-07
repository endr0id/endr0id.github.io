import type { ComponentPropsWithoutRef } from "react";
import clsx, { type ClassValue } from "clsx";
import { Avatar as RadixUiAvatar } from "radix-ui";

const fallbackText = "WE";
const AVATAR_SIZE = {
  sm: "size-[32px]",
  md: "size-[48px]",
  lg: "size-[64px]",
} as const;

type AvatarPresetSize = keyof typeof AVATAR_SIZE;
// プリセット or 任意サイズ(e.g., "size-[100px]")を許容
type AvatarSize = AvatarPresetSize | (string & {});

type AvatarProps = {
  src?: string;
  alt?: string;
  size?: AvatarSize;
  className?: ClassValue;
  imageClassName?: ClassValue;
  fallbackClassName?: ClassValue;
} & Omit<
  ComponentPropsWithoutRef<typeof RadixUiAvatar.Root>,
  "className" | "children"
>;

const resolveSizeClass = (size: AvatarSize) =>
  size in AVATAR_SIZE ? AVATAR_SIZE[size as AvatarPresetSize] : size;

const Avatar = ({
  src,
  alt = "",
  size = "md",
  className,
  imageClassName,
  fallbackClassName,
  ...rootProps
}: AvatarProps) => {
  return (
    <RadixUiAvatar.Root
      {...rootProps}
      className={clsx(
        "inline-flex overflow-hidden rounded-full",
        resolveSizeClass(size),
        className,
      )}
    >
      <RadixUiAvatar.Image
        src={src}
        alt={alt}
        className={clsx("size-full object-cover", imageClassName)}
      />
      <RadixUiAvatar.Fallback
        className={clsx([
          "flex items-center justify-center size-full font-medium",
          "bg-black dark:bg-white text-neutral-300 dark:text-neutral-500",
          fallbackClassName,
        ])}
      >
        {fallbackText}
      </RadixUiAvatar.Fallback>
    </RadixUiAvatar.Root>
  );
};

export default Avatar;
