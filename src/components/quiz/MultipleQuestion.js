const MultipleChoiceQuestion = ({
  question,
  onSelectOption,
  selectedOption,
}) => {
  const options = [
    "pilihan_a",
    "pilihan_b",
    "pilihan_c",
    "pilihan_d",
    "pilihan_e",
  ];
  // Mengacak urutan pilihan jawaban menggunakan fungsi Array.prototype.sort()
  const shuffledOptions = options.sort(() => Math.random() - 0.5);

  const handleOptionChange = (event) => {
    onSelectOption(question.id_soal, event.target.value);
  };

  return (
    <div>
      {/*
      {shuffledOptions.map((option, index) => (
        <>
          <label key={option}>
            <input
              type="radio"
              value={option}
              checked={selectedOption === option}
              onChange={handleOptionChange}
            />
            {question[option]}
          </label>
          <br />
        </>
      ))} */}
      <p>{question.pertanyaan}</p>
      <label>
        <input
          type="radio"
          value="pilihan_a"
          checked={selectedOption === "pilihan_a"}
          onChange={handleOptionChange}
        />
        {question.pilihan_a}
      </label>
      <br />
      <label>
        <input
          type="radio"
          value="pilihan_b"
          checked={selectedOption === "pilihan_b"}
          onChange={handleOptionChange}
        />
        {question.pilihan_b}
      </label>
      <br />
      <label>
        <input
          type="radio"
          value="pilihan_c"
          checked={selectedOption === "pilihan_c"}
          onChange={handleOptionChange}
        />
        {question.pilihan_c}
      </label>
      <br />
      <label>
        <input
          type="radio"
          value="pilihan_d"
          checked={selectedOption === "pilihan_d"}
          onChange={handleOptionChange}
        />
        {question.pilihan_d}
      </label>
      <br />
      <label>
        <input
          type="radio"
          value="pilihan_e"
          checked={selectedOption === "pilihan_e"}
          onChange={handleOptionChange}
        />
        {question.pilihan_e}
      </label>
      <br />
    </div>
  );
};
export default MultipleChoiceQuestion;
