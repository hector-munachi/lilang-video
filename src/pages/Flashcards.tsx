import {
  EuiPanel,
  EuiButtonEmpty,
  EuiCard,
  EuiIcon,
  EuiFlexGroup,
  EuiFlexItem,
  EuiButton,
} from "@elastic/eui";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import useAuth from "../hooks/useAuth";
import MiniNav from "../components/MiniNav";

const chineseTerms = [
  ["挨", "ái", "to endure, to suffer"],
  ["爱不释手", "ài bù shì shǒu", "not wanting to give something out of one's hand"],
  ["爱戴", "ài dài", "to love and respect"],
  ["暧昧", "ài mèi", "ambiguous, equivocal, dubious"],
  ["哎哟", "āi yō", "ow, ouch, ah"],
  ["安居乐业", "ān jū lè yè", "to live in peace and work happily"],
  ["按摩", "àn mó", "massage, to massage"],
  ["安宁", "ān níng", "peace, tranquil"],
  ["暗示", "àn shì", "hint, suggestion"],
  ["安详", "ān xiáng", "composed, serene"],
  ["安置", "ān zhì", "to find a place for, to arrange for"],
  ["昂贵", "áng guì", "expensive, costly"],
  ["熬", "áo", "to endure, to suffer"],
  ["奥秘", "ào mì", "mystery, secret"],
  ["凹凸", "āo tū", "bumpy, uneven"]
];

export default function Flashcards() {
  useAuth();

  const [card1Selected, setCard1] = useState(true);

  const card1Clicked = () => {
    setCard1(!card1Selected);
  };


  const detailsClicked = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
  };

  const [term, setTerm] = useState<{ chinese: string; pinyin: string; english: string }>({
    chinese: "",
    pinyin: "",
    english: "",
  });
  const [displayMode, setDisplayMode] = useState("chinese");

  const generateTerm = () => {
    const randomNumber = Math.floor(Math.random() * chineseTerms.length);
    const [chinese, pinyin, english] = chineseTerms[randomNumber];
    
    setTerm({
      chinese,
      pinyin,
      english,
    });
  };
  

  const showChinese = () => {
    setDisplayMode("chinese");
  };

  const showPinyin = () => {
    setDisplayMode("pinyin");
  };

  const showEnglish = () => {
    setDisplayMode("english");
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        flexDirection: "column",
      }}
    > 
      <Header />
      <MiniNav />
      <EuiFlexGroup justifyContent="center" style={{ margin: "1rem" }}>
        <EuiFlexItem>
          <EuiPanel style={{ margin: "auto" }}>
            {displayMode === "chinese"
              ?   <EuiFlexItem>
              <EuiCard
                icon={<EuiIcon size="xxl" type="logoSketch" />}
                title={term.chinese}
                description="Example of a short card description."
                footer={
                  <EuiButtonEmpty
                    iconType="iInCircle"
                    size="xs"
                    onClick={detailsClicked}
                    aria-label="See more details about Sketch"
                  >
                    More details
                  </EuiButtonEmpty>
                }
                selectable={{
                  onClick: card1Clicked,
                  isSelected: card1Selected,
                }}
              />
            </EuiFlexItem>
              : displayMode === "pinyin"
              ? <EuiFlexItem>
              <EuiCard
                icon={<EuiIcon size="xxl" type="logoSketch" />}
                title={term.pinyin}
                description="Example of a short card description."
                footer={
                  <EuiButtonEmpty
                    iconType="iInCircle"
                    size="xs"
                    onClick={detailsClicked}
                    aria-label="See more details about Sketch"
                  >
                    More details
                  </EuiButtonEmpty>
                }
                selectable={{
                  onClick: card1Clicked,
                  isSelected: card1Selected,
                }}
              />
            </EuiFlexItem>
              : <EuiFlexItem>
              <EuiCard
                icon={<EuiIcon size="xxl" type="logoSketch" />}
                title={term.english}
                description="Example of a short card description."
                footer={
                  <EuiButtonEmpty
                    iconType="iInCircle"
                    size="xs"
                    onClick={detailsClicked}
                    aria-label="See more details about Sketch"
                  >
                    More details
                  </EuiButtonEmpty>
                }
                selectable={{
                  onClick: card1Clicked,
                  isSelected: card1Selected,
                }}
              />
            </EuiFlexItem>
            }
            <div style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "3em",
            }}>
          <EuiFlexGroup
          gutterSize="m"
          alignItems="center"
          responsive={false}
          wrap
          >
              <EuiFlexItem grow={false}>
          <EuiButton
             color='primary'
             id="new" 
             onClick={() => {generateTerm()}}
           >
            New Term 
           </EuiButton>                    
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
          <EuiButton
             color='accent'
             id='chinese' 
             onClick={() => {showChinese()}}
           >
            Chinese 
           </EuiButton>                    
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
          <EuiButton
             color='warning'
             id="pinyin" 
             onClick={() => {showPinyin()}}
           >
            Pinyin 
           </EuiButton>                    
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
          <EuiButton
             color='text'
             id="english" 
             onClick={() => {showEnglish()}}
           >
            English 
           </EuiButton>                    
          </EuiFlexItem>
          </EuiFlexGroup>
          </div>
          </EuiPanel>
        </EuiFlexItem>
      </EuiFlexGroup>
    </div>
  );
}
