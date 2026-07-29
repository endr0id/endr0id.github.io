#!/bin/bash
set -e

readonly ARTICLES_REPO_URL="https://github.com/endr0id/articles"
readonly TARGET_DIR="articles"
readonly PUBLIC_ARTICLES_DIR="public/articles"

rm -rf "$TARGET_DIR"
rm -rf "$PUBLIC_ARTICLES_DIR"

git clone --depth 1 "$ARTICLES_REPO_URL" "$TARGET_DIR"

mkdir -p "$PUBLIC_ARTICLES_DIR"

readonly FIND_IMAGES_CMD=(
  find "$TARGET_DIR" -type f \(
  -name "*.png" -o
  -name "*.jpg" -o
  -name "*.jpeg" -o
  -name "*.webp" -o
  -name "*.gif" -o
  -name "*.svg"
  \)
)

#  画像が存在するディレクトリ構造のみを public/articles 内に作成
"${FIND_IMAGES_CMD[@]}" -exec dirname {} \; | sort -u | while read -r dir; do
  mkdir -p "$PUBLIC_ARTICLES_DIR/${dir#$TARGET_DIR/}"
done

#  画像ファイルを public/articles/ 配下へ階層を保ってコピー
"${FIND_IMAGES_CMD[@]}" | while read -r file; do
  cp "$file" "$PUBLIC_ARTICLES_DIR/${file#$TARGET_DIR/}"
done

# articles/ 側の元画像ファイルのみを削除
"${FIND_IMAGES_CMD[@]}" -delete

rm -rf "$TARGET_DIR/.git"
rm -f "$TARGET_DIR/README.md"
rm -rf "$TARGET_DIR/scripts"

echo "Successfully moved images to $PUBLIC_ARTICLES_DIR and cleaned up $TARGET_DIR!"
