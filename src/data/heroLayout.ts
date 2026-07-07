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
  woText: ElementLayout;
  rksText: ElementLayout;
  domainText: ElementLayout;
  statementBox: StatementLayout;
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
    "x": 188.33349609375,
    "y": -38.333343505859375,
    "scale": 0.6,
    "line1": "I BREAK THINGS",
    "line2": "TO SEE WHAT",
    "line3": "THEY ARE MADE OF",
    "brandText": "ENDEAVOUR\nTHINGS"
  },
  "categoriesBlock": {
    "x": -35.000030517578125,
    "y": 32.5,
    "scale": 0.65,
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
    "x": 100.8333740234375,
    "y": 2.500030517578125,
    "scale": 1,
    "text": "PHASE/RELEASE"
  }
};
