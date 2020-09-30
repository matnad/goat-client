import * as webhook from "webhook-discord"

const Hook = new webhook.Webhook(process.env.WEBHOOK);


class Message {

  Message(user, text) {

  }

}
const msg = new webhook.MessageBuilder()
  .setName("Newti")
  .setColor("#aabbcc")
  .setText("Test asdf")
  .addField("This", "is")
  .addField("my", "test!")
  .setTime();

Hook.send(msg);
