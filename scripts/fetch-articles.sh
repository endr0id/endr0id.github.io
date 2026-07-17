#!/bin/bash
set -e

readonly ARTICLES_REPO_URL="https://github.com/endr0id/articles"
readonly TARGET_DIR="articles"

rm -rf "$TARGET_DIR"
git clone --depth 1 "$ARTICLES_REPO_URL" "$TARGET_DIR"
