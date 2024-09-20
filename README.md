PostgreSQLでユーザーにデータベースの権限を与えるためのコマンドをお教えします。以下に一般的なコマンドを示します：

```sql
GRANT [権限タイプ] ON DATABASE [データベース名] TO [ユーザー名];
```

具体的な例を挙げると：

```sql
GRANT ALL PRIVILEGES ON DATABASE mydb TO myuser;
```

このコマンドは `myuser` というユーザーに `mydb` というデータベースに対するすべての権限を付与します。

権限タイプには以下のようなものがあります：

- SELECT
- INSERT
- UPDATE
- DELETE
- TRUNCATE
- REFERENCES
- CREATE
- CONNECT
- TEMPORARY
- EXECUTE
- USAGE

特定の権限のみを付与したい場合は、次のように指定できます：

```sql
GRANT SELECT, INSERT, UPDATE ON DATABASE mydb TO myuser;
```

これらのコマンドはデータベースに接続した状態で実行する必要があります。また、権限を付与するには、適切な権限を持つユーザー（通常はスーパーユーザーまたはデータベース所有者）で実行する必要があります。

このコマンドについて詳しく説明したり、他の権限管理に関する情報を提供したりすることもできますが、いかがでしょうか？