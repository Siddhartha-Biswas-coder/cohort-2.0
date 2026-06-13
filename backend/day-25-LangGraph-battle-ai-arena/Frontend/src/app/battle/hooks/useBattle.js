import { setAIBattle } from "../services/battle.api.js";
import { useContext } from "react";
import { BattleContext } from "../battle.context.jsx";

const useBattle = () => {
  const context = useContext(BattleContext);
  const { data, setData, isLoading, setIsLoading, error, setError } = context;

  // No destructuring: accept question as a string directly
  async function handleSendQuestion(question) {
    setIsLoading(true);
    setError(null);

    try {
      const response = await setAIBattle(question);
      setData(response);
    } catch (err) {
      setError(`Failed to fetch the AI responses: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  }

  return { handleSendQuestion, isLoading, data, error }; // Consistent names
};

export default useBattle;
