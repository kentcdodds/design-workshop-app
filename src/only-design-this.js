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

const history = createBrowserHistory()

function handleAnchorClick(event) {
  if (event.metaKey || event.shiftKey) {
    return
  }
  event.preventDefault()
  history.push(event.target.closest('a').getAttribute('href'))
}

function ExtraCreditLinks({exerciseNumber}) {
  const {extraCredit} = exerciseInfo[exerciseNumber]
  if (!extraCredit.length) {
    return null
  }

  return (
    <div style={{gridColumn: 'span 2'}}>
      {`💯 Extra Credits: `}
      {extraCredit.map(
        ({extraCreditTitle, extraCreditNumber, isolatedPath}, index, array) => (
          <span key={extraCreditNumber}>
            <a href={isolatedPath} onClick={handleAnchorClick}>
              {extraCreditTitle}
            </a>
            {array.length - 1 === index ? null : ' | '}
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
    <div style={{padding: '20px 20px 40px 20px', minHeight: '100vh'}}>
      <div
        style={{
          display: 'grid',
          gridGap: '20px',
          gridTemplateColumns: '50% 50%',
        }}
      >
        <div style={{overflow: 'scroll', maxHeight: '88vh'}}>
          {instructionElement}
        </div>
        <div>
          <Tabs>
            <TabList>
              <Tab>
                <span role="img" aria-label="Muscles">
                  💪
                </span>{' '}
                Exercise
              </Tab>
              <Tab>
                <span role="img" aria-label="Muscles">
                  🏁
                </span>{' '}
                Final
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <a
                  style={{
                    textDecoration: 'none',
                    display: 'block',
                    marginTop: 20,
                  }}
                  href={exercise.isolatedPath}
                  onClick={handleAnchorClick}
                >
                  <span role="img" aria-label="Muscles">
                    💪
                  </span>
                  {' Open exercise on isolated page'}
                </a>
                <hr />
                <div className="totally-centered">{exerciseElement}</div>
              </TabPanel>
              <TabPanel>
                <a
                  style={{
                    textDecoration: 'none',
                    display: 'block',
                    marginTop: 20,
                  }}
                  href={final.isolatedPath}
                  onClick={handleAnchorClick}
                >
                  <span role="img" aria-label="Muscles">
                    🏁
                  </span>
                  {' Open final on isolated page'}
                </a>
                <hr />
                <div className="totally-centered">{finalElement}</div>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </div>
      </div>
      <hr />
      <ExtraCreditLinks exerciseNumber={exerciseNumber} />
      <div style={{marginTop: 20}}>
        <NavigationFooter exerciseNumber={exerciseNumber} />
      </div>
    </div>
  )
}

function NavigationFooter({exerciseNumber}) {
  const info = exerciseInfo[exerciseNumber]
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        gridColumn: 'span 2',
      }}
    >
      <div style={{flex: 1}}>
        {info.previous ? (
          <Link to={`/${info.previous.number}`}>
            {info.previous.title}{' '}
            <span role="img" aria-label="previous">
              👈
            </span>
          </Link>
        ) : null}
      </div>
      <div style={{flex: 1, textAlign: 'center'}}>
        <Link to="/">Home</Link>
      </div>
      <div style={{flex: 1, textAlign: 'right'}}>
        {info.next ? (
          <Link to={`/${info.next.number}`}>
            <span role="img" aria-label="next">
              👉
            </span>{' '}
            {info.next.title}
          </Link>
        ) : null}
      </div>
    </div>
  )
}

function Home() {
  return (
    <div
      style={{
        maxWidth: 800,
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingTop: 30,
      }}
    >
      <h1 style={{textAlign: 'center'}}>{projectTitle}</h1>
      <span>
        <span role="img" aria-label="muscle">
          💪
        </span>
        {' Exercise'}
      </span>
      {' – '}
      <span>
        <span role="img" aria-label="checkered flag">
          🏁
        </span>
        {' Final Version'}
      </span>
      <div>
        {exerciseInfo
          .filter(Boolean)
          .map(({id, number, title, final, exercise}) => {
            return (
              <div key={id} style={{margin: 10, fontSize: '1.2rem'}}>
                {number}
                {'. '}
                <Link to={`/${number}`}>{title}</Link>{' '}
                <a
                  style={{textDecoration: 'none'}}
                  href={exercise.isolatedPath}
                  onClick={handleAnchorClick}
                  title="exercise"
                >
                  <span role="img" aria-label="muscle">
                    💪
                  </span>
                </a>
                {' – '}
                <a
                  style={{textDecoration: 'none'}}
                  href={final.isolatedPath}
                  onClick={handleAnchorClick}
                  title="final"
                >
                  <span role="img" aria-label="checkered flag">
                    🏁
                  </span>
                </a>
              </div>
            )
          })}
      </div>
    </div>
  )
}

function NotFound() {
  return (
    <div className="totally-centered">
      <div>
        {`Sorry... nothing here. To open one of the exercises, go to `}
        <code>{`/exerciseNumber`}</code>
        {`, for example: `}
        <Link to="/01">
          <code>{`/01`}</code>
        </Link>
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
    </React.Suspense>
  )
}

export default App
