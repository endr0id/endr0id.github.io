#!/bin/bash
set -e

readonly ARTICLES_REPO_URL="https://github.com/endr0id/articles"
readonly TARGET_DIR="articles"

rm -rf "$TARGET_DIR"
git clone --depth 1 "$ARTICLES_REPO_URL" "$TARGET_DIR"

# NOTE: アプリ構成に不要なので削除
rm -rf "$TARGET_DIR/.git"
rm -f "$TARGET_DIR/README.md"
rm -rf "$TARGET_DIR/scripts"
