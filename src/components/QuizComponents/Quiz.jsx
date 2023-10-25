import React from 'react'
import { useState, useEffect } from 'react'
import { shuffleArray } from '../../utils/shuffleArray'
import { getRandom } from '../../utils/getRandom'

import data from '../../utils/kanji-jouyou.json'
import ScoreBar from './ScoreBar'
import Kanji from './Kanji'
import StartMenu from './StartMenu'
import Answers from './Answers'
import Timer from './Timer'
import Finish from './Finish'
import Feedback from './Feedback'

const Quiz = () => {
  const [isStart, setIsStart] = useState(false)
  const [isFinished, setIsFinished] = useState(false)
  const [time, setTime] = useState(0)

  const [totalQs, setTotalQs] = useState(2136)
  const [kanjiList, setKanjiList] = useState([])

  const [kanji, setKanji] = useState('懐')
  const [wrongCount, setWrongCount] = useState(1)
  const [rightCount, setRightCount] = useState(1)
  const [possibleAns, setPossibleAns] = useState(['a', 'b', 'c', 'd'])
  const [isCorrect, setIsCorrect] = useState(false)
  const [currentAnswer, setCurrentAnswer] = useState('')
  const [currentVal, setCurrentVal] = useState(0)

  useEffect(() => {
    let interval = null
    if (isStart && isFinished === false) {
      interval = setInterval(() => {
        setTime((time) => time + 10)
      }, 10)
    } else if (isFinished === true) {
      clearInterval(interval)
    }
    return () => {
      clearInterval(interval)
    }
  }, [isStart, isFinished])

  const setupNext = () => {
    setKanji(kanjiList[currentVal + 1])
    setCurrentAnswer(data[kanjiList[currentVal + 1]].meanings[0])
    setPossibleAns(getPossibleAns(kanjiList, currentVal + 1))
    setCurrentVal(currentVal + 1)
  }
  const handleAnswer = (e) => {
    const answer = e.target.innerText
    if (answer === currentAnswer) {
      setIsCorrect(true)
      setRightCount(rightCount + 1)
    } else {
      setIsCorrect(false)
      setWrongCount(wrongCount + 1)
    }

    if (currentVal + 1 === totalQs) {
      setIsFinished(true)
    } else {
      setupNext()
    }
  }

  const getPossibleAns = (list, curVal) => {
    const ans = getRandom(list, 4)
    if (!ans.includes(list[curVal])) {
      ans[0] = list[curVal]
    }
    return shuffleArray(ans.map((key) => data[key].meanings[0]))
  }
  const initialize = (kanjiFiltered) => {
    setIsStart(true)
    setCurrentVal(0)
    setKanjiList(kanjiFiltered)
    setTotalQs(kanjiFiltered.length)
    setKanji(kanjiFiltered[currentVal])
    setCurrentAnswer(data[kanjiFiltered[currentVal]].meanings[0])
    setWrongCount(0)
    setRightCount(0)

    setPossibleAns(getPossibleAns(kanjiFiltered, currentVal))
  }

  if (!isStart) {
    return <StartMenu initialize={initialize} />
  }
  if (isFinished) {
    return (
      <Finish rightCount={rightCount} wrongCount={wrongCount} time={time} />
    )
  }
  return (
    <main>
      <div>
        <div  className={`container mt-3 flex items-center justify-center rounded-lg shadow-lg p-6 w-64 h-12 mx-auto text-center transform hover:translate-x-1 hover:translate-y-1 transition-transform duration-300 ease-in-out hover:shadow-md ${
          currentVal > 0 &&
          (isCorrect ? 'container mt-3 flex items-center justify-center rounded-lg shadow-lg p-6 w-64 h-12 mx-auto text-center transform hover:translate-x-1 hover:translate-y-1 transition-transform duration-300 ease-in-out hover:shadow-md bg-green-500' : 
          'container mt-3 flex items-center justify-center rounded-lg shadow-lg p-6 w-64 h-12 mx-auto text-center transform hover:translate-x-1 hover:translate-y-1 transition-transform duration-300 ease-in-out hover:shadow-md bg-red-500')
        }`}>
          <span className='font-semibold mt-5'>
          {currentVal > 0 && <Feedback isCorrect={isCorrect} />}
          </span>
        </div>
        <div className='mx-auto p-4 md:w-96 lg:w-120'>
          <div>
            <Kanji currentVal={currentVal} totalQs={totalQs} kanji={kanji} />
          <div className='flex justify-center items-center mx-auto'>
            <Timer time={time} />
          </div>
          <div className='flex justify-center items-center mb-5 mt-5'>
            <ScoreBar wrongCount={wrongCount} rightCount={rightCount} />
          </div>
          <div className='flex justify-center items-center mx-auto mb-5'>
            <Answers possibleAns={possibleAns} handleAnswer={handleAnswer} />
          </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Quiz

// https://www.smashingmagazine.com/2014/07/bem-methodology-for-small-projects/
// https://www.conventionalcommits.org/en/v1.0.0/
// https://github.com/davidluzgouveia/kanji-data/blob/master/kanji-jouyou.json
// https://community.wanikani.com/t/list-of-kanji-by-level/42036/4
// https://github.com/davidluzgouveia/kanji-data
// https://Quiz.kanjialive.com/api/docs
