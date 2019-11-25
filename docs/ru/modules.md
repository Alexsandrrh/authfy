## Модули для авторизации

- **Authfy** - это пожалуй самый важный модуль который,
  делает процесс авторизации проще простого.

```javascript
// Импротируем модуль
const Authfy = require("authfy");

/*
 * Данный метод у модуля Authfy отвечает
 * за регистрацию и запоминания Applet-ов для подключения к сервисам
 * Позже о нем будет рассказано...
 */
Authfy.use(new Applet());

Authfy.verify();

Authfy.try();

Authfy.finally();
```

- **Applet**
- **AppletReader**
- **Verify**
