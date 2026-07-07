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
    "y": 48.3333740234375,
    "scale": 0.7,
    "text": "RKS"
  },
  "centerWO": {
    "x": 31.66656494140625,
    "y": 56.66668701171875,
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
    "x": 162.5001220703125,
    "y": -49.16668701171875,
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
    "x": -42.5,
    "y": -21.666656494140625,
    "scale": 1,
    "text": "PHASE/BREAK"
  },
  "phase2": {
    "x": 21.66668701171875,
    "y": -22.5,
    "scale": 1,
    "text": "PHASE/THINK"
  },
  "phase3": {
    "x": -20.8333740234375,
    "y": -26.666656494140625,
    "scale": 1.05,
    "text": "PHASE/BUILD"
  },
  "phase4": {
    "x": 41.666748046875,
    "y": -28.333343505859375,
    "scale": 1,
    "text": "PHASE/RELEASE"
  }
};
