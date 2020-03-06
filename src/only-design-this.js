/** @jsx jsx */
import {jsx, Global} from '@emotion/core'
import facepaint from 'facepaint'
import {IoMdStar} from 'react-icons/io'
import 'normalize.css/normalize.css'
import '@reach/tabs/styles.css'
// TODO: support dark mode? Use this for the syntax highlighting
// import 'prism-theme-night-owl/style.css'
import './prism-theme-light-owl.css'
import './workshop-styles.css'
import React from 'react'
import {createBrowserHistory} from 'history'
import {Router, Switch, Route, Link, useParams} from 'react-router-dom'
import {Tabs, TabList, Tab, TabPanels, TabPanel} from '@reach/tabs'
import {projectTitle, lazyComponents, exerciseInfo} from './test-data'
import Logo from './assets/logo'
import {colors} from './theme'
import {
  RiToolsLine,
  RiFlagLine,
  RiExternalLinkLine,
  RiArrowRightSLine,
  RiArrowLeftSLine,
} from 'react-icons/ri'

const history = createBrowserHistory()

function handleAnchorClick(event) {
  if (event.metaKey || event.shiftKey) {
    return
  }
  event.preventDefault()
  history.push(event.target.closest('a').getAttribute('href'))
}

function ExtraCreditLinks({exerciseNumber, ...props}) {
  const {extraCredit} = exerciseInfo[exerciseNumber]
  if (!extraCredit.length) {
    return null
  }

  return (
    <div
      css={{
        alignItems: 'center',
        display: 'flex',
        flexWrap: 'wrap',
        width: '100%',
      }}
      {...props}
    >
      <IoMdStar
        color="#EEC200"
        size={20}
        css={{marginRight: 3, marginBottom: 2}}
      />
      <span
        css={{
          fontSize: 14,
          marginRight: '0.25rem',
          opacity: 0.9,
          textTransform: 'uppercase',
        }}
      >
        Extra Credits:
      </span>
      {extraCredit.map(
        ({extraCreditTitle, extraCreditNumber, isolatedPath}, index, array) => (
          <span key={extraCreditNumber}>
            <a href={isolatedPath} onClick={handleAnchorClick}>
              {extraCreditTitle}
            </a>
            {array.length - 1 === index ? null : (
              <span css={{marginRight: 5}}>,</span>
            )}
          </span>
        ),
      )}
    </div>
  )
}

