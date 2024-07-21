const { NlpManager } = require("node-nlp");
const manager = new NlpManager({ languages: ["en", "fr"], forceNER: true });

// 1 - Train the IA
async function trainChatBotIA() {
  return new Promise(async (resolve, reject) => {
    // Adds the utterances and intents for the NLP
    // // Train also the NLG
    // Adds the utterances and intents for the NLP
    manager.addDocument("en", "goodbye for now", "greetings.bye");
    manager.addDocument("en", "bye bye take care", "greetings.bye");
    manager.addDocument("en", "okay see you later", "greetings.bye");
    manager.addDocument("en", "bye for now", "greetings.bye");
    manager.addDocument("en", "i must go", "greetings.bye");
    manager.addDocument("en", "hello", "greetings.hello");
    manager.addDocument("en", "hi", "greetings.hello");
    manager.addDocument("en", "howdy", "greetings.hello");
    //hr hub general questions in english
    manager.addDocument("en", "whats hr hub", "hrhub.definition");
    manager.addDocument("en", "hr hub for candidates", "hrhub.candidates");

    // French data
    manager.addDocument("fr", "Salut", "salut");
    manager.addDocument("fr", "Hey", "salut");
    manager.addDocument("fr", "Bonjour", "salut");
    manager.addDocument("fr", "Salut, Comment ca va?", "salut.question");
    manager.addDocument("fr", "Bonjour, Comment vas-tu?", "salut.question");
    // Train also the NLG
    manager.addAnswer("en", "greetings.bye", "Till next time");
    manager.addAnswer("en", "greetings.bye", "see you soon!");
    manager.addAnswer("en", "greetings.hello", "Hey there!");
    manager.addAnswer("en", "greetings.hello", "Greetings!");

    //hr hub general answers in english
    manager.addAnswer(
      "en",
      "hrhub.definition",
      "We aim to help HR cabinets & headhunters to have the best recruitment experience!"
    );
    manager.addAnswer(
      "en",
      "hrhub.candidates",
      "We provide for our candidates a recommendation system and an E-learning side to improve their skills for a better future."
    );
    manager.addAnswer("fr", "salut", "Salut");
    manager.addAnswer("fr", "salut", "Bonjour!");
    manager.addAnswer("fr", "salut.question", "Très bien, merci");
    manager.addAnswer("fr", "salut.question", "Comme ci, Comme ca");
    await manager.train();
    manager.save();
    console.log("AI has been trainded");
    resolve(true);
  });
}

async function generateResponseAI(qsm) {
  // Train and save the mode
  return new Promise(async (resolve, reject) => {
    const response = await manager.process(qsm);
    resolve(response);
  });
}

const connectWebSocket = (io) => {
  io.on("connection", function (socket) {
    socket.on("join", (userId) => {
      socket.join(userId);
      console.log("New user joined!");
    });

    socket.on("new-msg", async function (data) {
      let response = await generateResponseAI(data.msg);
      io.to(data.room).emit(
        "send-msg-response",
        response.answer !== undefined
          ? response.answer
          : "I am sorry, I don't understand :( "
      );
    });
  });
};

module.exports = {
  connectWebSocket,
  trainChatBotIA,
};
