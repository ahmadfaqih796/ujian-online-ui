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
  const questions = [
    {
      id_soal: "279e0fbc-1670-11ee-99a1-ac50de69d382",
      pertanyaan: "Siapa Presiden pertama di Indonesia?",
      pilihan_a: "Bung Karno",
      pilihan_b: "Bung Kirno",
      pilihan_c: "Sutrison",
      pilihan_d: "Mson",
      pilihan_e: "Damni",
      kunci: "pilihan_a",
    },
    // Soal lainnya
  ];

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
    let currentScore = 0;

    // Melakukan sesuatu dengan selectedOptions, seperti menghitung skor
    question.data.forEach((question) => {
      console.log("raaaaaa", selectedOptions[question.id_soal]);
      if (question.kunci === selectedOptions[question.id_soal]) {
        currentScore++;
      }
    });
    setScore(currentScore);
  };

  return (
    <div>
      {question.data.map((question) => (
        <MultipleChoiceQuestion
          key={question.id_soal}
          question={question}
          onSelectOption={handleSelectOption}
          selectedOption={selectedOptions[question.id_soal] || ""}
        />
      ))}
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default Quiz;
