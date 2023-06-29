const MultipleChoiceQuestion = ({
  question,
  onSelectOption,
  selectedOption,
}) => {
  const handleOptionChange = (event) => {
    onSelectOption(question.id_soal, event.target.value);
  };

  return (
    <div>
      <p>{question.pertanyaan}</p>
      <form>
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
      </form>
    </div>
  );
};
export default MultipleChoiceQuestion;
