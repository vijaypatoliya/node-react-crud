import React, { Suspense } from 'react'
import {
  Redirect,
  Route,
  Switch
} from 'react-router-dom'

// routes config
import routes from '../routes'
import Loading from './Loading/Loading'
  
const Container = () => {
  const isAuthenticated =  localStorage.getItem('userToken');
  return (
      <div className="content-wrapper" >
        <Suspense fallback={<Loading />}>
          <Switch>
            {routes.map((route, idx) => {
              return route.component && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  render={props => 
                    <>
                      {!isAuthenticated && <Redirect to={{ pathname: '/login'}} />}
                      {isAuthenticated && <route.component {...props} /> }
                      </>
                  } />
              )
            })}
            <Redirect from="/" to="/dashboard" />
          </Switch>
        </Suspense>
        </div>
  )
}

export default React.memo(Container)
