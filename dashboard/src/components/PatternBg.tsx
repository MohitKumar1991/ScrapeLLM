import React from 'react';
import styled from 'styled-components';

export const PatternBg = styled.div`
  background: linear-gradient(180deg, #d039ec00 0%, #d039ec33 100%);
  background-size: 350px;
  background-blend-mode: overlay, normal;
  -webkit-background-blend-mode: overlay;
`;

export const GradientBg = styled.div`
  background: rgb(175,172,228);
  background: linear-gradient(90deg, rgba(175,172,228,1) 0%, rgba(99,102,241,1) 52%);
`;

export const PurpleBg = styled.div`
  background: linear-gradient(180deg, #6f66d9 0%, #d039ec 100%);
  background-size: 350px;
  background-blend-mode: overlay, normal;
  -webkit-background-blend-mode: overlay;
`;

export const PatternBg2 = styled(PatternBg)`
  background: linear-gradient(180deg, #d039ec00 0%, #d039ec33 100%), url('/pattern-2.png');
  background-size: 350px;
`;

export const PatternBg3 = styled(PatternBg)`
  background: linear-gradient(180deg, #d039ec00 0%, #00000000 100%), url('/pattern-3.png');
  background-size: 440px;
`;

export const PatternBg4 = styled(PatternBg)`
  background: linear-gradient(180deg, #d039ec00 0%, #d039ec33 100%), url('/pattern-4.png');
  background-size: 150px;
`;