function ExerciseContainer() {
  const {exerciseNumber} = useParams()
  const {instruction, exercise, final} = exerciseInfo[exerciseNumber]
  let exerciseElement, finalElement, instructionElement

  if (lazyComponents[exercise.id]) {
    exerciseElement = React.createElement(lazyComponents[exercise.id])
  }
  if (lazyComponents[final.id]) {
    finalElement = React.createElement(lazyComponents[final.id])
  }
  if (lazyComponents[instruction.id]) {
    instructionElement = React.createElement(lazyComponents[instruction.id])
  }

  return (
    <>
      <Navigation exerciseNumber={exerciseNumber} />
      <div css={{minHeight: 'calc(100vh - 60px)'}}>
        <div
          css={mq({
            display: 'grid',
            gridTemplateColumns: ['100%', '100%', '50% 50%'],
            gridTemplateRows: 'auto',
          })}
        >
          <div
            css={mq({
              gridRow: [2, 2, 'auto'],
              maxHeight: ['auto', 'auto', 'calc(100vh - 60px)'],
              overflowY: ['auto', 'auto', 'scroll'],
              padding: '1rem 2rem 3rem 2rem',
              '::-webkit-scrollbar': {
                background: colors.skyLight,
                borderLeft: `1px solid ${colors.sky}`,
                borderRight: `1px solid ${colors.sky}`,
                width: 10,
              },
              '::-webkit-scrollbar-thumb': {
                background: colors.skyDark,
              },
              'p, li': {
                fontSize: 18,
                lineHeight: 1.5,
              },
              blockquote: {
                borderLeft: `2px solid ${colors.primary}`,
                margin: 0,
                paddingLeft: '1.5rem',
              },
              pre: {
                background: colors.sky,
                fontSize: '80%',
                margin: '0 -2rem',
                padding: '2rem',
              },
              ul: {padding: 0, listStylePosition: 'inside'},
              'p > code': {
                background: colors.sky,
                color: '#001429',
                fontSize: '85%',
                padding: '3px 5px',
              },
            })}
          >
            {instructionElement}
          </div>
          <div css={{background: colors.background}}>
            <Tabs
              css={{
                background: colors.background,
                borderTop: `1px solid ${colors.sky}`,
                height: '100%',
                position: 'relative',
                zIndex: 10,
                '[data-reach-tab]': {
                  padding: '0.5rem 1.25rem',
                  ':hover': {
                    color: colors.primary,
                  },
                },
                '[data-reach-tab][data-selected]': {
                  background: colors.background,
                  border: 'none',
                  svg: {fill: colors.primary},
                  ':hover': {
                    color: 'inherit',
                  },
                },
              }}
            >
              <TabList css={{height: 50, background: colors.skyLight}}>
                <Tab css={{display: 'flex', alignItems: 'center'}}>
                  <RiToolsLine
                    size="20"
                    color={colors.textLightest}
                    css={{marginRight: 5}}
                  />
                  <span>Exercise</span>
                </Tab>
                <Tab css={{display: 'flex', alignItems: 'center'}}>
                  <RiFlagLine
                    size="18"
                    color={colors.textLightest}
                    css={{marginRight: 5}}
                  />
                  Final
                </Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <div
                    css={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                      width: '100%',
                    }}
                  >
                    <a
                      css={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        padding: '1rem',
                        textDecoration: 'none',
                      }}
                      href={exercise.isolatedPath}
                      onClick={handleAnchorClick}
                    >
                      <RiExternalLinkLine css={{marginRight: '0.25rem'}} />
                      {'Open exercise on isolated page'}
                    </a>
                  </div>
                  <div css={{margin: '50px 0'}} className="totally-centered">
                    {exerciseElement}
                  </div>
                </TabPanel>
                <TabPanel>
                  <div
                    css={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                      width: '100%',
                    }}
                  >
                    <a
                      style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        padding: '1rem',
                        textDecoration: 'none',
                      }}
                      href={final.isolatedPath}
                      onClick={handleAnchorClick}
                    >
                      <RiExternalLinkLine css={{marginRight: '0.25rem'}} />
                      {' Open final on isolated page'}
                    </a>
                  </div>

                  <div css={{margin: '50px 0'}} className="totally-centered">
                    {finalElement}
                  </div>
                </TabPanel>
              </TabPanels>
              <ExtraCreditLinks
                exerciseNumber={exerciseNumber}
                css={mq({
                  background: colors.background,
                  bottom: 0,
                  padding: '1rem',
                  position: ['static', 'static', 'fixed'],
                  width: '100%',
                })}
              />
            </Tabs>
          </div>
        </div>
      </div>
    </>
  )
}

