# 2021-summer-3-b

## API
すべてのAPIレスポンスはcriateResponce.jsによって、オブジェクトに変換され、返されるものとする.


### /api/login
<p>
call:("api/login",{ID,pass})<br>
return:{name,session}<br>
<br>
ログイン用API<br>
引数:object<br>
</p>

### /api/register
<p>
call:("api/register",{name,pass})<br>
return:{ID,session}<br>
<br>
ユーザ登録用API<br>
引数:object<br>
</p>

### /api/get_active_ID
<p>
call:("api/get_active_ID")<br>
return:[num, ...]<br>
<br>
アクティブユーザのID検索用API<br>
引数:なし<br>
</p>

### /api/get_active
<p>
call:("api/get_active")<br>
return:[{ID,name,is_active,fitness}, ...]
<br>
アクティブユーザのデータ検索用API<br>
引数:なし<br>
</p>
  
### /api/logout
<p>
call:("api/logout",{ID,session})<br>
return:"ok"<br>
<br>
ログアウト用API<br>
引数:object<br>
</p>

### /api/active_friend_ID
<p>
call:("api/active_friend_ID",{ID,session})<br>
return:[num, ...]<br>
<br>
アクティブフレンドのID検索用API<br>
引数:object<br>
</p>

### /api/active_friend
<p>
call:("api/active_friend",{ID,session})<br>
return:[{ID,name,is_active,fitness}, ...]
<br>
アクティブフレンドのデータ検索用API<br>
引数:object<br>
</p>

### /api/friend_data
<p>
call:("api/friend_data",{ID,session})<br>
return:"ok"
<br>
フレンドユーザのデータ検索用API<br>
引数:object<br>
</p>

### /api/add_friend
<p>
call:("api/add_friend",{ID,session,friend_ID})<br>
return:"ok"
<br>
フレンドユーザの追加用API<br>
引数:object<br>
</p>


## users.json
<p>
{<br>
>ID:int型<br>
>name:String型<br>
>pass:String型<br>
>session:float型<br>
>is_active:bool型<br>
>friend_ID:int型配列<br>
}<br>
</p>

### ID
ユーザのID、整数型<br>
### name
ユーザの名前、文字列型<br>
### pass
パスワード、パスワードのハッシュで保存、文字列型<br>
### session
セッションID、小数型<br>
### is_active
ユーザの状態、bool型<br>
### fitness
運動の種類、文字列型配列<br>
### friend_ID
フレンド登録しているユーザのID、整数型配列<br>

## users_hist.json
<p>
{<br>
>ID:int型<br>
>hist:[<br>
->{<br>
-->date:String型<br>
-->fitness:String型<br>
-->time:String型<br>
->}<br>
>]<br>
}<br>
</p>

### ID
ユーザのID、整数型<br>
### hist
ユーザの履歴、object配列<br>
### date
日時、文字列型
### fitness
行った運動、文字列型
### tag
運動の開始、終了のタグ、文字列型
