export interface ElementLayout {
  x: number;
  y: number;
  scale: number;
  text?: string;
}

export interface StatementLayout {
  x: number;
  y: number;
  scale: number;
  line1: string;
  line2: string;
  line3: string;
  brandText: string;
}

export interface HeroLayoutConfig {
  ourText: ElementLayout;
  rksText: ElementLayout;
  centerWO: ElementLayout;
  centerWOShadow: ElementLayout;
  statementBox: StatementLayout;
  categoriesBlock: ElementLayout;
  phase1: ElementLayout;
  phase2: ElementLayout;
  phase3: ElementLayout;
  phase4: ElementLayout;
}

export const defaultHeroLayout: HeroLayoutConfig = {
  "ourText": {
    "x": -168.33328247070312,
    "y": -37.50004577636719,
    "scale": 0.7,
    "text": "OUR"
  },
  "rksText": {
    "x": 177.5,
    "y": 53.3333740234375,
    "scale": 0.7,
    "text": "RKS"
  },
  "centerWO": {
    "x": 30.833251953125,
    "y": 60,
    "scale": 0.65,
    "text": "WO"
  },
  "centerWOShadow": {
    "x": 9.9998779296875,
    "y": 16.666656494140625,
    "scale": 0.65,
    "text": "WO"
  },
  "statementBox": {
    "x": 187.5001220703125,
    "y": -78.33331298828125,
    "scale": 0.5499999999999999,
    "line1": "I BREAK THINGS",
    "line2": "TO SEE WHAT",
    "line3": "THEY ARE MADE  of",
    "brandText": "ENDEAVOUR\nTHINGS"
  },
  "categoriesBlock": {
    "x": 16.6666259765625,
    "y": 21.6666259765625,
    "scale": 0.8500000000000001,
    "text": "PUSHING THE BOUNDARIES\nCUSTOM SOLUTIONS\nCOLLABORATIVE TEAM\nCORE TECHNICAL DIVISION\nINFINITE POSSIBILITIES"
  },
  "phase1": {
    "x": -66.66667175292969,
    "y": 0.000030517578125,
    "scale": 1,
    "text": "PHASE/BREAK"
  },
  "phase2": {
    "x": -24.1666259765625,
    "y": 2.5,
    "scale": 1,
    "text": "PHASE/THINK"
  },
  "phase3": {
    "x": 56.6666259765625,
    "y": 5.833343505859375,
    "scale": 1.05,
    "text": "PHASE/BUILD"
  },
  "phase4": {
    "x": 115,
    "y": -4.1666259765625,
    "scale": 1,
    "text": "PHASE/RELEASE"
  }
};
