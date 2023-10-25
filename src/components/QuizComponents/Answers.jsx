import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiButton,
} from "@elastic/eui";

const Answers = ({ possibleAns, handleAnswer }) => {
  return (
    <div className="container">
      <div className="flex flex-row justify-center items-center">
          <EuiFlexGroup
          gutterSize="m"
          alignItems="center"
          >
              <EuiFlexItem grow={false}>
          <EuiButton
             color='primary'
             id="new" 
             onClick={(e) => handleAnswer(e)}
           >
            {possibleAns[0]}
           </EuiButton>                    
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
          <EuiButton
             color='accent'
             id='chinese' 
             onClick={(e) => handleAnswer(e)}
           >
            {possibleAns[1]} 
           </EuiButton>                    
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
          <EuiButton
             color='warning'
             id="pinyin" 
             onClick={(e) => handleAnswer(e)}
           >
            {possibleAns[2]}
           </EuiButton>                    
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
          <EuiButton
             color='text'
             id="english" 
             onClick={(e) => handleAnswer(e)}
           >
            {possibleAns[3]}
           </EuiButton>                    
          </EuiFlexItem>
          </EuiFlexGroup>
          </div>
    </div>
  )
}

export default Answers
