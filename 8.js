// Медіатор (Mediator) — це патерн програмування, який визначає об'єкт, який інкапсулює взаємодію між групою об'єктів. Медіатор сприяє слабкій залежності між цими об'єктами,
// дозволяючи спілкуватися з ними через централізовану точку.
const mediator = {
  sendMessage(user, message) {
    if (user instanceof User) {
      if (user.name === "John") {
        new SMSMessenger().sendMessage(user, message);
      } else if (user.name === "Jane") {
        new EmailMessenger().sendMessage(user, message);
      }
    }
  }
};
// Клас User відповідає за користувача, який може відправляти повідомлення.
class User {
  // Створюємо конструктор класу, який приймає name та messenger як параметри та ініціалізує їх
  // Робимо метод sendMessage який відправляє повідомлення за допомогою відповідного месенджера, та виводить в консоль `${this.name} відправив повідомлення ${message}`.
  // Він приймає один параметр - message - повідомлення, яке потрібно відправити за допомогою методу sendMessage.
  // Метод receiveMessage приймає аргументи user,message та виводить в консоль ${this.name} отримав повідомлення
  constructor(name) {
    this.name = name;
  }

  sendMessage(message) {
    console.log(`${this.name} відправив повідомлення: ${message}`);
    mediator.sendMessage(this, message); // Виклик методу sendMessage на медіаторі
  }

  receiveMessage(sender, message) {
    console.log(`${this.name} отримав повідомлення від ${sender.name}: ${message}`);
  }
}

// Клас SMSMessenger відповідає за відправку повідомлень за допомогою SMS.
class SMSMessenger {
  sendMessage(user, message) {
    console.log(`Відправлено SMS: ${message}`);
    user.receiveMessage(this, message);
  }
}

// Клас EmailMessenger відповідає за відправку повідомлень за допомогою Email.
class EmailMessenger {
  sendMessage(user, message) {
    console.log(`Відправлено Email: ${message}`);
    user.receiveMessage(this, message);
  }
}



console.log("Завдання 7 ====================================");
// Після виконання розкоментуйте код нижче
// Створюємо двох користувачів - John та Jane - які відправляють повідомлення за допомогою різних месенджерів.
const john = new User("John", SMSMessenger);
const jane = new User("Jane", EmailMessenger);

// John відправляє повідомлення за допомогою SMS.
john.sendMessage("Привіт!"); // Виведе: Відправлено SMS: [John]: Привіт!

// Jane відправляє повідомлення за допомогою Email.
jane.sendMessage("Привіт!"); // Виведе: Відправлено Email: [Jane]: Привіт!
