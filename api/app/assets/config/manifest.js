// NOTE: assets:precompile はしないため manifest.js はファイルごと削除したいが、以下の理由で削除できない
//       - sprockets の v4.0.0 以上では manifest.js がないと rails の起動時にエラーになる
//       - sprockets 自体を削除したいが graphiql-rails が依存しているため削除できない
//       - sprockets を v3.7.2 以下にするとエラーは回避できるが graphiql-rails が将来的に v4.0.0 以上に
//         依存してしまう可能性があるといけない
//         ref. https://qiita.com/sasakura_870/items/106484f88c857bd9563e
