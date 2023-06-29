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
        {/* Tambahkan opsi-opsi jawaban lainnya di sini */}
        <br />
      </form>
    </div>
  );
};
export default MultipleChoiceQuestion;
