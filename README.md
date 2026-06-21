## Note
> [!NOTE]
> deploy.ymlに関連するので対応必須

nodeやpackage managerのバージョンアップ対応をした場合は以下を対応

### node
- `.node-version` に記載のバージョン番号の変更
- `package.json` の `engines` を変更

### pnpm
`package.json` の `packageManager` でバージョン管理をしワークフロー実行環境を同一条件で実行させる

```bash
corepack use pnpm@xx.xx.xx
```
```
```
