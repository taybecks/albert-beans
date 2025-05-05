export type Program = {
  spins: {
    [key: string]: ProgramElement
  },
  jumps: ProgramJumps
}

export type ProgramElement = {
  id: string;
  label: string;
  value: number[];
  color: string;
}

export type ProgramJumps = {
  [key: string]: ProgramElementJump
}
export type ProgramElementJump = {
  id: string;
  label: string;
  value: number[];
  type: string;
}

export type JumpMap = {
  [key: string]: string[]
}

export const JumpComboMap: JumpMap = {
  'A': ['A', 'Eu', 'Lo', 'T', 'Wz'],
  'F': ['A', 'Eu', 'Lo', 'T', 'Wz'],
  'Lo': ['A', 'Eu', 'Lo', 'T', 'Wz'],
  'Lz': ['A', 'Eu', 'Lo', 'T', 'Wz'],
  'S': ['A', 'Eu', 'Lo', 'T', 'Wz'],
  'T': ['A', 'Eu', 'Lo', 'T', 'Wz'],
  'Wz': ['A', 'Eu', 'Lo', 'T', 'Wz'],
  'Eu': ['S', "F"],
}

export const PreBronze: Program = {
  spins: {
    '2FtUSp': {
      id: '2FtUSp',
      label: '2 Foot Upright Spin',
      value: [1.0, 1.2, 1.5, 1.9, 2.4],
      color: '#CDEEFE'
    },
    USp: {
      id: 'USp',
      label: 'Upright Spin',
      value: [1.0, 1.2, 1.5, 1.9, 2.4],
      color: '#CDEEFE'
    },
    LSp: {
      id: 'LSp',
      label: 'Layback Spin',
      value: [1.2, 1.5, 1.9, 2.4, 2.7],
      color: '#CDEEFE'
    },
    CSp: {
      id: 'CSp',
      label: 'Camel Spin',
      value: [1.1, 1.4, 1.8, 2.2, 2.6],
      color: '#E8B5F2'
    },
    SSp: {
      id: 'SSp',
      label: 'Sit Spin',
      value: [1.1, 1.3, 1.6, 2.1, 2.5],
      color: '#B3DBFE'
    },
    CUSp: {
      id: 'CUSp',
      label: 'Upright Spin w/ Change of Foot',
      value: [1.5, 1.7, 2.0, 2.4, 2.9],
      color: '#CDEEFE'
    },
    CLSp: {
      id: 'CLSp',
      label: 'Layback Spin w/ Change of Foot',
      value: [1.7, 2.0, 2.4, 2.9, 3.2],
      color: '#B3DBFE'
    },
    CCSp: {
      id: 'CCSp',
      label: 'Camel Spin w/ Change of Foot',
      value: [1.7, 2.0, 2.3, 2.8, 3.2],
      color: '#E8B5F2'
    },
    CSSp: {
      id: 'CSSp',
      label: 'Sit Spin w/ Change of Foot',
      value: [1.6, 1.9, 2.3, 2.7, 3.1],
      color: '#B3DBFE'
    },
    CoSp: {
      id: 'CoSp',
      label: 'Combo Spin w/ no Change of Foot',
      value: [1.5, 1.7, 2.0, 2.5, 2.8],
      color: '#B3DBFE'
    },
    CCoSp: {
      id: 'CCoSp',
      label: 'Combo Spin w/ Change of Foot',
      value: [1.7, 2.0, 2.5, 3.0, 3.5],
      color: '#B3DBFE'
    },
  },
  jumps: {
    '1HF': {
      id: '1HF',
      label: 'Half Flip',
      value: [0.3],
      type: 'F'
    },
    '1HLz': {
      id: '1HLz',
      label: 'Half Lutz',
      value: [0.3],
      type: 'Lz'
    },
    '1Wz': {
      id: '1Wz',
      label: 'Waltz',
      value: [0.3],
      type: 'Wz'
    },
    '1T': {
      id: '1T',
      label: 'Toe Loop',
      value: [0.4],
      type: 'T'
    },
    '1S': {
      id: '1S',
      label: 'Salchow',
      value: [0.4],
      type: 'S'
    },
    '1Lo': {
      id: '1Lo',
      label: 'Loop',
      value: [0.5],
      type: 'L'
    },
    '1Eu': {
      id: '1Eu',
      label: 'Euler',
      value: [0.5],
      type: 'Eu'
    },
    '1F': {
      id: '1F',
      label: 'Flip',
      value: [0.5],
      type: 'F'
    },
  },
};