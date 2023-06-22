import MultipleChoiceQuestion from "@/components/quiz/MultipleQuestion";
import pagination from "@/lib/services/pagination/pagination";
import WithAuth from "@/lib/sessions/withAuth";
import { Box, Typography } from "@mui/material";
import React from "react";

export const getServerSideProps = WithAuth(async ({ query, req, params }) => {
  const { token, client_id, role } = req.session.user;
  const session = {
    client_id,
    role,
  };
  const question = await pagination(
    "/soal",
    {},
    {
      Authorization: token,
    }
  );
  return {
    props: {
      question,
    },
  };
});

const Quiz = ({ question }) => {
  const [selectedOptions, setSelectedOptions] = React.useState({});
  const [score, setScore] = React.useState(0);
  console.log(score);

  const handleSelectOption = (questionId, optionValue) => {
    setSelectedOptions((prevSelectedOptions) => ({
      ...prevSelectedOptions,
      [questionId]: optionValue,
    }));
  };

  const handleSubmit = () => {
    const currentScore = 0;
    shuffledQuestions.forEach((question) => {
      if (question.kunci === selectedOptions[question.id_soal]) {
        currentScore++;
      }
    });
    setScore(currentScore);
  };

  const shuffleQuestions = () => {
    const shuffledQuestions = [...question.data];
    shuffledQuestions.forEach((question) => {
      const options = [
        "pilihan_a",
        "pilihan_b",
        "pilihan_c",
        "pilihan_d",
        "pilihan_e",
      ];
      const shuffledOptions = shuffleArray(options);
      question = { ...question, ...shuffledOptions };
    });

    // Mengacak posisi pertanyaan secara keseluruhan
    for (let i = shuffledQuestions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledQuestions[i], shuffledQuestions[j]] = [
        shuffledQuestions[j],
        shuffledQuestions[i],
      ];
    }

    return shuffledQuestions;
  };

  const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  };

  const shuffledQuestions = React.useMemo(() => shuffleQuestions(), []);

  React.useEffect(() => {
    const savedSelectedOptions = JSON.parse(
      localStorage.getItem("selectedOptions")
    );
    if (savedSelectedOptions) {
      setSelectedOptions(savedSelectedOptions);
    }
  }, []);

  React.useEffect(() => {
    localStorage.setItem("selectedOptions", JSON.stringify(selectedOptions));
  }, [selectedOptions]);

  return (
    <div>
      {shuffledQuestions.map((question) => (
        <MultipleChoiceQuestion
          key={question.id_soal}
          question={question}
          onSelectOption={handleSelectOption}
          selectedOption={selectedOptions[question.id_soal] || ""}
        />
      ))}
      <button onClick={handleSubmit}>Submit</button>
      <Typography>Nilai anda : {score * 10}</Typography>
    </div>
  );
};

Quiz.layout = "Admin";
export default Quiz;
