import React, { useState, useEffect } from 'react'
import data from '../../utils/kanji-jouyou.json'
import { shuffleArray } from '../../utils/shuffleArray'
import {
  EuiFlexItem,
  EuiButton,
  EuiComboBox,
  EuiFieldNumber,
} from "@elastic/eui";

const StartMenu = ({ initialize }) => {
  const [grade, setGrade] = useState(0)
  const [jlpt, setJlpt] = useState(0)
  const [number, setNumber] = useState(0)
  const [grades, setGrades] = useState([])
  const [jlptLevels, setJlptLevels] = useState([])
  const [kanjiList, setKanjiList] = useState([])
  const [selectedGrade, setSelectedGrade] = useState([]);
  const [selectedJLPT, setSelectedJLPT] = useState([]);

  const handleGradeChange = (selectedOptions) => {
    setSelectedGrade(selectedOptions);
  };

  const handleJLPTChange = (selectedOptions) => {
    setSelectedJLPT(selectedOptions);
  };


  useEffect(() => {
    setNumber(kanjiList.length)
  }, [kanjiList])
  useEffect(() => {
    setGrades([1, 2, 3, 4, 5, 6, 8])
    setJlptLevels([5, 4, 3, 2, 1])
    setNumber(100)
  }, [])

  useEffect(() => {
    setKanjiList(
      Object.keys(data).filter((kanji) => {
        return (
          (grade === 0 || grade === data[kanji].grade) &&
          (jlpt === 0 || jlpt === data[kanji].jlpt_new)
        )
      })
    )
  }, [grade, jlpt])

  const handleNumberChange = (e) => {
    setNumber(parseInt(e.target.value))
  }
  const handleNumberBlur = (e) => {
    const num = e.target.value
    const parsedNum = parseInt(num)
    if (!parsedNum || !num) {
      setNumber(4)
    } else if (parsedNum > kanjiList.length) {
      setNumber(kanjiList.length)
    } else if (parsedNum < 4) {
      setNumber(4)
    } else {
      setNumber(parsedNum)
    }
  }

  const setupQuiz = () => {
    if (kanjiList.length < 4) {
      alert(
        'Number of kanji needs to be at least 4 \nPlease select a different grade/JLPT level'
      )
    } else {
      initialize(shuffleArray(kanjiList).slice(0, number ? number : 4))
    }
  }

  return (
    <div className='flex justify-center items-center mt-20'>
      <div className="p-4 shadow-lg w-96">
      <div className='flex justify-center items-center mb-5'>
        <h1 className='text-4xl mr-2 text-purple-400'>Word Quiz</h1>
      </div>
        <div className="mb-4">
          <EuiComboBox
            options={grades.map((g, index) => ({
              value: `${g}`,
              label: `Grade ${g} (${kanjiList.filter((k) => data[k].grade === g).length})`,
            }))}
            selectedOptions={selectedGrade}
            onChange={handleGradeChange}
            placeholder="Select Grade"
            isClearable={true} // Optional, allows clearing the selection
            singleSelection={{ asPlainText: true }}
          />
        </div>
        <div className="mb-4">
          <EuiComboBox
            options={jlptLevels.map((j, index) => ({
              value: `${j}`,
              label: `JLPT N${j} (${kanjiList.filter((k) => data[k].jlpt_new === j).length})`,
            }))}
            selectedOptions={selectedJLPT}
            onChange={handleJLPTChange}
            placeholder="Select JLPT Level"
            isClearable={true} // Optional, allows clearing the selection
            singleSelection={{ asPlainText: true }}
          />

        </div>
        <div className="mb-4">
        <p className='mb-1'>Number of kanji</p>
            <EuiFieldNumber
              value={number}
              onChange={handleNumberChange}
              onBlur={handleNumberBlur}
              compressed // Optional, reduces the padding for a compact style
            />
        </div>
        <EuiFlexItem>
          <EuiButton
             color='primary'
             id="english" 
             onClick={() => setupQuiz()}
           >
            Push to Start
           </EuiButton>                    
          </EuiFlexItem>
      </div>


    </div>
  )
}

export default StartMenu
