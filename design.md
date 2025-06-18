ВАЖНО:
Все ответы с бэка идут в формате:
{
  "isSuccess": true,         // или false, если ошибка
  "statusCode": 200,         // или 400/401/500 и т.д.
  "errorMessages": null,     // или список ошибок
  "result": { /* данные */ } // полезная нагрузка
}


1) Авторизация 
С главной страницы можно нажать кнопку войти и перейти на страницу входа
Поля входа:
-email
-password

Бизнес-логика:
-Токен надо сохранить в LocalStorage или cookie.
-Прокидывать в каждый запрос: Authorization: Bearer <token>.

Снизу будет надпись "У вас нет аккаунта? Зарегестрируйтесь(кнопка)"
Поля регистрации:
-username
-email
-password
-confirmPassword

Бизнес-логика:
-Email должен быть уникальным.
-Пароль и подтверждение должны совпадать.
-Пароль минимум 6 символов
-После регистрации сразу можно войти.

DTO and Endpoints:

__POST /api/Auth/Register__
Тело запроса — RegisterRequestDto:
{
  "fullName": "Иван Иванов",
  "email": "user@example.com",
  "password": "string"
}

Ответ (успех) — RegisterResponseDto:
{
  "userId": "1e3e1917-38d9-4c01-823f-e14e878ccfee",
  "email": "user@example.com",
  "role": "User"
}

__POST /api/Auth/Login__
Тело запроса — LoginRequestDto:
{
  "email": "user@example.com",
  "password": "string"
}
Ответ (успех) — LoginResponseDto:
{
  "email": "user@example.com",
  "token": "jwt_access_token"
}


2) Личный кабинет

1. Блок User
На странице личного кабинета сверху отображается информация о текущем пользователе. Он может посмотреть и изменить свои данные.

Поля отображения:
-email (только для чтения)
-fullName
-country
-phoneNumber
-language (по умолчанию "ru")

Бизнес-логика:
-Все действия доступны только после авторизации
(Authorization:Bearer <token>)
-Email не редактируется
-При входе в /account нужно загрузить данные из /api/user/me
-При клике по кнопке "Сохранить" — отправить PUT на тот же endpoint

DTO and Endpoints:

__GET /api/user/me__
"result": {
    "email": "user@example.com",
    "fullName": "Иван Иванов",
    "country": "RU",
    "phoneNumber": "+79999999999",
    "language": "ru"
  }

__PUT /api/user/me__
Тело запроса — UserProfileDto
{
  "fullName": "Иван Иванов",
  "country": "RU",
  "phoneNumber": "+79999999999",
  "language": "ru"
}
Ответ (успех):
{
  "isSuccess": true,
  "statusCode": 200,
  "errorMessages": null,
  "result": "Profile updated successfully"
}


2. Текущий тариф

На странице личного кабинета отображается актуальная подписка пользователя. Подписка может быть продлена, отключена от автопродления или неактивна, если срок истёк.

Поля отображения:
-Название тарифа (currentTariffName)
-Дата окончания (expiresAt)
-Статус — подписка считается активной, если expiresAt > текущая дата
-Галка "Автопродление" (isAutoRenew)
-Кнопка "Продлить подписку"

Бизнес-логика:
-Все действия доступны только после авторизации (Authorization: Bearer <token>)
-Галка автопродления управляет полем enableAutoRenew
  При покупке: передаётся в POST /subscription/purchase
  После покупки: меняется через PUT /subscription/autorenew
-Кнопка "Продлить подписку":
  Перенаправляет на /billing?tariffId=...
  После оплаты вызывается POST /subscription/purchase
-Если подписка null — отображается “Нет активной подписки”

DTO and Endpoints

GET /api/subscription/my
Получение текущей подписки
{
  "isSuccess": true,
  "statusCode": 200,
  "result": {
    "currentTariffName": "Premium 30",
    "expiresAt": "2024-08-01T00:00:00",
    "isAutoRenew": true,
    "isActive": true 
  }
}

POST /api/subscription/purchase
Тело запроса:
{
  "tariffId": "guid",
  "enableAutoRenew": true
}
Ответ:
{
  "isSuccess": true,
  "result": "Subscription purchased successfully"
}

PUT /api/subscription/autorenew
Тело запроса:
{
  "enable": false
}
Ответ:
{
  "isSuccess": true,
  "result": "Autorenewal setting updated"
}


