# 2021-summer-3-b

## API
### /api/login
<p>
call:("api/login",{ID,pass})<br>
return:{name,session}<br>
<br>  
ID:ユーザのID<br>
pass:パスワードをハッシュ化したもの<br>
name:ユーザ名<br>
session:ユーザに紐づいたセッション番号<br>
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
