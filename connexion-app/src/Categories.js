import General from "./res/images/General.svg";
import Future_Monashians_New from "./res/images/Future_Monashians_New.svg";
import Freshmen_New from "./res/images/Freshmen_New.svg";
import Seniors_New from "./res/images/Seniors_New.svg";
import After_Monash_New from "./res/images/After_Monash_New.svg";

const categories = [
  {
    name: "General",
    description:
      "Want to talk about games or TV shows? Want to tell a funny anecdote on how your day went? Come here to discuss anything that is not scrictly Monash-related.",
    image: General,
    color: "#F85F73",
  },
  {
    name: "Future Monashians",
    description:
      "Interested in joining Monash? Not sure about the application process? This is the perfect place to interact with your peers and resolve all your questions!",
    image: Future_Monashians_New,
    color: "#F9ED69",
  },
  {
    name: "Freshmen",
    description:
      "Being a freshmen is overwhelming; you’re bombarded with information, opportunities, and deadlines. Here you can make friends and get your doubts clarified.",
    image: Freshmen_New,
    color: "#A8E6CF",
  },
  {
    name: "Seniors",
    description:
      "Are you well into your years in Monash? Getting anxious thinking about job-hunting after you graduate? Come and vent your frustrations and chat with fellow seniors!",
    image: Seniors_New,
    color: "#3EC1D3",
  },
  {
    name: "After Monash",
    description:
      "You’ve made it! You’ve graduated and are considered one of Monash’s valuable alumni... what now? Talk to people in similar situations and band together to keep yourselves sane.",
    image: After_Monash_New,
    color: "#AA96DA",
  },
];

export default categories;
