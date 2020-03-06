import React from 'react'

const projectTitle = 'Example Project'
const filesInfo = [
  {
    id: 'src/exercise/01.js',
    fullFilePath:
      '/Users/kentcdodds/code/advanced-react-patterns/src/exercise/01.js',
    filePath: 'src/exercise/01.js',
    isolatedPath: '/isolated/exercise/01.js',
    ext: '.js',
    filename: '01',
    type: 'exercise',
    number: 1,
    extraCreditNumber: 1,
    title: 'React Context',
    extraCreditTitle: '',
  },
  {
    id: 'src/exercise/01.md',
    fullFilePath:
      '/Users/kentcdodds/code/advanced-react-patterns/src/exercise/01.md',
    filePath: 'src/exercise/01.md',
    isolatedPath: '/isolated/exercise/01.md',
    ext: '.md',
    filename: '01',
    type: 'instruction',
    number: 1,
    extraCreditNumber: 1,
    title: 'Context',
  },
  {
    id: 'src/exercise/02.js',
    fullFilePath:
      '/Users/kentcdodds/code/advanced-react-patterns/src/exercise/02.js',
    filePath: 'src/exercise/02.js',
    isolatedPath: '/isolated/exercise/02.js',
    ext: '.js',
    filename: '02',
    type: 'exercise',
    number: 2,
    extraCreditNumber: 2,
    title: 'Compound Components',
    extraCreditTitle: '',
  },
  {
    id: 'src/exercise/02.md',
    fullFilePath:
      '/Users/kentcdodds/code/advanced-react-patterns/src/exercise/02.md',
    filePath: 'src/exercise/02.md',
    isolatedPath: '/isolated/exercise/02.md',
    ext: '.md',
    filename: '02',
    type: 'instruction',
    number: 2,
    extraCreditNumber: 2,
    title: 'Compound Components',
  },
  {
    id: 'src/exercise/03.js',
    fullFilePath:
      '/Users/kentcdodds/code/advanced-react-patterns/src/exercise/03.js',
    filePath: 'src/exercise/03.js',
    isolatedPath: '/isolated/exercise/03.js',
    ext: '.js',
    filename: '03',
    type: 'exercise',
    number: 3,
    extraCreditNumber: 3,
    title: 'Flexible Compound Components',
    extraCreditTitle: '',
  },
  {
    id: 'src/exercise/03.md',
    fullFilePath:
      '/Users/kentcdodds/code/advanced-react-patterns/src/exercise/03.md',
    filePath: 'src/exercise/03.md',
    isolatedPath: '/isolated/exercise/03.md',
    ext: '.md',
    filename: '03',
    type: 'instruction',
    number: 3,
    extraCreditNumber: 3,
    title: 'Flexible Compound Components',
  },
  {
    id: 'src/final/01.extra-1.js',
    fullFilePath:
      '/Users/kentcdodds/code/advanced-react-patterns/src/final/01.extra-1.js',
    filePath: 'src/final/01.extra-1.js',
    isolatedPath: '/isolated/final/01.extra-1.js',
    ext: '.js',
    filename: '01.extra-1',
    type: 'extraCredit',
    number: 1,
    extraCreditNumber: 1,
    title: 'React Context',
    extraCreditTitle: 'moving async logic to the helper',
  },
  {
    id: 'src/final/01.extra-2.js',
    fullFilePath:
      '/Users/kentcdodds/code/advanced-react-patterns/src/final/01.extra-2.js',
    filePath: 'src/final/01.extra-2.js',
    isolatedPath: '/isolated/final/01.extra-2.js',
    ext: '.js',
    filename: '01.extra-2',
    type: 'extraCredit',
    number: 1,
    extraCreditNumber: 2,
    title: 'Context',
    extraCreditTitle: 'avoiding unmount issues',
  },
  {
    id: 'src/final/01.js',
    fullFilePath:
      '/Users/kentcdodds/code/advanced-react-patterns/src/final/01.js',
    filePath: 'src/final/01.js',
    isolatedPath: '/isolated/final/01.js',
    ext: '.js',
    filename: '01',
    type: 'final',
    number: 1,
    extraCreditNumber: 1,
    title: 'React Context',
    extraCreditTitle: '',
  },
  {
    id: 'src/final/02.extra-1.js',
    fullFilePath:
      '/Users/kentcdodds/code/advanced-react-patterns/src/final/02.extra-1.js',
    filePath: 'src/final/02.extra-1.js',
    isolatedPath: '/isolated/final/02.extra-1.js',
    ext: '.js',
    filename: '02.extra-1',
    type: 'extraCredit',
    number: 2,
    extraCreditNumber: 1,
    title: 'Compound Components',
    extraCreditTitle: 'Support non-toggle children',
  },
  {
    id: 'src/final/02.js',
    fullFilePath:
      '/Users/kentcdodds/code/advanced-react-patterns/src/final/02.js',
    filePath: 'src/final/02.js',
    isolatedPath: '/isolated/final/02.js',
    ext: '.js',
    filename: '02',
    type: 'final',
    number: 2,
    extraCreditNumber: 2,
    title: 'Compound Components',
    extraCreditTitle: '',
  },
  {
    id: 'src/final/03.extra-1.js',
    fullFilePath:
      '/Users/kentcdodds/code/advanced-react-patterns/src/final/03.extra-1.js',
    filePath: 'src/final/03.extra-1.js',
    isolatedPath: '/isolated/final/03.extra-1.js',
    ext: '.js',
    filename: '03.extra-1',
    type: 'extraCredit',
    number: 3,
    extraCreditNumber: 1,
    title: 'Flexible Compound Components with context',
    extraCreditTitle: 'custom hook validation',
  },
  {
    id: 'src/final/03.js',
    fullFilePath:
      '/Users/kentcdodds/code/advanced-react-patterns/src/final/03.js',
    filePath: 'src/final/03.js',
    isolatedPath: '/isolated/final/03.js',
    ext: '.js',
    filename: '03',
    type: 'final',
    number: 3,
    extraCreditNumber: 3,
    title: 'Flexible Compound Components with context',
    extraCreditTitle: '',
  },
]

