import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  const completion = await openai.createCompletion("text-davinci-001", {
    // prompt: generatePrompt(req.body.animal),
    prompt: req.body.animal,
    temperature: req.body.temperature,
    max_tokens: req.body.length,
  });
  res.status(200).json({ result: completion.data.choices[0].text });
}

// function generatePrompt(animal) {
//   // const capitalizedAnimal = animal[0].toUpperCase() + animal.slice(1).toLowerCase();
//   // return `I am applying for a job as a creative writing professor at UCLA. Here is a 500-word Statement articulating my readiness to employ inclusive teaching practices for classrooms with gender, age, ethnic, cultural, and sexual identity diversity:`;
//   // return `I am applying for a job as a creative writing professor at UCLA. Here is a 500-word Philosophy of teaching statement articulating my approach to teaching writing to new, adult writers:`;
//   return `${animal}`;
// }