function Navigation({exerciseNumber}) {
  const info = exerciseInfo[exerciseNumber]
  return (
    <div
      css={mq({
        a: {textDecoration: 'none'},
        alignItems: 'center',
        background: colors.background,
        boxShadow:
          '0 0.9px 1.5px -18px rgba(0, 0, 0, 0.024), 0 2.4px 4.1px -18px rgba(0, 0, 0, 0.035), 0 5.7px 9.9px -18px rgba(0, 0, 0, 0.046), 0 19px 33px -18px rgba(0, 0, 0, 0.07)',
        display: 'grid',
        gridTemplateColumns: ['3fr .5fr', '1fr 2fr', '1fr 1fr'],
        height: 60,
        padding: ['0 1rem', '0 1.75rem'],
        width: '100%',
        'span[role="img"]': {
          fontSize: [24, 24, 'inherit'],
        },
        '.exercise-title': {
          color: '#212b36',
          display: ['none', 'inline-block', 'inline-block'],
          fontSize: 15,
          opacity: 0.9,
          ':hover': {
            opacity: 1,
          },
        },
      })}
    >
      <div css={{display: 'flex', alignItems: 'center'}}>
        <Link
          to="/"
          css={{display: 'flex', alignItems: 'center', color: 'inherit'}}
        >
          <Logo css={{marginRight: '.5rem'}} strokeWidth={0.8} />
          <div css={{display: 'flex', flexDirection: 'column'}}>
            <h1 css={{fontSize: 16, margin: 0}}>{projectTitle}</h1>
            <span css={{fontSize: 14, opacity: '.8'}}>Epic React</span>
          </div>
        </Link>
      </div>
      <div
        css={{
          alignItems: 'center',
          display: 'grid',
          gridTemplateColumns: '3fr 2fr 3fr',
          paddingLeft: '1rem',
          width: '100%',
        }}
      >
        <div>
          {info.previous ? (
            <Link
              to={`/${info.previous.number}`}
              css={{display: 'flex', alignItems: 'center'}}
            >
              <RiArrowLeftSLine size={20} />
              <span className="exercise-title">{info.previous.title}</span>
            </Link>
          ) : null}
        </div>
        <div
          css={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {exerciseInfo.map((e, id) => (
            <Link
              to={`/${e.number}`}
              aria-current={id === info.number ? true : false}
              key={e.id}
              css={{
                background:
                  id === info.number ? colors.primary : colors.skyDark,
                borderRadius: 3,
                height: 6,
                margin: '0 3px',
                width: 6,
              }}
            />
          ))}
        </div>
        <div css={{textAlign: 'right'}}>
          {info.next ? (
            <Link
              to={`/${info.next.number}`}
              css={{
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              <span className="exercise-title">{info.next.title}</span>{' '}
              <RiArrowRightSLine size={20} />
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  )
}

function Home() {
  return (
    <div
      css={mq({
        width: '100%',
        maxWidth: 800,
        minHeight: '85vh',
        margin: '0 auto',
        padding: '1rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      })}
    >
      <Logo
        size={120}
        color={colors.skyDark}
        strokeWidth={0.7}
        css={mq({opacity: 0.5, marginTop: ['3rem', 0]})}
      />
      <h1
        css={mq({
          textAlign: 'center',
          marginBottom: ['4rem', '4rem'],
          marginTop: '3rem',
        })}
      >
        {projectTitle}
      </h1>
      <div
        css={mq({
          width: '100%',
          display: 'grid',
          gridTemplateColumns: ['auto', 'auto'],
          gridGap: '1rem',
        })}
      >
        {exerciseInfo
          .filter(Boolean)
          .map(({id, number, title, final, exercise}) => {
            return (
              <div
                key={id}
                css={mq({
                  alignItems: 'center',
                  background: colors.background,
                  borderRadius: 5,
                  boxShadow:
                    '0 0px 1.7px -7px rgba(0, 0, 0, 0.02), 0 0px 4px -7px rgba(0, 0, 0, 0.028), 0 0px 7.5px -7px rgba(0, 0, 0, 0.035), 0 0px 13.4px -7px rgba(0, 0, 0, 0.042), 0 0px 25.1px -7px rgba(0, 0, 0, 0.05), 0 0px 60px -7px rgba(0, 0, 0, 0.07)',
                  display: 'grid',
                  fontSize: '18px',
                  gridTemplateColumns: ['auto', '60% 40%'],
                  position: 'relative',
                  ':hover': {
                    background: colors.skyLight,
                    small: {
                      opacity: 1,
                    },
                    '::before': {
                      background: colors.primary,
                      border: `2px solid ${colors.primary}`,
                      color: colors.background,
                    },
                  },
                  '::before': {
                    alignItems: 'center',
                    background: colors.background,
                    border: `2px solid ${colors.skyDark}`,
                    borderRadius: 12,
                    color: colors.textLightest,
                    content: `"${number}"`,
                    display: ['none', 'flex'],
                    fontSize: 12,
                    fontWeight: 600,
                    height: 24,
                    justifyContent: 'center',
                    marginLeft: 23,
                    marginTop: 0,
                    paddingTop: 1,
                    position: 'absolute',
                    textAlign: 'center',
                    width: 24,
                    zIndex: 1,
                  },
                  '::after': {
                    content: '""',
                    position: 'absolute',
                    display: ['none', 'block'],
                    width: 2,
                    height: 'calc(100% + 1rem)',
                    background: colors.skyDark,
                    marginLeft: 34,
                  },
                  ':first-of-type': {
                    '::after': {
                      content: '""',
                      position: 'absolute',
                      display: ['none', 'block'],
                      width: 2,
                      height: 'calc(50% + 1rem)',
                      background: colors.skyDark,
                      marginLeft: 34,
                      marginTop: '4rem',
                    },
                  },
                  ':last-of-type': {
                    '::after': {
                      content: '""',
                      position: 'absolute',
                      display: ['none', 'block'],
                      width: 2,
                      height: 'calc(50% + 1rem)',
                      background: colors.skyDark,
                      marginLeft: 34,
                      marginBottom: '4rem',
                    },
                  },
                })}
              >
                <Link
                  to={`/${number}`}
                  css={mq({
                    padding: ['2rem 2rem 0 2rem', '2rem 2.5rem 2rem 2rem'],
                    display: 'flex',
                    alignItems: 'center',
                    textDecoration: 'none',
                    color: 'inherit',
                    ':hover': {
                      h3: {
                        textDecoration: 'underline',
                        textDecorationColor: 'rgba(0,0,0,0.3)',
                      },
                    },
                  })}
                >
                  <small
                    css={mq({
                      display: ['block', 'none'],

                      opacity: 0.7,
                      fontSize: 14,
                    })}
                  >
                    {number}
                  </small>
                  <h3
                    css={mq({
                      fontSize: [24, 20],
                      fontWeight: [600, 500],
                      margin: 0,
                      marginLeft: ['1rem', '2rem'],
                    })}
                  >
                    {title}
                  </h3>
                </Link>
                <div
                  css={mq({
                    width: '100%',
                    display: 'flex',
                    flexDirection: ['column', 'row'],
                    height: ['auto', 48],
                    padding: ['1.5rem 1rem', '8px 15px'],
                    alignItems: 'center',
                  })}
                >
                  <a
                    href={exercise.isolatedPath}
                    onClick={handleAnchorClick}
                    title="exercise"
                    css={mq({
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: ['flex-start', 'center'],
                      color: 'inherit',
                      padding: ['.7rem 1rem', 0],
                      fontSize: 16,
                      height: [48, 56],
                      textDecoration: 'none',
                      borderRadius: 5,
                      ':hover': {
                        background: colors.background,
                        svg: {fill: colors.primary},
                      },
                    })}
                  >
                    <RiToolsLine
                      size="20"
                      color={colors.textLightest}
                      css={{marginRight: 5}}
                    />
                    <span>Exercise</span>
                  </a>
                  <a
                    href={final.isolatedPath}
                    onClick={handleAnchorClick}
                    title="final version"
                    css={mq({
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: ['flex-start', 'center'],
                      color: 'inherit',
                      padding: ['.7rem 1rem', 0],
                      height: [48, 56],
                      fontSize: 16,
                      textDecoration: 'none',
                      borderRadius: 5,
                      ':hover': {
                        background: colors.background,
                        svg: {fill: colors.primary},
                      },
                    })}
                  >
                    <RiFlagLine
                      size="18"
                      color={colors.textLightest}
                      css={{marginRight: 5}}
                    />
                    <span>Final Version</span>
                  </a>
                </div>
              </div>
            )
          })}
      </div>
    </div>
  )
}

function NotFound() {
  return (
    <div
      css={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
      }}
    >
      <div>
        <Logo
          size={120}
          color={colors.skyDark}
          strokeWidth={0.7}
          css={{opacity: 0.7}}
        />
        <h1>{`Sorry... nothing here.`}</h1>
        {`To open one of the exercises, go to `}
        <code>{`/exerciseNumber`}</code>
        {`, for example: `}
        <Link to="/">
          <code>{`/1`}</code>
        </Link>
        <div css={{marginTop: '2rem', a: {textDecoration: 'none'}}}>
          <Link
            to="/"
            css={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <RiArrowLeftSLine />
            Back home
          </Link>
        </div>
      </div>
    </div>
  )
}

function App() {
  return (
    <React.Suspense
      fallback={
        <div style={{height: '100vh'}} className="totally-centered">
          Loading...
        </div>
      }
    >
      <Router history={history}>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/:exerciseNumber">
            <ExerciseContainer />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </Router>
      <Global
        styles={{
          'html, body, #root': {
            background: colors.skyLight,
            color: colors.text,
          },
          '::selection': {
            background: colors.primary,
            color: colors.background,
          },
          a: {
            color: colors.primary,
          },
          hr: {
            opacity: 0.5,
            border: 'none',
            height: 1,
            background: colors.textLightest,
            maxWidth: '100%',
            marginTop: 30,
            marginBottom: 30,
          },
        }}
      />
    </React.Suspense>
  )
}

const mq = facepaint([
  '@media(min-width: 576px)',
  '@media(min-width: 768px)',
  '@media(min-width: 992px)',
  '@media(min-width: 1200px)',
])

export default App
