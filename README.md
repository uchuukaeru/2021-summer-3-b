# 2021-summer-3-b

## API
### /api/login
<p>
call:("api/login",{ID,pass})<br>
return:{name,session}<br>
<br>
ログイン用API<br>
引数:object<br>
返り値:object<br><br>
ID:ユーザのID、整数型<br>
pass:パスワードをハッシュ化したもの、文字列型<br>
name:ユーザ名、文字列型<br>
session:ユーザに紐づいたセッション番号、小数型<br>
</p>

### /api/register
<p>
call:("api/register",{name,pass})<br>
return:{ID,session}<br>
<br>
ユーザ登録用API<br>
引数:object<br>
返り値:object<br><br>
name:ユーザ名、文字列型<br>
pass:パスワードをハッシュ化したもの、文字列型<br>
ID:ユーザのID、整数型<br>
session:ユーザに紐づいたセッション番号、小数型<br>
</p>

### /api/get_active
<p>
call:("api/get_active")<br>
return:[num, ...]<br>
<br>
アクティブユーザ検索用API<br>
引数:なし<br>
返り値:整数型配列<br><br>
num:アクティブユーザのID、整数型<br>
</p>

### /api/logout
<p>
call:("api/logout",{ID,session})<br>
return:"ok"<br>
<br>
アクティブユーザ検索用API<br>
引数:object<br>
返り値:文字列型<br><br>
ID:ユーザのID、整数型<br>
session:ユーザに紐づいたセッション番号、小数型<br>
</p>

## users.json
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
運動の種類、文字型配列<br>
### friend_ID
フレンド登録しているユーザのID、整数型配列<br>
