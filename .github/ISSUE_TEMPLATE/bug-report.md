---
name: "Bug Report"
about: "Report a bug or error in the application."
title: "bug: "
labels: bug
assignees: ""
body:
  - type: markdown
    attributes:
      value: 不具合の報告
  - type: textarea
    id: reproduction-steps
    attributes:
      label: 再現手順
      description: 不具合が発生するまでの手順を箇条書き
      placeholder: |
        1. 〇〇画面を開く
        2. ✕✕ボタンをクリックする
    validations:
      required: true
  - type: dropdown
    id: environment
    attributes:
      label: 発生環境
      options:
        - 本番環境 (Production)
        - ローカル開発環境 (Local)
    validations:
      required: true
---
