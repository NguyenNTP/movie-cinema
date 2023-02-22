import styled, {css} from 'styled-components';

export const Heading = styled.h1`
   text-align: center;
   color: green;
`;

export const Button = styled.div`
   position: fixed; 
   width: 100%;
   left: 50%;
   bottom: 40px;
   height: 20px;
   font-size: 3rem;
   z-index: 1;
   cursor: pointer;
   color: black;
   margin-bottom: 20px

   
   ${props => props.checkmb && css`
    @media only screen and (max-width: 1024px)  {
        left: 50%;
        margin-bottom: 5px
    }   
  `}
   `