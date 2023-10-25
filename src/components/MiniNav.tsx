import {
  EuiHeader,
  EuiHeaderLogo,
  EuiHeaderLinks,
  EuiHeaderLink,
  EuiHeaderSectionItemButton,
  EuiBadge,
  EuiIcon,
  useEuiTheme,
} from '@elastic/eui';
import { useNavigate } from "react-router-dom";

export default function MiniNav () {
  const { euiTheme } = useEuiTheme();
  const navigate = useNavigate();

  return (
    <EuiHeader
      theme="dark"
      sections={[
        {
          items: [
            <EuiHeaderLogo></EuiHeaderLogo>,
            <EuiHeaderLinks aria-label="App navigation dark theme example">
              <EuiHeaderLink isActive
                onClick={() => navigate("/flashcards")}
              >Flashcards</EuiHeaderLink>
              <EuiHeaderLink
                onClick={() => navigate("/quizmain")}
              >Quiz</EuiHeaderLink>
              <EuiHeaderLink iconType="help"> Help</EuiHeaderLink>
            </EuiHeaderLinks>,
          ],
        },
        {
          items: [
            <EuiBadge
              color={euiTheme.colors.darkestShade}
              iconType="arrowDown"
              iconSide="right"
            >
              Production logs
            </EuiBadge>,
          ],
        },
      ]}
    />
  );
};