const imports = {
  'src/exercise/01.js': () => import('./exercise/01'),
  'src/exercise/01.md': () =>
    import('!babel-loader!mdx-loader!./exercise/01.md'),
  'src/exercise/02.js': () => import('./exercise/02.js'),
  'src/exercise/02.md': () =>
    import('!babel-loader!mdx-loader!./exercise/02.md'),
  'src/exercise/03.js': () => import('./exercise/03.js'),
  'src/exercise/03.md': () =>
    import('!babel-loader!mdx-loader!./exercise/03.md'),
  'src/final/01.extra-1.js': () => import('./final/01.extra-1.js'),
  'src/final/01.extra-2.js': () => import('./final/01.extra-2.js'),
  'src/final/01.js': () => import('./final/01.js'),
  'src/final/02.js': () => import('./final/02.js'),
  'src/final/03.extra-1.js': () => import('./final/03.extra-1.js'),
  'src/final/03.js': () => import('./final/03.js'),
}

const lazyComponents = {}
for (const {ext, filePath} of filesInfo) {
  if (ext === '.js' || ext === '.md' || ext === '.mdx') {
    lazyComponents[filePath] = React.lazy(imports[filePath])
  }
}

const exerciseInfo = []
const exerciseTypes = ['final', 'exercise', 'extraCredit', 'instruction']
for (const fileInfo of filesInfo) {
  if (exerciseTypes.includes(fileInfo.type)) {
    exerciseInfo[fileInfo.number] = exerciseInfo[fileInfo.number] ?? {
      extraCredit: [],
    }
    const info = exerciseInfo[fileInfo.number]
    if (fileInfo.type === 'extraCredit') {
      info.extraCredit.push(fileInfo)
    } else if (fileInfo.type === 'instruction') {
      info.instruction = fileInfo
      const {title, number, id} = fileInfo
      Object.assign(info, {title, number, id})
    } else {
      Object.assign(info, {
        [fileInfo.type]: fileInfo,
      })
    }
  }
}

for (const info of exerciseInfo) {
  if (info) {
    info.next = exerciseInfo[info.number + 1]
    info.previous = exerciseInfo[info.number - 1]
  }
}

export {projectTitle, lazyComponents, exerciseInfo}
