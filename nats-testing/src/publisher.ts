import nats from "node-nats-streaming";

console.clear();
const data = {
  id: "123",
  title: "concert",
  price: 20,
};

const stan = nats.connect("ticketing", "abc", {
  url: "http://localhost:4222",
});

stan.on("connect", () => {
  console.log("Publisher connected to NATS");

  stan.publish("ticket:created", JSON.stringify(data), () => {
    console.log("Event published");
  });
});
