import "./App.css";
import { useState } from "react";
import styled from "styled-components";

const DataContainer = styled.div`
  border-radius: 4px;
  background-color: #f8f8f8;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border: 1px solid black;
  height: 50px;
  width: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  margin-left: 5%;
  margin-right: 0.4%;
`;

const DataBox = styled.div`
  display: inline-block;
  align-items: center;
  padding: 60px;
  margin: 20px;
  justify-content: center;
`;

const Info = styled.div`
  border: 1px solid black;
  margin: 10px;
  width: 90%;
  margin-left: 5%;
  margin-right: 0.4%;
  height: 80px;
  background-color: #f8f8f8;
`;

function App() {
  const [textData, setTextData] = useState({
    words: 0,
    characters: 0,
    sentences: 0,
    paragraphs: 0,
    pronounces: 0,
  });

  const [averageReadingTime, setAverageReadingTime] = useState(0);
  const [longestWord, setLongestWord] = useState("");

  const handleTextChange = (e) => {
    const text = e.target.value;
    //const words = text.trim().split(/\s+/).length;
    const trimmedText = text.trim();
    const words = trimmedText
      .split(/\s+/)
      .filter((word) => word.length > 0).length;
    const characters = text.replace(/\s/g, "").length;
    const sentences = text.split(/[.!?]/).length - 1;
    // const paragraphs = text.split(/\n\n/).length;
    let paragraphs = 0;
    const pronounces =
      text.match(/\b(I|you|he|she|it|we|they|her|him|them|us|we)\b/gi)
        ?.length || 0;

    const averageWordsPerMinute = 200;
    const readingTime = Math.ceil(words / averageWordsPerMinute);

    const longestWordInText = text
      .split(/\s+/)
      .reduce(
        (longest, word) => (word.length > longest.length ? word : longest),
        ""
      );

    if (text.trim().length > 0) {
      paragraphs = text
        .split(/\n+\s*\n/)
        .filter((paragraph) => paragraph.trim().length > 0).length;
    }

    setTextData({ words, characters, sentences, paragraphs, pronounces });
    setAverageReadingTime(readingTime);
    setLongestWord(longestWordInText);
  };

  return (
    <div className="App">
      <h2>Text Analyzer</h2>
      <div id="border-div">
        <DataContainer>
          <DataBox id="box">
            <li>
              Words:<br></br>
              {textData.words}
            </li>
            <li>
              Characters:<br></br>
              {textData.characters}
            </li>
            <li>
              Sentences:<br></br>
              {textData.sentences}
            </li>
            <li>
              Paragraphs:<br></br>
              {textData.paragraphs}
            </li>
            <li>
              Pronounces:<br></br>
              {textData.pronounces}
            </li>
          </DataBox>
        </DataContainer>
        <textarea onChange={handleTextChange}></textarea>
        <div>
          <Info>
            <li id="avg">Average Reading Time: {averageReadingTime} minutes</li>
            <li id="lng">Longest Word: {longestWord} </li>
          </Info>
        </div>
      </div>
    </div>
  );
}

export default App;
