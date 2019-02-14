import styled from "styled-components";
import { H4, H6, Overline } from "../../../components/Fonts/Fonts";

export const Heading = styled(H4)`
  margin-bottom: 0.5rem;
`;

export const SubHeading = styled(H6)`
  margin-bottom: 1rem;
  color: ${props => props.theme.colors.foreground.tertiary};
`;

export const OrContainer = styled(Overline)`
  display: block;
  text-align: center;
  margin-bottom: 1rem;
`;
